import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./course.css"

const courses = [
  {
    id: "computational-forestry",
    title: "Computational Methods for Forestry Research",
    slug: "/course/Computational_Methods_for_Forestry_Research/",
    status: "Upcoming · Starts in between Dashain & Tihar",
    statusType: "festive",
    cohort: "Autumn Cohort",
    summary:
      "A hands-on research program designed to equip students with quantitative and computational skills to turn raw field observations into reproducible scientific evidence using R, Python, and Google Earth Engine.",
    topics: [
      "R & RStudio",
      "Python",
      "Ecological Allometry",
      "Google Earth Engine",
      "LiDAR & Spatial Workflows",
      "Quarto Reports",
    ],
    features: [
      "The X Province Community Forest Observatory project",
      "The Rule of Immutable Raw Data & reproducible architecture",
      "End-to-end 7-step computational research pipeline",
    ],
  },
]

const CourseIndex = ({ location }) => {
  return (
    <Layout location={location} title="Courses">
      <Seo
        title="Courses & Training Programs · Prabesh Gouli"
        description="Courses and practical computational workshops by Prabesh Gouli, covering computational forestry, ecological data science, and reproducible engineering workflows."
      />

      <div className="course-container">
        <header className="course-header">
          <div className="course-badge-pill">
            Curriculum &amp; Research Labs
          </div>
          <h1 className="course-heading">Courses</h1>
          <p className="course-subtitle">
            Hands-on computational training, ecological modeling, and
            reproducible research workflows.
          </p>
        </header>

        <div className="course-divider"></div>

        <section className="course-list-section">
          <div className="course-list">
            {courses.map(course => (
              <article key={course.id} className="course-card">
                <div className="course-card-top">
                  <span className={`course-status-pill ${course.statusType}`}>
                    {course.status}
                  </span>
                  <span className="course-cohort-badge">{course.cohort}</span>
                </div>

                <h2 className="course-card-title">
                  <Link to={course.slug} className="course-card-link">
                    {course.title}
                  </Link>
                </h2>

                <p className="course-card-summary">{course.summary}</p>

                <div className="course-tags">
                  {course.topics.map(topic => (
                    <span key={topic} className="course-tag">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="course-card-footer">
                  <Link to={course.slug} className="course-cta-btn">
                    <span>View Orientation &amp; Pre-Session Setup</span>
                    <span className="course-cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Future courses note */}
        <section className="course-upcoming-notice">
          <div className="course-upcoming-icon">🌱</div>
          <div>
            <h3 className="course-upcoming-title">
              More Curriculum Modules in Development
            </h3>
            <p className="course-upcoming-text">
              Additional deep-dives covering geospatial data engineering,
              automated climate pipelines, and full-stack ecological
              applications will be posted here.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default CourseIndex
