import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "./blog.css"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Prabesh Gouli`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <div className="blog-container">
        <header className="blog-header">
          <h1 className="blog-heading">Writing & Architecture Logs</h1>
          <p className="blog-subtitle">
            System breakdowns, engineering experiments, and lessons from building production software.
          </p>
        </header>

        <div className="blog-divider"></div>

        {posts.length === 0 ? (
          <div className="blog-empty">
            <p>No articles found.</p>
          </div>
        ) : (
          <div className="blog-list-wrapper">
            <ul className="blog-quiet-list">
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug
                const dateStr = post.frontmatter.dateFormatted || post.frontmatter.date

                return (
                  <li key={post.fields.slug} className="blog-quiet-item">
                    <Link to={post.fields.slug} className="blog-quiet-link">
                      <div className="blog-quiet-main">
                        <time className="blog-quiet-date">{dateStr}</time>
                        <h2 className="blog-quiet-title">{title}</h2>
                      </div>
                      <div className="blog-quiet-meta">
                        <span className="blog-quiet-time">· {post.timeToRead} min read</span>
                      </div>
                    </Link>
                    {post.frontmatter.description && (
                      <p className="blog-quiet-desc">
                        {post.frontmatter.description}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 */
export const Head = () => (
  <Seo
    title="Writing & Architecture Logs"
    description="System breakdowns, engineering experiments, and architectural case studies by Prabesh Gouli."
    pathname="/blog"
  />
)

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 160)
        timeToRead
        fields {
          slug
        }
        frontmatter {
          dateFormatted: date(formatString: "YYYY")
          date
          title
          description
        }
      }
    }
  }
`
