import http from "http"
import { handleRequest } from "@autonoma-ai/sdk"
import { config } from "../src/api/autonoma.js"

const PORT = process.env.PORT || 3000

const server = http.createServer(async (req, res) => {
  const urlPath = req.url ? req.url.split("?")[0] : ""
  if (req.method === "POST" && (urlPath === "/api/autonoma" || urlPath === "/api/autonoma/")) {
    const chunks = []
    for await (const chunk of req) {
      chunks.push(chunk)
    }
    const rawBody = Buffer.concat(chunks).toString("utf-8")

    const headers = {}
    for (const [k, v] of Object.entries(req.headers)) {
      if (typeof v === "string") headers[k.toLowerCase()] = v
      else if (Array.isArray(v)) headers[k.toLowerCase()] = v[0] ?? ""
    }

    const result = await handleRequest(config, {
      body: rawBody,
      headers,
    })

    res.writeHead(result.status, { "Content-Type": "application/json" })
    res.end(JSON.stringify(result.body))
    return
  }

  res.writeHead(404, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "Not found" }))
})

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Autonoma endpoint running on http://127.0.0.1:${PORT}/api/autonoma`)
})
