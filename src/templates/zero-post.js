import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "./zero-post.css"

const ZeroPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="zero-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="zero-post-header">
          <Link to="/zero" className="zero-back-link">
            ← Back to Learning Journey
          </Link>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div className="zero-post-meta">
            <time>{post.frontmatter.date}</time>
            {post.frontmatter.tags && (
              <div className="zero-post-tags">
                {post.frontmatter.tags.map(tag => (
                  <span key={tag} className="zero-post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
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
            <p>💬 Found this helpful? Let's connect and discuss!</p>
          </div>
        </footer>
      </article>

      <nav className="zero-post-nav">
        <ul>
          <li>
            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                className="zero-nav-link zero-nav-prev"
              >
                <span className="zero-nav-label">Previous Entry</span>
                <span className="zero-nav-title">
                  ← {next.frontmatter.title}
                </span>
              </Link>
            )}
          </li>
          <li>
            {previous && (
              <Link
                to={previous.fields.slug}
                rel="prev"
                className="zero-nav-link zero-nav-next"
              >
                <span className="zero-nav-label">Next Entry</span>
                <span className="zero-nav-title">
                  {previous.frontmatter.title} →
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
      title={`${post.frontmatter.title} | Zero to Software Engineer`}
      description={post.frontmatter.description || post.excerpt}
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
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
