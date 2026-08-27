import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "./zero-post.css"

const ZeroPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Prabesh Gouli`
  const chapterMatch = post.fields.slug.match(/(\d+)/)
  const chapterNum = chapterMatch ? chapterMatch[1] : ""

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="zero-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="zero-post-header">
          <Link to="/zero" className="zero-back-link">
            ← Back to zero index
          </Link>
          <div className="zero-post-meta-top">
            {chapterNum && (
              <span className="zero-post-chapter-badge">Chapter {chapterNum}</span>
            )}
            <time>{post.frontmatter.date}</time>
            <span className="zero-post-read-time">· {post.timeToRead} min read</span>
          </div>

          <h1 itemProp="headline">{post.frontmatter.title}</h1>

          {post.frontmatter.tags && (
            <div className="zero-post-tags">
              {post.frontmatter.tags.map(tag => (
                <span key={tag} className="zero-post-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.frontmatter.description && (
            <p className="zero-post-description">
              {post.frontmatter.description}
            </p>
          )}
        </header>

        <section
          className="zero-post-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />

        <footer className="zero-post-footer">
          <div className="zero-post-cta">
            <p>
              Documenting systems and foundational patterns in public. Found this insightful? Have thoughts? Let's connect via{" "}
              <a href="mailto:prabesh7@gmail.com">email</a> or on{" "}
              <a href="https://twitter.com/prabeshgauli" target="_blank" rel="noopener noreferrer">
                X / Twitter
              </a>.
            </p>
          </div>
        </footer>
      </article>

      <nav className="zero-post-nav" aria-label="Chapter Navigation">
        <ul>
          <li>
            {previous && (
              <Link
                to={previous.fields.slug}
                rel="prev"
                className="zero-nav-link zero-nav-prev"
              >
                <span className="zero-nav-label">← Previous Chapter</span>
                <span className="zero-nav-title">
                  {previous.frontmatter.title}
                </span>
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                className="zero-nav-link zero-nav-next"
              >
                <span className="zero-nav-label">Next Chapter →</span>
                <span className="zero-nav-title">
                  {next.frontmatter.title}
                </span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={`${post.frontmatter.title} | zero`}
      description={post.frontmatter.description || post.excerpt}
      pathname={post.fields.slug}
      article={true}
      datePublished={post.frontmatter.dateIso || post.frontmatter.date}
    />
  )
}

export default ZeroPostTemplate

export const pageQuery = graphql`
  query ZeroPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        dateIso: date(formatString: "YYYY-MM-DD")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
