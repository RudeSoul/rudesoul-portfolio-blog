#!/usr/bin/env node

/**
 * scripts/fetch-tech-news.mjs
 * 
 * Fetches top tech stories from the last 12 hours, passes them to OpenAI
 * (gpt-4o-mini) for synthesis, and saves the structured digest to
 * content/whats-new/latest.json.
 * 
 * Runs twice daily via GitHub Actions or on-demand.
 */

import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_PATH = path.resolve(__dirname, "../content/whats-new/latest.json")

// Helper: Calculate relative time string
function getRelativeTime(timestampSeconds) {
  if (!timestampSeconds) return "Recent"
  const elapsedMinutes = Math.floor((Date.now() / 1000 - timestampSeconds) / 60)
  if (elapsedMinutes < 60) return `${Math.max(1, elapsedMinutes)}m ago`
  const elapsedHours = Math.floor(elapsedMinutes / 60)
  if (elapsedHours < 24) return `${elapsedHours}h ago`
  return `${Math.floor(elapsedHours / 24)}d ago`
}

// Helper: Extract domain name from URL
function extractDomain(urlString) {
  try {
    const parsed = new URL(urlString)
    return parsed.hostname.replace(/^www\./, "")
  } catch {
    return "Tech Source"
  }
}

async function fetchTopHackerNewsStories() {
  console.log("Fetching top stories from Hacker News API...")
  const topIdsRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
  if (!topIdsRes.ok) {
    throw new Error(`Failed to fetch HN top stories: ${topIdsRes.statusText}`)
  }
  const topIds = await topIdsRes.json()
  const candidateIds = topIds.slice(0, 20)

  const storyPromises = candidateIds.map(async (id) => {
    try {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      if (!res.ok) return null
      const item = await res.json()
      if (!item || item.type !== "story" || !item.url) return null
      return {
        title: item.title,
        url: item.url,
        score: item.score || 0,
        time: item.time,
        timeAgo: getRelativeTime(item.time),
        domain: extractDomain(item.url),
      }
    } catch {
      return null
    }
  })

  const stories = (await Promise.all(storyPromises)).filter(Boolean)
  console.log(`Fetched ${stories.length} valid story candidates.`)
  return stories
}

async function summarizeWithOpenAI(stories, apiKey) {
  console.log("Calling OpenAI gpt-4o-mini for synthesis...")
  const promptStories = stories.map((s, idx) => 
    `${idx + 1}. [${s.title}] (${s.url}) - Domain: ${s.domain}, Score: ${s.score}, Posted: ${s.timeAgo}`
  ).join("\n")

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an expert tech editor for an engineering portfolio blog. Analyze candidate stories from the last 12 hours. Select the top 5 most impactful developments across AI, Web Engineering, Architecture, and Open Source.

Return a JSON object matching this exact schema:
{
  "items": [
    {
      "id": "1",
      "title": "Clear, compelling, accurate headline without clickbait",
      "category": "One of: AI & LLMs, Web Development, Systems & Architecture, Open Source, Security",
      "summary": "Exact 2-sentence technical summary explaining what happened and why developers/engineers should care.",
      "sourceUrl": "the original story URL",
      "sourceName": "Publisher or platform name (e.g. Anthropic, GitHub, Vercel)",
      "timeAgo": "e.g. 3h ago"
    }
  ]
}`
        },
        {
          role: "user",
          content: `Here are the candidate tech stories:\n\n${promptStories}`
        }
      ]
    })
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`OpenAI API error (${response.status}): ${errText}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content
  const parsed = JSON.parse(content)
  return parsed.items || []
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.warn("⚠️  OPENAI_API_KEY is not set. Preserving existing latest.json data.")
    return
  }

  try {
    const stories = await fetchTopHackerNewsStories()
    if (stories.length === 0) {
      console.warn("No stories fetched; skipping update.")
      return
    }

    const items = await summarizeWithOpenAI(stories, apiKey)
    if (!items || items.length === 0) {
      console.warn("OpenAI returned no items; skipping update.")
      return
    }

    const outputData = {
      lastUpdated: new Date().toISOString(),
      period: "Last 12 Hours",
      model: "gpt-4o-mini",
      items: items.map((item, idx) => ({
        id: String(idx + 1),
        title: item.title,
        category: item.category || "Technology",
        summary: item.summary,
        sourceUrl: item.sourceUrl,
        sourceName: item.sourceName || extractDomain(item.sourceUrl),
        timeAgo: item.timeAgo || "Recent"
      }))
    }

    // Ensure output directory exists
    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(outputData, null, 2), "utf-8")
    console.log(`✅ Successfully updated ${OUTPUT_PATH} with ${outputData.items.length} stories!`)
  } catch (error) {
    console.error("❌ Error updating tech news digest:", error.message)
    // Non-zero exit code on CI if we want notification, but we can exit 0 so builds don't fail
    process.exit(1)
  }
}

main()
