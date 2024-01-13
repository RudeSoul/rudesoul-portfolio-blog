import * as React from "react"
import { Link } from "gatsby"

import "../components/components.css"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div className="navbar">
        <div className="navbar-heading">
          <Link to="/blog">blog</Link>
        </div>
      </div>
    )
  } else {
    header = (
      <div className="navbar justify-content-space">
        <div className="navbar-heading">
          <Link to="/">@rudesoul</Link>
        </div>
        <div className="flex navbar-heading2">
          <div className="navbar-heading">
            <Link to="/blog">blog</Link>
          </div>
          <div className="navbar-heading">
            <Link to="/">contact</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main className="content-container">{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        ❤️ &
        <a className="footer-gatsby" href="https://www.gatsbyjs.com">
          Gatsby
        </a>
      </footer>
    </div>
  )
}

export default Layout
