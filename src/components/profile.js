import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import "./profile.css"

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-pic-wrapper">
        <StaticImage
          className="profile-pic"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/myPic.png"
          width={140}
          height={140}
          quality={95}
          alt="Prabesh Gouli"
        />
      </div>

      <div className="profile-identity">
        <h1 className="profile-name">Prabesh Gouli</h1>
        <span className="profile-handle">@rudesoul</span>
      </div>

      <p className="profile-role">Full-Stack Software Engineer & Product Designer</p>

      <p className="profile-des">
        Juggling pixels, systems, and code. I sit at the intersection of frontend craft and UI/UX whimsy, with full-stack engineering under the hood. By day, I design and build production-grade software; by night, I document the journey here.
      </p>

      <div className="profile-social">
        <a
          className="social-link"
          href="https://github.com/rudesoul"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="GitHub Profile"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        <a
          className="social-link"
          href="https://www.linkedin.com/in/prabeshgouli/"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="LinkedIn Profile"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </a>

        <a
          className="social-link"
          href="https://twitter.com/prabeshgauli"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="X (formerly Twitter) Profile"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a
          className="social-link"
          href="mailto:prabesh7@gmail.com"
          rel="noopener noreferrer"
          aria-label="Email Prabesh"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>

        <a
          className="social-link"
          href="https://www.figma.com/@prabeshgouli"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Figma Profile"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.5 12c-1.93 0-3.5-1.57-3.5-3.5S6.57 5 8.5 5H12v7H8.5zM12 5h3.5c1.93 0 3.5 1.57 3.5 3.5S17.43 12 15.5 12H12V5zm0 7v7c0 1.93-1.57 3.5-3.5 3.5S5 20.93 5 19s1.57-3.5 3.5-3.5H12v-3.5zm0 0h3.5c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5v-3.5z" />
          </svg>
        </a>

        <a
          className="social-link"
          href="https://stackoverflow.com/users/10002142/prabesh-gouli"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Stack Overflow Profile"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.986 21.865v-6.404h2.134V24H2.844v-8.539h2.134v6.404h14.008zM6.111 19.731H17.85v-2.134H6.111v2.134zm.27-5.025l11.493 2.399.444-2.087-11.493-2.399-.444 2.087zm1.61-4.887l10.597 5.093.92-1.942L8.91 7.877l-.92 1.942zm3.307-4.512l8.895 7.684 1.389-1.65-8.895-7.684-1.389 1.65zm5.726-5.307l-1.74 1.27 6.945 9.508 1.74-1.27-6.945-9.508z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Profile
