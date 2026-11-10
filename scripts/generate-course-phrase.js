#!/usr/bin/env node

/**
 * Helper utility to generate SHA-256 hashes for course access phrases.
 * 
 * Usage:
 *   node scripts/generate-course-phrase.js <phrase> <validFromISO> <validToISO> [label]
 * 
 * Example:
 *   node scripts/generate-course-phrase.js "forestry-bagmati-2026" "2026-11-09T00:00:00+05:45" "2026-11-16T23:59:59+05:45" "Week 1"
 */

const crypto = require("crypto")

const salt = "tu-iof-bagmati-2026-phase-01"

const phrase = process.argv[2] || "forestry-bagmati-2026"
const validFrom = process.argv[3] || "2026-11-09T00:00:00+05:45"
const validTo = process.argv[4] || "2026-11-16T23:59:59+05:45"
const label = process.argv[5] || "Weekly Access Window"

const normalized = phrase.toLowerCase().trim()
const hash = crypto
  .createHash("sha256")
  .update(`${normalized}:${salt}:${validTo}`)
  .digest("hex")

console.log("\n=======================================================")
console.log("  COURSE ACCESS PHRASE HASH GENERATOR")
console.log("=======================================================\n")
console.log(`Phrase:      "${phrase}"`)
console.log(`Valid From:  ${validFrom}`)
console.log(`Valid To:    ${validTo}`)
console.log(`Salt:        "${salt}"`)
console.log(`SHA-256:     "${hash}"\n`)
console.log("------------------ Config Snippet ---------------------")
console.log(
  JSON.stringify(
    {
      id: `window-${Date.now().toString().slice(-4)}`,
      label,
      validFrom,
      validTo,
      hash,
    },
    null,
    2
  )
)
console.log("-------------------------------------------------------\n")

