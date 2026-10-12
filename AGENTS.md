# Developer & Agent Guidelines

This is a Gatsby-powered personal portfolio and blog for Prabesh Gouli (@rudesoul).

## Stack
- **Gatsby 5** (SSG) deployed to **GitHub Pages** (`gh-pages` branch)
- **Markdown** for blog posts and zero-to-one series content
- **GitHub Actions** for automated twice-daily tech news digest (`tech-news-cron.yml`) and automated deployment (`deploy.yml`)

## Content
- Blog posts live in `content/blog/`
- Zero-series posts live in `content/zero/`
- AI-generated tech news digest is at `content/whats-new/latest.json`

## Deployment
Pushing to `main` (or completion of the tech news cron) automatically triggers GitHub Actions (`deploy.yml`) to build and deploy to GitHub Pages (`prabeshgouli.com`).
