/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Img from "gatsby-image"

import "./profile.css"

const Profile = () => {
  const data = useStaticQuery(graphql`
    query {
      github: file(relativePath: { eq: "github.png" }) {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      linkedin: file(relativePath: { eq: "linkedin.png" }) {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      twitter: file(relativePath: { eq: "twitterx.png" }) {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      figma: file(relativePath: { eq: "figma.png" }) {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      email: file(relativePath: { eq: "gmail.png" }) {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      stackoverflow: file(relativePath: { eq: "stackoverflow.png" }) {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      behance: file(relativePath: { eq: "behance.png" }) {
        childImageSharp {
          fixed(width: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className="flex profile">
      <StaticImage
        className="profile-pic"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/myPic.png"
        width={200}
        height={200}
        quality={95}
        alt="Profile picture"
      />
      <h1 className="profile-name">@Rudesoul</h1>
      <p className="profile-des">
        <span className="profile-des-first">J</span>uggling pixels, pixels, and
        a few lines of code – I'm the lovechild of frontend wizardry and UIUX
        whimsy , with a sprinkle of full-stack magic for good measure. By day, I
        create digital wonders; by night, I spill the secrets on my blog,
        decoding the magic behind every line of code and design flourish.
      </p>
      {/* <p>
        Ready to turn your dreams into digital reality? <br /> I'll sprinkle a
        galaxy of colors, making your vision shine brighter than a sky full of
        stars
      </p> */}
      <div className="flex profile-social">
        <a
          className="social-icon"
          href="https://github.com/rudesoul"
          rel="noopener noreferrer"
          target="_blank"
          alt="Github Icon"
        >
          <Img fixed={data.github.childImageSharp.fixed} />
        </a>
        <a
          className="social-icon"
          href="https://www.linkedin.com/in/prabeshgouli/"
          rel="noopener noreferrer"
          target="_blank"
          alt="Linkedin Icon"
        >
          <Img fixed={data.linkedin.childImageSharp.fixed} />
        </a>

        <a
          className="social-icon"
          href="https://twitter.com/prabeshgauli"
          rel="noopener noreferrer"
          target="_blank"
          alt="X formerly known as twitter Icon"
        >
          <Img fixed={data.twitter.childImageSharp.fixed} />
        </a>

        <a
          className="social-icon"
          href="mailto:prabesh7@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
          alt="Gmail Icon"
        >
          <Img fixed={data.email.childImageSharp.fixed} />
        </a>
        <a
          className="social-icon"
          href="https://behance.com/prabeshgouli"
          rel="noopener noreferrer"
          target="_blank"
          alt="Behance Icon"
        >
          <Img fixed={data.behance.childImageSharp.fixed} />
        </a>
        <a
          className="social-icon"
          href="https://www.figma.com/@prabeshgouli"
          rel="noopener noreferrer"
          target="_blank"
          alt="Figma Icon"
        >
          <Img fixed={data.figma.childImageSharp.fixed} />
        </a>
        <a
          className="social-icon"
          href="https://stackoverflow.com/users/10002142/prabesh-gouli"
          rel="noopener noreferrer"
          target="_blank"
          alt="Stackoverflow Icon"
        >
          <Img fixed={data.stackoverflow.childImageSharp.fixed} />
        </a>
      </div>
    </div>
  )
}

export default Profile
