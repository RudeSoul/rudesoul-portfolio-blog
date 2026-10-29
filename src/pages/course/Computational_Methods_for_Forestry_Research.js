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
      {
        name: "git_github_cheatsheet.md",
        label: "Git & GitHub Command Cheatsheet (Practical Guide)",
        type: "MD",
        size: "4.8 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/git_github_cheatsheet.md",
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
  { name: "R Base Language (CRAN)", link: "https://cloud.r-project.org/" },
  { name: "RStudio Desktop IDE", link: "https://posit.co/download/rstudio-desktop/" },
  { name: "Python 3.10+", link: "https://www.python.org/downloads/" },
  { name: "Quarto CLI", link: "https://quarto.org/docs/get-started/" },
  { name: "Git Version Control", link: "https://git-scm.com/downloads" },
  { name: "Google Earth Engine", link: "https://earthengine.google.com/signup/" },
  { name: "VS Code IDE", link: "https://code.visualstudio.com/download" },
]

const gitCommands = [
  {
    category: "1. Global Identity & Default Settings",
    desc: "Configure your name, institutional email, and standard main branch once on your machine.",
    commands: [
      {
        cmd: `git config --global user.name "Your Name"\ngit config --global user.email "student@iof.edu.np"\ngit config --global init.defaultBranch main`,
        note: "Set the identity attached to every research commit and PR.",
      },
      {
        cmd: `git config --list`,
        note: "Verify your configured username, email, and global settings.",
      },
    ],
  },
  {
    category: "2. SSH Authentication & GitHub Login Verification",
    desc: "Generate secure SSH keys, register with GitHub, and verify connection without passwords.",
    commands: [
      {
        cmd: `ssh-keygen -t ed25519 -C "student@iof.edu.np"`,
        note: "Generate a new Ed25519 SSH key pair (press Enter for default path).",
      },
      {
        cmd: `cat ~/.ssh/id_ed25519.pub`,
        note: "Display your public key. Copy the entire output into GitHub -> Settings -> SSH Keys.",
      },
      {
        cmd: `ssh -T git@github.com`,
        note: "Test your GitHub authentication (should say: Hi username! You've successfully authenticated).",
      },
    ],
  },
  {
    category: "3. Initializing & Connecting Remotes (git remote add)",
    desc: "Initialize Git in a project folder, link to GitHub, or connect upstream forks.",
    commands: [
      {
        cmd: `git init`,
        note: "Initialize a new local Git repository in your current RStudio project folder.",
      },
      {
        cmd: `git remote add origin git@github.com:YOUR_USERNAME/forestry-project.git`,
        note: "Connect your local repository to your GitHub repository (SSH URL).",
      },
      {
        cmd: `git remote -v`,
        note: "List all configured remote connections and URLs.",
      },
      {
        cmd: `git remote add upstream git@github.com:ORIGINAL_OWNER/forestry-project.git`,
        note: "Connect original class repository as upstream when working on a fork.",
      },
    ],
  },
  {
    category: "4. Daily Working Cycle (Status, Diff, Add, Commit)",
    desc: "Inspect changes, stage specific files, and save clean immutable snapshots.",
    commands: [
      {
        cmd: `git status`,
        note: "Check modified scripts, new raw files, and staging status.",
      },
      {
        cmd: `git diff scripts/02_tree_functions.R\ngit diff --staged`,
        note: "Inspect unstaged line-by-line changes, or review staged changes before committing.",
      },
      {
        cmd: `git add scripts/02_tree_functions.R\ngit commit -m "feat: implement vectorised basal area formula"`,
        note: "Stage specific files and commit with a concise, descriptive message.",
      },
      {
        cmd: `git log --oneline -n 5`,
        note: "View recent commit history and SHA hashes.",
      },
    ],
  },
  {
    category: "5. Remote Syncing (Pull & Push)",
    desc: "Synchronize local work with GitHub and avoid merge conflicts.",
    commands: [
      {
        cmd: `git pull origin main`,
        note: "Always pull latest updates before starting work to stay in sync.",
      },
      {
        cmd: `git push -u origin main`,
        note: "Upload local commits to GitHub (-u sets default tracking for future git push).",
      },
    ],
  },
  {
    category: "6. Branching, Switching & Deletion (-d vs -D)",
    desc: "Create isolated branches for modeling experiments, switch contexts, and clean up branches safely.",
    commands: [
      {
        cmd: `git checkout -b feature-volume-allometry`,
        note: "Create and switch to a new working branch (or use: git switch -c).",
      },
      {
        cmd: `git checkout main`,
        note: "Switch back to the main branch (or use: git switch main).",
      },
      {
        cmd: `git branch`,
        note: "List all local branches (* denotes the currently active branch).",
      },
      {
        cmd: `git branch -d feature-volume-allometry`,
        note: "Safe delete (-d): deletes local branch ONLY if it has already been merged into main.",
      },
      {
        cmd: `git branch -D feature-failed-experiment`,
        note: "Force delete (-D): permanently deletes branch regardless of merge status (discards code).",
      },
      {
        cmd: `git push origin --delete feature-volume-allometry`,
        note: "Delete remote branch on GitHub after pull request has been merged.",
      },
    ],
  },
  {
    category: "7. Merging & Pull Requests (PR)",
    desc: "Integrate completed work locally or collaborate on shared repositories via PR.",
    commands: [
      {
        cmd: `git checkout main\ngit merge feature-volume-allometry`,
        note: "Merge a verified feature branch into main locally.",
      },
      {
        cmd: `git push -u origin feature-volume-allometry`,
        note: "Push branch to GitHub, then click 'Compare & pull request' in your browser.",
      },
      {
        cmd: `git fetch upstream\ngit merge upstream/main`,
        note: "Sync your personal fork with new lectures/updates from the upstream class repo.",
      },
    ],
  },
  {
    category: "8. Undo & Safe Recovery",
    desc: "Safely discard accidental modifications or unstage files without losing data.",
    commands: [
      {
        cmd: `git restore scripts/02_tree_functions.R`,
        note: "Discard uncommitted working changes in a file (restore clean version).",
      },
      {
        cmd: `git restore --staged scripts/02_tree_functions.R`,
        note: "Unstage a file added by mistake while keeping your edits intact.",
      },
    ],
  },
]

