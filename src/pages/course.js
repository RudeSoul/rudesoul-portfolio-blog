import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./course.css"

const courses = [
  {
    id: "computational-forestry",
    code: "M.Sc. Forestry",
    title: "Computational Methods for Forestry Research",
    slug: "/course/Computational_Methods_for_Forestry_Research/",
    term: "Autumn Semester",
    status: "Active",
  },
]

const CourseIndex = ({ location }) => {
  return (
    <Layout location={location} title="Courses">
      <Seo
        title="Courses & Syllabi · Prabesh Gouli"
        description="Courses, syllabi, lecture slides, and laboratory materials by Prabesh Gouli."
      />

      <div className="course-container">
        <header className="course-header">
          <h1 className="course-heading">Courses</h1>
          <p className="course-subtitle">
            Course syllabi, lecture slides, and computational laboratory materials.
          </p>
        </header>

        <div className="course-divider"></div>

        <ul className="course-quiet-list">
          {courses.map(course => (
            <li key={course.id} className="course-quiet-item">
              <Link to={course.slug} className="course-quiet-link">
                <div className="course-quiet-main">
                  <span className="course-quiet-code">{course.code}</span>
                  <h2 className="course-quiet-title">{course.title}</h2>
                </div>
                <div className="course-quiet-meta">
                  <span className="course-quiet-term">{course.term}</span>
                  <span className="course-quiet-arrow">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default CourseIndex

