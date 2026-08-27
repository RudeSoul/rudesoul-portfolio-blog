import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Profile from "../components/profile"

import "./index.css"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Prabesh Gouli`
  const posts = data.allMarkdownRemark.nodes.slice(0, 4)

  return (
    <Layout location={location} title={siteTitle}>
      <div className="profile-container">
        <Profile />

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
