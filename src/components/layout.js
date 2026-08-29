import * as React from "react"
import { Link } from "gatsby"

import PageViews from "./pageViews"
import "../components/components.css"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <nav className="navbar" aria-label="Main Navigation">
          <div className="navbar-left">
            <Link to="/" className="navbar-brand">
              Prabesh Gouli
              <span className="navbar-handle">@rudesoul</span>
            </Link>
          </div>
          <div className="navbar-right">
            <Link to="/blog" className="nav-link" activeClassName="active">
              blog
            </Link>
            <Link to="/zero" className="nav-link" activeClassName="active">
              zero
            </Link>
            <Link to="/whats-new" className="nav-link" activeClassName="active">
              what's new
            </Link>
            <a
              href="mailto:prabesh7@gmail.com"
              className="nav-link nav-contact"
              title="Send an email to Prabesh"
            >
              contact
            </a>
          </div>
        </nav>
      </header>
      <main className="content-container">{children}</main>
      <footer className="global-footer">
        <div className="footer-content">
          <p className="footer-copy">© {new Date().getFullYear()} Prabesh Gouli · Built with precision</p>
          <div className="footer-stats">
            <PageViews />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
