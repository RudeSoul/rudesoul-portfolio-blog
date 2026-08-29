import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

import latestNews from "../../content/whats-new/latest.json"
import "./whats-new.css"

function formatLastUpdated(isoString) {
  if (!isoString) return "Recently"
  try {
    const date = new Date(isoString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date)
  } catch {
    return "Recently"
  }
}

const WhatsNewPage = ({ location }) => {
  const items = latestNews?.items || []
  const lastUpdatedFormatted = formatLastUpdated(latestNews?.lastUpdated)

  return (
    <Layout location={location} title="What's New">
      <div className="whats-new-container">
        <header className="whats-new-header">
          <div className="whats-new-status-bar">
            <span className="whats-new-pulse-dot" aria-hidden="true"></span>
            <span className="whats-new-status-text">
              Curated twice daily · Last updated: {lastUpdatedFormatted}
            </span>
          </div>

          <h1 className="whats-new-heading">what's new</h1>
          <p className="whats-new-subtitle">
            AI-distilled breakthroughs across software engineering, LLMs, and open-source infrastructure from the last 12 hours.
          </p>
        </header>

        <div className="whats-new-divider"></div>

        {items.length === 0 ? (
          <div className="whats-new-empty">
            <p>No new updates in the last cycle. Check back shortly!</p>
          </div>
        ) : (
          <div className="whats-new-feed">
            <ul className="whats-new-list">
              {items.map((item, idx) => (
                <li key={item.id || idx} className="whats-new-item">
                  <div className="whats-new-meta">
                    <span className="whats-new-category">{item.category}</span>
                    <span className="whats-new-separator">·</span>
                    <span className="whats-new-source-name">{item.sourceName}</span>
                    {item.timeAgo && (
                      <>
                        <span className="whats-new-separator">·</span>
                        <span className="whats-new-time-ago">{item.timeAgo}</span>
                      </>
                    )}
                  </div>

                  <h2 className="whats-new-item-title">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whats-new-link"
                    >
                      {item.title}
                      <span className="whats-new-arrow" aria-hidden="true"> ↗</span>
                    </a>
                  </h2>

                  <p className="whats-new-summary">{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="whats-new-footer">
          <p>
            🤖 Automated via a twice-daily GitHub Action using <strong>OpenAI gpt-4o-mini</strong>. Filtered for signal over noise.
          </p>
        </footer>
      </div>
    </Layout>
  )
}

export default WhatsNewPage

export const Head = () => (
  <Seo
    title="What's New in Tech · Curated Engineering & AI News"
    description="Twice-daily curated tech breakthroughs, AI models, and software engineering developments from the last 12 hours by Prabesh Gouli."
    pathname="/whats-new"
    schemaType="newsList"
    items={latestNews?.items || []}
    lastUpdated={latestNews?.lastUpdated}
    keywords="software engineering news, tech digest, artificial intelligence updates, LLMs, web development, open source, Prabesh Gouli"
  />
)

