import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Profile from "../components/profile"
import latestNews from "../../content/whats-new/latest.json"

import "./index.css"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Prabesh Gouli`
  const posts = data.allMarkdownRemark.nodes.slice(0, 4)
  const newsItems = latestNews?.items?.slice(0, 3) || []

  return (
    <Layout location={location} title={siteTitle}>
      <div className="profile-container">
        <Profile />

        {/* What's New in Tech Section */}
        {newsItems.length > 0 && (
          <section className="home-news-section" aria-label="What's New in Tech">
            <div className="quiet-list-header">
              <div className="home-news-header-left">
                <span className="home-news-pulse" aria-hidden="true"></span>
                <span className="quiet-list-title">What's New in Tech</span>
              </div>
              <Link to="/whats-new" className="quiet-list-all">
                view all {latestNews?.items?.length || 5} →
              </Link>
            </div>

            <div className="home-news-list">
              {newsItems.map((item, idx) => (
                <article key={item.id || idx} className="home-news-card">
                  <div className="home-news-meta">
                    <span className="home-news-tag">{item.category}</span>
                    <span className="home-news-sep">·</span>
                    <span className="home-news-source">{item.sourceName}</span>
                    {item.timeAgo && (
                      <>
                        <span className="home-news-sep">·</span>
                        <span className="home-news-time">{item.timeAgo}</span>
                      </>
                    )}
                  </div>
                  <h3 className="home-news-headline">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-news-link"
                    >
                      {item.title}
                      <span className="home-news-arrow" aria-hidden="true"> ↗</span>
                    </a>
                  </h3>
                  <p className="home-news-summary">{item.summary}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Recent Writing & Logs Section */}
        {posts.length > 0 && (
          <section className="home-writing-section" aria-label="Recent writing">
            <div className="quiet-list-header">
              <span className="quiet-list-title">Recent Writing & Logs</span>
              <Link to="/blog" className="quiet-list-all">
                all posts →
              </Link>
            </div>

            <ul className="quiet-list">
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug
                const year = post.frontmatter.date
                  ? new Date(post.frontmatter.date).getFullYear()
                  : ""

                return (
                  <li key={post.fields.slug} className="quiet-item">
                    <Link to={post.fields.slug} className="quiet-link">
                      <span className="quiet-date">{year}</span>
                      <span className="quiet-headline">{title}</span>
                      <span className="quiet-time">· {post.timeToRead} min</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
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
    title="Prabesh Gouli — Software Engineer & Designer"
    schemaType="person"
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
        excerpt
        timeToRead
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
  }
`
