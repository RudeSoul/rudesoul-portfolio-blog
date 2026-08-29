# Developer & Agent Guidelines

This is a Gatsby-powered personal portfolio and blog for Prabesh Gouli (@rudesoul).

## Stack
- **Gatsby 5** (SSG) deployed to **Vercel**
- **Markdown** for blog posts and zero-to-one series content
- **GitHub Actions** for automated twice-daily tech news digest (`tech-news-cron.yml`)

## Content
- Blog posts live in `content/blog/`
- Zero-series posts live in `content/zero/`
- AI-generated tech news digest is at `content/whats-new/latest.json`

## Deployment
Merging a PR to `main` automatically triggers Vercel to build and deploy the site.
