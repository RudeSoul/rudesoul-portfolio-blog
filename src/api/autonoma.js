import { handleRequest, defineFactory } from "@autonoma-ai/sdk"
import { z } from "zod"
import { promises as fs } from "fs"
import path from "path"

export const SiteMetadata = defineFactory({
  inputSchema: z.object({
    title: z.string(),
    description: z.string(),
    siteUrl: z.string(),
  }),
  create: async (data, ctx) => {
    return { id: `site_meta_${ctx.testRunId}`, ...data }
  },
  teardown: async () => {},
})

export const Author = defineFactory({
  inputSchema: z.object({
    name: z.string(),
    summary: z.string(),
    site_metadata_id: z.string().optional(),
  }),
  create: async (data, ctx) => {
    return { id: `author_${ctx.testRunId}`, ...data }
  },
  teardown: async () => {},
})

export const Social = defineFactory({
  inputSchema: z.object({
    twitter: z.string(),
    github: z.string(),
    linkedin: z.string(),
    site_metadata_id: z.string().optional(),
  }),
  create: async (data, ctx) => {
    return { id: `social_${ctx.testRunId}`, ...data }
  },
  teardown: async () => {},
})

export const MarkdownRemark = defineFactory({
  inputSchema: z.object({
    content: z.string(),
    parent_file_path: z.string(),
  }),
  create: async (data, ctx) => {
    const fullPath = path.resolve(process.cwd(), data.parent_file_path)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, data.content, "utf-8")
    return { id: data.parent_file_path, ...data }
  },
  teardown: async (record) => {
    try {
      const fullPath = path.resolve(process.cwd(), record.parent_file_path)
      await fs.rm(fullPath, { force: true })
      const dir = path.dirname(fullPath)
      await fs.rmdir(dir).catch(() => {})
    } catch {}
  },
})

export const Frontmatter = defineFactory({
  inputSchema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    markdown_remark_id: z.string().optional(),
  }),
  create: async (data) => {
    return { id: `fm_${Math.random().toString(36).slice(2)}`, ...data }
  },
  teardown: async () => {},
})

export const Fields = defineFactory({
  inputSchema: z.object({
    slug: z.string(),
    markdown_remark_id: z.string().optional(),
  }),
  create: async (data) => {
    return { id: `fields_${Math.random().toString(36).slice(2)}`, ...data }
  },
  teardown: async () => {},
})

export const factories = {
  SiteMetadata,
  Author,
  Social,
  MarkdownRemark,
  Frontmatter,
  Fields,
}

const sharedSecret =
  process.env.AUTONOMA_SHARED_SECRET ||
  "e33a120ac78ebed7148b15e13304e4e82c7d55c3d1c27a72c9ce8eaf66481fc6"
const signingSecret =
  process.env.AUTONOMA_SIGNING_SECRET ||
  "c9284fa920394857201948572019485720194857201948572019485720194857"

export const config = {
  scopeField: "organizationId",
  sharedSecret,
  signingSecret,
  factories,
  auth: async (user, ctx) => {
    return {
      headers: {
        Authorization: `Bearer autonoma-${ctx.scopeValue}`,
      },
      credentials: {
        username: "prabeshgouli",
      },
    }
  },
}

export default async function handler(req, res) {
  let bodyStr
  if (typeof req.body === "string") {
    bodyStr = req.body
  } else if (req.rawBody) {
    bodyStr = Buffer.isBuffer(req.rawBody)
      ? req.rawBody.toString("utf-8")
      : req.rawBody
  } else {
    bodyStr = JSON.stringify(req.body)
  }

  const headers = {}
  for (const [k, v] of Object.entries(req.headers || {})) {
    if (typeof v === "string") headers[k.toLowerCase()] = v
    else if (Array.isArray(v)) headers[k.toLowerCase()] = v[0] ?? ""
  }

  const result = await handleRequest(config, {
    body: bodyStr,
    headers,
  })

  res.status(result.status).json(result.body)
}
