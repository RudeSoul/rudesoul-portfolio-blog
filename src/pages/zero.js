import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "./zero.css"

const ZeroIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <div className="zero-container">
        <div className="zero-header">
          <h1 className="zero-heading">Software Engineer - Learning Journey</h1>
          <p className="zero-subtitle">My 2026 Learning Journey</p>
          <div className="zero-intro">
            <p>
              After years of being away from active software development, I'm
              documenting my journey back into the field. Each entry contains
              code snippets, explanations, and real-world applications of what
              I'm learning.
            </p>
            <p className="zero-tagline">
              Follow along as I rebuild my skills and share insights that might
              help you on your own journey. 🚀
            </p>
          </div>
        </div>

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

                return (
                  <article
                    key={post.fields.slug}
                    className="zero-entry"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <div className="zero-entry-marker">
                      <span className="zero-entry-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="zero-entry-content">
                      <div className="zero-entry-meta">
                        <time className="zero-entry-date">
                          {post.frontmatter.date}
                        </time>
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
            💡 Want to connect? I'm always happy to discuss code and career
            journeys.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default ZeroIndex

export const Head = () => (
  <Seo title="Zero to Software Engineer - Learning Journey" />
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
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt
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
