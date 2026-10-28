import * as React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import "../forestry-research.css"

const units = [
  {
    id: "unit-1",
    num: "01",
    title: "Unit I: Computational Workflow & Reproducible Foundations",
    files: [
      {
        name: "unit1_computational_workflow.pptx",
        label: "Lecture Presentation (Slide Deck)",
        type: "PPTX",
        size: "64 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-I/unit1_computational_workflow.pptx",
      },
      {
        name: "data_dictionary.csv",
        label: "Standard Field Measurement Data Dictionary",
        type: "CSV",
        size: "1.1 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-I/data_dictionary.csv",
      },
    ],
  },
  {
    id: "unit-2",
    num: "02",
    title: "Unit II: Programming Fundamentals in R — Reusable Forestry Functions",
    files: [
      {
        name: "unit2_programming_fundamentals_r.pptx",
        label: "Lecture Presentation (Slide Deck)",
        type: "PPTX",
        size: "69 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/unit2_programming_fundamentals_r.pptx",
      },
      {
        name: "unit2_starter_trees.csv",
        label: "Starter Practice Tree Records (Lab Dataset)",
        type: "CSV",
        size: "468 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/unit2_starter_trees.csv",
      },
      {
        name: "bagmati_raw_inventory.csv",
        label: "Bagmati Permanent Sample Plot Inventory (Raw Dataset)",
        type: "CSV",
        size: "228 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/bagmati_raw_inventory.csv",
      },
    ],
  },
  {
    id: "unit-3",
    num: "03",
    title: "Unit III",
    files: [],
  },
  {
    id: "unit-4",
    num: "04",
    title: "Unit IV",
    files: [],
  },
  {
    id: "unit-5",
    num: "05",
    title: "Unit V",
    files: [],
  },
  {
    id: "unit-6",
    num: "06",
    title: "Unit VI",
    files: [],
  },
  {
    id: "unit-7",
    num: "07",
    title: "Unit VII",
    files: [],
  },
  {
    id: "unit-8",
    num: "08",
    title: "Unit VIII",
    files: [],
  },
]

const softwareTools = [
  { name: "R & RStudio Desktop", link: "https://posit.co/download/rstudio-desktop/" },
  { name: "Python 3.10+", link: "https://www.python.org/downloads/" },
  { name: "Quarto CLI", link: "https://quarto.org/docs/get-started/" },
  { name: "Git Version Control", link: "https://git-scm.com/downloads" },
  { name: "Google Earth Engine", link: "https://earthengine.google.com/signup/" },
  { name: "VS Code IDE", link: "https://code.visualstudio.com/download" },
]

const ComputationalForestryPage = ({ location }) => {
  const [openUnits, setOpenUnits] = React.useState({ "unit-1": true, "unit-2": true })

  const toggleUnit = id => {
    setOpenUnits(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Layout
      location={location}
      title="Computational Methods for Forestry Research"
    >
      <Seo
        title="Computational Methods for Forestry Research · Table of Contents"
        description="Course syllabus, lecture presentations, and computational materials for Tribhuvan University M.Sc. Forestry."
      />

      <div className="forestry-container">
        <div className="forestry-nav">
          <Link to="/course" className="forestry-back-link">
            ← Courses
          </Link>
        </div>

        <header className="forestry-header">
          <div className="forestry-header-meta">
            Tribhuvan University · Institute of Forestry · M.Sc.
          </div>
          <h1 className="forestry-title">
            Computational Methods for Forestry Research
          </h1>
          <p className="forestry-subtitle">
            Course syllabus, lecture presentations, and computational laboratory resources.
          </p>
        </header>

        <div className="forestry-divider"></div>

        {/* Table of Contents */}
        <section className="forestry-toc-section">
          <div className="forestry-toc-header">
            <h2 className="forestry-toc-heading">Table of Contents</h2>
            <span className="forestry-toc-hint">Click unit to expand resources</span>
          </div>

          <div className="forestry-toc-list">
            {units.map(unit => {
              const isOpen = !!openUnits[unit.id]
              const hasFiles = unit.files.length > 0

              return (
                <div
                  key={unit.id}
                  className={`forestry-toc-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="forestry-toc-trigger"
                    onClick={() => toggleUnit(unit.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="forestry-toc-num">{unit.num}</span>
                    <span className="forestry-toc-title">{unit.title}</span>
                    <span className="forestry-toc-badge">
                      {hasFiles
                        ? `${unit.files.length} resource${unit.files.length > 1 ? "s" : ""
                        }`
                        : "Upcoming"}
                    </span>
                    <span className="forestry-toc-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="forestry-toc-body">
                      {hasFiles ? (
                        <ul className="forestry-resource-list">
                          {unit.files.map((file, idx) => (
                            <li key={idx} className="forestry-resource-item">
                              <div className="forestry-resource-main">
                                <span
                                  className={`forestry-resource-type ${
                                    file.type ? file.type.toLowerCase() : ""
                                  }`}
                                >
                                  {file.type}
                                </span>
                                <div className="forestry-resource-details">
                                  <span className="forestry-resource-name">
                                    {file.name}
                                  </span>
                                  <span className="forestry-resource-meta">
                                    {file.label} · {file.size}
                                  </span>
                                </div>
                              </div>
                              <a
                                href={file.url}
                                download={file.name}
                                className="forestry-resource-download"
                              >
                                Download ↓
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="forestry-toc-empty">
                          No resources uploaded yet. Files will appear here as this unit begins.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Minimal Setup & Prerequisites */}
        <section className="forestry-setup-section">
          <h3 className="forestry-setup-heading">Required Software Stack</h3>
          <p className="forestry-setup-desc">
            Please configure these tools on your laptop prior to supervised lab sessions:
          </p>
          <ul className="forestry-setup-list">
            {softwareTools.map((tool, idx) => (
              <li key={idx} className="forestry-setup-item">
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="forestry-setup-link"
                >
                  {tool.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export default ComputationalForestryPage