const ComputationalForestryPage = ({ location }) => {
  const [openUnits, setOpenUnits] = React.useState({ "unit-1": true, "unit-2": true })
  const [copiedId, setCopiedId] = React.useState(null)
  const [isCheatsheetOpen, setIsCheatsheetOpen] = React.useState(false)

  const toggleUnit = id => {
    setOpenUnits(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCopy = (id, text) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      })
    }
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
                        <React.Fragment>
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

                          {unit.id === "unit-2" && (
                            <div className={`forestry-cheatsheet-card ${isCheatsheetOpen ? "is-open" : "is-collapsed"}`}>
                              <button
                                type="button"
                                className="forestry-cheatsheet-toggle-btn"
                                onClick={() => setIsCheatsheetOpen(prev => !prev)}
                                aria-expanded={isCheatsheetOpen}
                              >
                                <div className="forestry-cheatsheet-header-main">
                                  <span className="forestry-cheatsheet-badge-pill">
                                    Interactive Lab Reference
                                  </span>
                                  <h4 className="forestry-cheatsheet-title">
                                    Git &amp; GitHub Command Cheatsheet
                                  </h4>
                                  <p className="forestry-cheatsheet-desc">
                                    Quick terminal reference for configuration, daily commits, branching, merging, and GitHub PR workflows taught in class.
                                  </p>
                                </div>
                                <div className="forestry-cheatsheet-toggle-action">
                                  <span className="forestry-cheatsheet-toggle-text">
                                    {isCheatsheetOpen ? "Hide Reference" : "View Cheatsheet (8 Modules)"}
                                  </span>
                                  <span className="forestry-cheatsheet-toggle-icon" aria-hidden="true">
                                    {isCheatsheetOpen ? "▲" : "▼"}
                                  </span>
                                </div>
                              </button>

                              {isCheatsheetOpen && (
                                <div className="forestry-cheatsheet-content">
                                  <div className="forestry-cheatsheet-list">
                                    {gitCommands.map((sec, sIdx) => (
                                      <div key={sIdx} className="forestry-cheatsheet-group">
                                        <div className="forestry-cheatsheet-group-header">
                                          <h5 className="forestry-cheatsheet-group-title">
                                            {sec.category}
                                          </h5>
                                          <span className="forestry-cheatsheet-group-desc">
                                            {sec.desc}
                                          </span>
                                        </div>

                                        <div className="forestry-cheatsheet-items">
                                          {sec.commands.map((item, cIdx) => {
                                            const codeId = `cmd-${sIdx}-${cIdx}`
                                            const isCopied = copiedId === codeId
                                            return (
                                              <div key={cIdx} className="forestry-cmd-box">
                                                <div className="forestry-cmd-header">
                                                  <span className="forestry-cmd-note">
                                                    {item.note}
                                                  </span>
                                                  <button
                                                    type="button"
                                                    className={`forestry-cmd-copy-btn ${
                                                      isCopied ? "is-copied" : ""
                                                    }`}
                                                    onClick={() =>
                                                      handleCopy(codeId, item.cmd)
                                                    }
                                                    aria-label="Copy command snippet"
                                                  >
                                                    {isCopied ? "✓ Copied" : "Copy"}
                                                  </button>
                                                </div>
                                                <pre className="forestry-cmd-pre">
                                                  <code>{item.cmd}</code>
                                                </pre>
                                              </div>
                                            )
                                          })}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </React.Fragment>
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
