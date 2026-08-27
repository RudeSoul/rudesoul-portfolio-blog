import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "./zero.css"

const ZeroIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Prabesh Gouli`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <div className="zero-container">
        <header className="zero-header">
          <div className="zero-badge-pill">Journal · First Principles</div>
          <h1 className="zero-heading">zero</h1>
          <p className="zero-subtitle">Rebuilding & Documenting the Engineering Craft</p>
          <div className="zero-intro">
            <p>
              A focused, chapter-by-chapter log exploring modern software architecture, deep React internals, performance tuning, and production systems design.
            </p>
          </div>
        </header>

        <div className="zero-divider"></div>

        {posts.length === 0 ? (
          <div className="zero-empty">
            <p>🌱 Learning entries coming soon! Check back for updates.</p>
          </div>
        ) : (
          <div className="zero-content">
            <div className="zero-timeline">
              {posts.map((post, index) => {
                const title = post.frontmatter.title || post.fields.slug
                const chapterMatch = post.fields.slug.match(/(\d+)/)
                const entryNumber = chapterMatch ? chapterMatch[1] : String(index + 1).padStart(2, "0")

                return (
                  <article
                    key={post.fields.slug}
                    className="zero-entry"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <div className="zero-entry-marker" aria-label={`Chapter ${entryNumber}`}>
                      <span className="zero-entry-number">{entryNumber}</span>
                    </div>
                    <div className="zero-entry-content">
                      <div className="zero-entry-meta">
                        <time className="zero-entry-date">
                          {post.frontmatter.date}
                        </time>
                        <span className="zero-entry-read-time">· {post.timeToRead} min read</span>
                        {post.frontmatter.tags && (
                          <div className="zero-entry-tags">
                            {post.frontmatter.tags.map(tag => (
                              <span key={tag} className="zero-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <h2 className="zero-entry-title">
                        <Link to={post.fields.slug} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <p
                        className="zero-entry-excerpt"
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                      <Link to={post.fields.slug} className="zero-read-more">
                        Read Entry →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}

        <div className="zero-footer">
          <p>
            💡 Documenting in public. Have questions or insights? Feel free to reach out via <a href="mailto:prabesh7@gmail.com">email</a>.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default ZeroIndex

export const Head = () => (
  <Seo
    title="zero — Engineering Notes & First Principles"
    description="Documenting foundational software engineering, React server components, system design, and production patterns by Prabesh Gouli."
    pathname="/zero"
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
      filter: { fileAbsolutePath: { regex: "/content/zero/" } }
      sort: { fields: { slug: ASC } }
    ) {
      nodes {
        excerpt(pruneLength: 160)
        timeToRead
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
