import * as React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import "../forestry-research.css"
import "../forestry-lab.css"

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
      {
        name: "01_project_check.R",
        label: "Automated Project Directory Audit Script (Complete Solution)",
        type: "R",
        size: "349 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-I/01_project_check.R",
      },
      {
        name: "01_project_check_starter.R",
        label: "Project Audit Starter Script (Student Practice / Self-Study)",
        type: "R",
        isStarter: true,
        size: "2.5 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-I/01_project_check_starter.R",
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
        size: "165 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/unit2_programming_fundamentals_r.pptx",
      },
      {
        name: "test_unit_ii.R",
        label: "Complete In-Class Live Coding Script (All Lecture Demonstrations)",
        type: "R",
        isLiveScript: true,
        size: "26 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/test_unit_ii.R",
      },
      {
        name: "unit2_starter_trees.csv",
        label: "Starter Practice Tree Records (Lab Dataset)",
        type: "CSV",
        size: "468 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/unit2_starter_trees.csv",
      },
      {
        name: "unit2_tree_metrics.csv",
        label: "Calculated Tree Metrics Dataset (BA & Volume Outputs)",
        type: "CSV",
        size: "851 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/unit2_tree_metrics.csv",
      },
      {
        name: "02_tree_functions.R",
        label: "Defensive Forestry Functions & Verification Suite (Complete Solution)",
        type: "R",
        size: "1.9 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/02_tree_functions.R",
      },
      {
        name: "02_tree_functions_starter.R",
        label: "Defensive Tree Functions Starter Script (Student Practice / Self-Study)",
        type: "R",
        isStarter: true,
        size: "4.5 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/02_tree_functions_starter.R",
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
      {
        name: "assignment_unit2_base_r.md",
        label: "Homework Assignment: Forensic Data Screening & Base R",
        type: "MD",
        size: "8.5 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/assignment_unit2_base_r.md",
      },
    ],
  },
  {
    id: "unit-3",
    num: "03",
    title: "Unit III: Forest Inventory Data — Import, Cleaning, Summaries & APIs",
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

const unitQuestions = {
  "unit-1": {
    unitLabel: "Unit I",
    unitTitle: "Computational Workflow & Reproducible Foundations",
    intro:
      "Guiding research questions, repository verification checkpoints, and review problems from Unit I of the course text. Use these checkpoints for self-study, directory auditing, and peer code review.",
    categories: [
      {
        id: "guiding",
        label: "Guiding Questions",
        description: "The core research and computational questions driving Unit I.",
        cards: [
          {
            title: "Opening Forest Observatory Inquiries",
            badge: "Landscape Research",
            type: "quotes",
            items: [
              "How much above-ground biomass is stored in the community forests of Bagmati Province, and how is forest condition changing across the landscape?",
              "How can the biomass of 5,000 trees be calculated so that anyone can repeat it?",
              "How does above-ground tree biomass vary among sampled community forest plots, and is variation associated with stand structure and environmental conditions?",
              "Could another explanation produce the same pattern? (Step 6: Interpret the results)",
            ],
          },
          {
            title: "The Reproducibility Test",
            badge: "Self-Check",
            type: "quotes",
            items: [
              "Can another researcher download the project, run the documented workflow, and regenerate the biomass table?",
            ],
          },
          {
            title: "The Five Questions of the Research Record",
            badge: "Audit Standard",
            desc: "A reproducible project must allow a future researcher to answer:",
            type: "ordered",
            items: [
              "Where did the data come from? (e.g., field inventory, satellite imagery, climate dataset, biodiversity database)",
              "What happened to the data? (e.g., missing values identified, species names standardised, duplicate records reviewed, units converted)",
              "What analysis was performed?",
              "Which software and package versions were used?",
              "Can the analysis be rerun?",
            ],
          },
          {
            title: "Computational Thinking Shifts",
            badge: "Paradigm Shift",
            type: "shifts",
            shifts: [
              {
                from: "How do I calculate biomass for this tree?",
                to: "What rule should be applied to every valid tree in the dataset?",
              },
              {
                from: "How do I fix this particular spreadsheet cell?",
                to: "What rule identifies this type of error across the entire table?",
              },
              {
                from: "How do I make this one graph?",
                to: "What relationship do I want to communicate, and how can the code generate that figure consistently?",
              },
            ],
          },
        ],
      },
      {
        id: "practical",
        label: "Practical Checkpoints",
        description: "Hands-on self-checks and exercise inquiries for your repository.",
        cards: [
          {
            title: "README.md Project Specification",
            badge: "Documentation",
            desc: "Before sharing or committing, verify that your project README.md clearly answers:",
            type: "ordered",
            items: [
              "What is the project?",
              "What research questions will it investigate?",
              "What types of data will be used?",
              "Which programming languages will be used?",
              "What are the main outputs?",
            ],
          },
          {
            title: "Git History Self-Check Inquiry",
            badge: "Version Control",
            type: "quotes",
            items: [
              "If I return to this project six months from now, will these commit messages tell me what happened?",
            ],
          },
        ],
      },
      {
        id: "review",
        label: "Review Problems",
        description: "Conceptual understanding and realistic forestry problem scenarios.",
        cards: [
          {
            title: "Core Conceptual Questions",
            badge: "Foundations",
            type: "ordered",
            items: [
              "Why is programming useful in modern forestry research even when a dataset can technically be analysed in a spreadsheet?",
              "What is the difference between a manual workflow and a scripted workflow?",
              "Why should raw data normally remain unchanged?",
              "Explain the difference between an absolute file path and a relative file path.",
              "Why does an RStudio Project improve portability?",
              "What problem does Git solve?",
              "Why is Git not the same thing as a backup system?",
              "How does Quarto reduce the risk of transcription errors?",
              "Why is metadata necessary for reproducible research?",
              "Explain why reproducibility does not guarantee that a study is scientifically valid.",
            ],
          },
          {
            title: "Applied Case Scenarios",
            badge: "Forensic Reasoning",
            type: "scenarios",
            scenarios: [
              {
                name: "Case 1: The Suspicious DBH",
                scenario:
                  "A field technician records plot_id = P17, tree_id = T203, species = Schima wallichii, dbh_cm = 999, height_m = 21.3. The researcher later confirms that the paper field sheet contains a DBH of 9.9 cm.",
                prompt:
                  "Describe how this correction should be handled programmatically without modifying the original raw dataset.",
              },
              {
                name: "Case 2: The Broken Project Path",
                scenario:
                  'A student\'s R script contains read.csv("C:/Users/Ramesh/Desktop/MSc/Bagmati/inventory.csv"). The student sends the project folder to their supervisor, who encounters an immediate error.',
                prompt:
                  "Explain why the error occurs and how the project should be redesigned for portability.",
              },
              {
                name: "Case 3: The Outdated Report",
                scenario:
                  "A researcher calculates mean biomass in an R session and manually types the result into a Word document. Two days later, a refined data-cleaning rule updates the biomass estimate.",
                prompt:
                  "Identify the scientific and administrative risk in this workflow, and explain how Quarto literate programming eliminates it.",
              },
              {
                name: "Case 4: The Version Control Audit",
                scenario:
                  "A student's Git commit history contains: 'update', 'final', 'final2', 'final_new', 'working', 'fixed'.",
                prompt:
                  "Explain why this violates reproducible version-control practice, and write five examples of informative, professional commit messages for the Bagmati Observatory.",
              },
            ],
          },
        ],
      },
    ],
  },
  "unit-2": {
    unitLabel: "Unit II",
    unitTitle: "Programming Fundamentals in R",
    intro:
      "Questions and defensive programming checkpoints from Unit II. Use these to verify your understanding of Base R data structures, vectorised calculations, missing-value handling, and function guards before and after the lab assignment.",
    categories: [
      {
        id: "guiding",
        label: "Guiding Questions",
        description: "The core programming and data-screening questions driving Unit II.",
        cards: [
          {
            title: "Logical Data-Quality Screening",
            badge: "Defensive Logic",
            type: "quotes",
            items: [
              "Evaluating `height_m > 50` asks: 'Is this tree taller than 50 m in this forest type?'",
            ],
          },
          {
            title: "Six Questions to Ask Before Analysing a Data Frame",
            badge: "Exploratory Audit",
            desc: "Before running any statistical calculation or model on a data frame, verify:",
            type: "ordered",
            items: [
              "How many rows are there?",
              "What are the columns called?",
              "Which columns are numeric?",
              "Are missing values present?",
              "Are categorical variables represented correctly?",
              "What units are used?",
            ],
          },
          {
            title: "Plot-Scaling & Expansion Inquiry",
            badge: "Allometry Math",
            type: "quotes",
            items: [
              "How much basal area does a sample plot contain? And how does plot basal area (BA_plot) scale to per-hectare basal area (BA_ha = BA_plot / 0.05 for a 500 m² plot)?",
            ],
          },
          {
            title: "Seven Questions About Scientific Equations in Code",
            badge: "Equation Verification",
            desc: "Before coding an allometric model such as volume <- a * dbh_cm^b * height_m^c, investigate:",
            type: "ordered",
            items: [
              "Where did the equation come from?",
              "Which species does it apply to?",
              "Which region was it developed for?",
              "Which measurements does it require?",
              "What units does it expect?",
              "What range of values does it cover?",
              "Does it estimate total or merchantable volume?",
            ],
          },
          {
            title: "The Looking Ahead Bridge Question",
            badge: "Data Integrity",
            type: "quotes",
            items: [
              "How do we know that the data entering our calculations are trustworthy?",
            ],
          },
        ],
      },
      {
        id: "practical",
        label: "Practical Checkpoints",
        description: "Hands-on debugging tests and defensive error challenges.",
        cards: [
          {
            title: "Investigate an Error: Character Coercion",
            badge: "Debugging",
            desc: "In R, change one DBH value from 35.1 to '35.1' inside a vector, run your basal area calculation, and inspect class() and str():",
            type: "quotes",
            items: [
              "Why did the calculation fail, what coercion rule took place, and how does defensive programming prevent this?",
            ],
          },
          {
            title: "Practical Challenge: The Suspicious Tree",
            badge: "Defensive Guards",
            desc: "Test how your allometric functions respond when passed invalid inputs such as dbh_cm: -12, dbh_cm: 0, and dbh_cm: NA:",
            type: "quotes",
            items: [
              "Should these anomalous observations be deleted, corrected, or flagged with warnings in forestry data pipelines?",
            ],
          },
        ],
      },
      {
        id: "review",
        label: "Review Problems",
        description: "Conceptual mastery, forestry reasoning, and code diagnostics.",
        cards: [
          {
            title: "Conceptual Understanding",
            badge: "R Fundamentals",
            type: "ordered",
            items: [
              "What is an R object, and why is assigning meaningful names important in forestry research?",
              "Distinguish between numeric, character, logical, and categorical data.",
              "What is the difference between a vector and a data frame? What is the difference between = and ==?",
              "Explain the purpose of conditional statements (if / else).",
              "What is a loop, and why are loops still important even though R supports vectorisation?",
              "What is vectorisation?",
              "What is a function, and why is a function preferable to repeatedly typing the same forestry equation?",
            ],
          },
          {
            title: "Forestry Reasoning",
            badge: "Biological Logic",
            type: "ordered",
            items: [
              "Why is DBH unit specification essential when calculating basal area?",
              "Why is a mathematically valid result not necessarily a scientifically valid forestry result?",
              "Why should a researcher check the domain of applicability of a volume equation?",
              "Why should an unusual tree measurement generally be flagged before it is deleted?",
            ],
          },
          {
            title: "Programming Application & Diagnostics",
            badge: "Code Analysis",
            type: "ordered",
            items: [
              "What is wrong with the following code: dbh <- \"28.4\"; ba <- pi * dbh^2 / 40000?",
              "Why can the following approach be problematic for a vector: if (dbh_cm > 0) { print(\"Valid\") }?",
              "A function works for one tree but fails when given 5,000 DBH values. What should you investigate?",
              "R reports: non-numeric argument to binary operator. What does this error suggest, and what steps would you take to diagnose it?",
              "A researcher calculates basal area successfully, but the DBH values were actually recorded in millimetres rather than centimetres. Why might R not report an error?",
              "Explain the difference between a computational error and a scientific error.",
            ],
          },
        ],
      },
    ],
  },
  "unit-3": {
    unitLabel: "Unit III",
    unitTitle: "Forest Inventory Data: Import, Cleaning, Summaries and APIs",
    intro:
      "Preview of Unit III questions covering the five-stage inventory pipeline, taxonomic standardisation, plot-scaling metrics (TPA, Basal Area, IVI), and external API integration prior to lab sessions.",
    categories: [
      {
        id: "guiding",
        label: "Guiding Questions",
        description: "The pipeline architecture and ecological inquiries driving Unit III.",
        cards: [
          {
            title: "The Five Pipeline Stage Questions",
            badge: "Pipeline Design",
            type: "ordered",
            items: [
              "Importing asks: 'Did the computer read the data correctly?'",
              "Validation asks: 'Do the recorded values satisfy the rules we expect?'",
              "Cleaning asks: 'What should we do about values that do not satisfy those rules?'",
              "Derivation asks: 'What new variables can we calculate from the cleaned observations?'",
              "Summarisation asks: 'What does the dataset tell us about each plot or stand?'",
            ],
          },
          {
            title: "Nine First-Inspection Questions",
            badge: "Intake Audit",
            desc: "Before calculating any metrics on an imported dataset, systematically ask:",
            type: "ordered",
            items: [
              "How many rows are present?",
              "How many columns are present?",
              "What are the variable names?",
              "What data types were assigned?",
              "Which values are missing?",
              "What are the ranges of important variables?",
              "Are there duplicated records?",
              "Are categorical values consistent?",
              "Are there unexpected values?",
            ],
          },
          {
            title: "Ecological API Integration Inquiries",
            badge: "APIs & Macroecology",
            type: "quotes",
            items: [
              "Does variation in forest structure correspond to variation in climate?",
              "How does the species composition observed in our plots relate to the broader regional distribution of a species?",
            ],
          },
          {
            title: "Importance Value Interpretation",
            badge: "Ecological Metrics",
            type: "quotes",
            items: [
              "Why does this species have a high or low importance value? (Is it abundant, structurally dominant, widespread across plots, or a combination?)",
            ],
          },
          {
            title: "Unit III Checkpoint Inquiry",
            badge: "End-to-End Audit",
            type: "quotes",
            items: [
              "If another researcher receives my raw Bagmati inventory tomorrow, can they understand what every variable means, reproduce my cleaning decisions, regenerate my summaries, and trace the final results back to the original observations?",
            ],
          },
        ],
      },
      {
        id: "practical",
        label: "Practical Checkpoints",
        description: "Hands-on data cleaning tasks and forestry interpretation deliverables.",
        cards: [
          {
            title: "Initial Inspection Audit",
            badge: "Field Data Audit",
            type: "quotes",
            items: [
              "What specific data-quality problems did you identify in the raw records before applying any transformations?",
            ],
          },
          {
            title: "Duplicate Record Investigation",
            badge: "Forensic Check",
            desc: "For each duplicated Plot_ID + Tree_ID + Measurement_Date combination in an inventory:",
            type: "quotes",
            items: [
              "Is it a data-entry error, a legitimate repeated measurement, or an observation requiring field-sheet verification?",
            ],
          },
          {
            title: "The Nine Mandatory Forestry Interpretation Deliverables",
            badge: "Scientific Synthesis",
            desc: "Upon producing stand summaries, answer these analytical inquiries in your report:",
            type: "ordered",
            items: [
              "Which data-quality problems were present in the raw inventory?",
              "Which records were converted to missing values, and why?",
              "Which records were flagged rather than deleted?",
              "How many trees and plots remained in the analysis dataset?",
              "Which species had the highest relative density?",
              "Which species had the highest relative dominance?",
              "Which species had the highest importance value?",
              "Did the species with the highest density also have the highest dominance?",
              "What does this tell you about the structural composition of the Bagmati community forest?",
            ],
          },
        ],
      },
      {
        id: "review",
        label: "Review Problems",
        description: "Comprehensive end-of-unit review questions covering the entire pipeline.",
        cards: [
          {
            title: "End-of-Unit Review Questions",
            badge: "Pipeline Review",
            type: "ordered",
            items: [
              "Import versus Cleaning: Why should importing a dataset and cleaning a dataset be treated as separate stages of the workflow?",
              "Data Dictionary: A dataset contains a variable called dbh. Explain why knowing only the variable name is insufficient for reliable analysis, and what additional information the data dictionary should provide.",
              "Missing Values: A field dataset contains 0, -99, 999, and blank cells in the DBH column. Explain why these values cannot automatically be treated as equivalent.",
              "Validation versus Deletion: A 10-cm tree is recorded as 40 m tall. Explain why the appropriate first response is to flag the observation rather than automatically delete it.",
              "Raw Data: Why should raw field data never be overwritten during cleaning? Describe how the raw, processed, and derived datasets should relate to one another.",
              "Species Standardisation: Explain why changing S. robusta, Shorea robusta, and Shorea rubusta to one standard name is an analytical decision rather than merely a formatting correction.",
              "Duplicates: Why can two identical-looking rows represent legitimate observations in a longitudinal forest inventory?",
              "Trees per Hectare: A 0.05-ha plot contains 35 trees. Calculate trees per hectare and explain why this conversion is necessary when comparing plots of different sizes.",
              "Basal Area: Explain the difference between total plot basal area and basal area per hectare.",
              "Ecological Metrics: A species has low relative density but very high relative dominance. What does this suggest about the size and structural contribution of its trees?",
              "Importance Value: Explain why relative density, relative dominance, and relative frequency provide different information about a species, and why it is useful to combine them.",
              "APIs and Reproducibility: Give two advantages of retrieving climate or biodiversity data through an API rather than downloading and manually processing the data.",
              "External Data: Why should GBIF occurrence records not be treated as though they were additional field observations from the Bagmati Observatory?",
              "Research Record: A researcher discovers after analysis that 12 DBH values were entered using millimetres instead of centimetres. Describe how the error should be corrected while preserving reproducibility.",
            ],
          },
        ],
      },
    ],
  },
}

const UnitQuestionsSection = ({
  unitId,
  isOpen,
  onToggle,
  activeTab,
  onSelectTab,
}) => {
  const data = unitQuestions[unitId]
  if (!data) return null

  const currentTab =
    data.categories.find(c => c.id === activeTab) || data.categories[0]

  return (
    <div
      className={`forestry-questions-card ${isOpen ? "is-open" : "is-collapsed"
        }`}
    >
      <button
        type="button"
        className="forestry-questions-toggle-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="forestry-questions-header-main">
          <div className="forestry-questions-badge-row">
            <span className="forestry-questions-badge-pill">
              Course Text Inquiries
            </span>
            <span className="forestry-questions-self-study-pill">
              Self-Paced Review
            </span>
          </div>
          <h4 className="forestry-questions-title">
            Guiding Questions &amp; Review Checkpoints
          </h4>
          <p className="forestry-questions-desc">
            Guiding research inquiries, directory audit checkpoints, and end-of-unit review problems from the course text.
          </p>
        </div>
        <div className="forestry-questions-toggle-action">
          <span className="forestry-questions-toggle-text">
            {isOpen ? "Hide Questions ▲" : "View Questions (3 Sections) ▼"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="forestry-questions-content">
          <div className="forestry-questions-intro">
            {data.intro}
          </div>

          {/* Tabs Bar */}
          <div className="forestry-qtabs-bar" role="tablist">
            {data.categories.map(cat => {
              const isActive = cat.id === currentTab.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`forestry-qtab-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => onSelectTab(cat.id)}
                >
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="forestry-qtab-content" role="tabpanel">
            {currentTab.cards.map((card, cIdx) => (
              <div key={cIdx} className="forestry-qcard">
                <div className="forestry-qcard-header">
                  {card.badge && (
                    <span className="forestry-qcard-badge">{card.badge}</span>
                  )}
                  <h5 className="forestry-qcard-title">{card.title}</h5>
                </div>

                {card.desc && (
                  <p
                    className="forestry-qcard-desc"
                    style={{
                      margin: "2px 0 6px",
                      fontSize: "0.88rem",
                      color: "#475569",
                    }}
                  >
                    {card.desc}
                  </p>
                )}

                {card.type === "quotes" && (
                  <div className="forestry-qcard-quotes">
                    {card.items.map((quote, qIdx) => (
                      <blockquote key={qIdx} className="forestry-qcard-quote">
                        “{quote}”
                      </blockquote>
                    ))}
                  </div>
                )}

                {card.type === "ordered" && (
                  <ol className="forestry-qcard-list">
                    {card.items.map((item, oIdx) => (
                      <li key={oIdx}>{item}</li>
                    ))}
                  </ol>
                )}

                {card.type === "shifts" && (
                  <div className="forestry-qcard-shift">
                    {card.shifts.map((shift, sIdx) => (
                      <div key={sIdx} className="forestry-shift-item">
                        <span className="forestry-shift-from">
                          <span style={{ fontWeight: 600, color: "#64748b" }}>Traditional approach:</span> {shift.from}
                        </span>
                        <span className="forestry-shift-arrow">→</span>
                        <span className="forestry-shift-to">
                          <span style={{ fontWeight: 600, color: "#16a34a" }}>Computational rule:</span> {shift.to}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {card.type === "scenarios" && (
                  <div
                    className="forestry-qcard-scenarios"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {card.scenarios.map((sc, scIdx) => (
                      <div
                        key={scIdx}
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          padding: "12px 14px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <strong
                          style={{ fontSize: "0.88rem", color: "#1e293b" }}
                        >
                          {sc.name}
                        </strong>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.86rem",
                            color: "#334155",
                            lineHeight: 1.5,
                          }}
                        >
                          <strong>Scenario:</strong> {sc.scenario}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.86rem",
                            color: "#4338ca",
                            fontWeight: 600,
                            lineHeight: 1.5,
                          }}
                        >
                          <strong>Required Analysis:</strong> {sc.prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const ComputationalForestryPage = ({ location }) => {
  const [openUnits, setOpenUnits] = React.useState({})
  const [copiedId, setCopiedId] = React.useState(null)
  const [isCheatsheetOpen, setIsCheatsheetOpen] = React.useState(false)
  const [isAssignmentOpen, setIsAssignmentOpen] = React.useState(false)
  const [openQuestions, setOpenQuestions] = React.useState({})
  const [activeTabByUnit, setActiveTabByUnit] = React.useState({
    "unit-1": "guiding",
    "unit-2": "guiding",
    "unit-3": "guiding",
  })

  const toggleQuestions = unitId => {
    setOpenQuestions(prev => ({ ...prev, [unitId]: !prev[unitId] }))
  }

  const selectTab = (unitId, tabId) => {
    setActiveTabByUnit(prev => ({ ...prev, [unitId]: tabId }))
  }

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
                        : unitQuestions[unit.id]
                          ? "Preview Inquiries"
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
                                    className={`forestry-resource-type ${file.type ? file.type.toLowerCase() : ""
                                      }`}
                                  >
                                    {file.type}
                                  </span>
                                  <div className="forestry-resource-details">
                                    <div className="forestry-resource-name-row">
                                      <span className="forestry-resource-name">
                                        {file.name}
                                      </span>
                                      {file.isStarter && (
                                        <span className="forestry-starter-badge">Practice Starter</span>
                                      )}
                                      {file.isLiveScript && (
                                        <span className="forestry-live-badge">In-Class Lecture Script</span>
                                      )}
                                    </div>
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

                          {unit.id === "unit-1" && (
                            <UnitQuestionsSection
                              unitId="unit-1"
                              isOpen={!!openQuestions["unit-1"]}
                              onToggle={() => toggleQuestions("unit-1")}
                              activeTab={activeTabByUnit["unit-1"] || "guiding"}
                              onSelectTab={tabId => selectTab("unit-1", tabId)}
                            />
                          )}

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
                                                    className={`forestry-cmd-copy-btn ${isCopied ? "is-copied" : ""
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

                          {unit.id === "unit-2" && (
                            <div className="forestry-lab-banner-card">
                              <div className="forestry-lab-banner-content">
                                <span className="forestry-lab-banner-badge">
                                  Live Interactive Workbook
                                </span>
                                <h4 className="forestry-lab-banner-title">
                                  Unit II In-Browser R Coding Lab (Interactive Sandbox)
                                </h4>
                                <p className="forestry-lab-banner-desc">
                                  Execute live R code directly in your browser without installing anything. Practice single-tree basal area math, data types, defensive guards, starter inventory queries, and publication-ready forestry plots with live console outputs and graphs.
                                </p>
                              </div>
                              <Link
                                to="/course/Computational_Methods_for_Forestry_Research/unit-2-r-lab/"
                                className="forestry-lab-banner-btn"
                              >
                                Launch In-Browser Lab →
                              </Link>
                            </div>
                          )}

                          {unit.id === "unit-2" && (
                            <div className={`forestry-assignment-card ${isAssignmentOpen ? "is-open" : "is-collapsed"}`}>
                              <button
                                type="button"
                                className="forestry-assignment-toggle-btn"
                                onClick={() => setIsAssignmentOpen(prev => !prev)}
                                aria-expanded={isAssignmentOpen}
                              >
                                <div className="forestry-assignment-header-main">
                                  <div className="forestry-assignment-badge-row">
                                    <span className="forestry-assignment-badge-pill">
                                      Unit II Homework
                                    </span>
                                    <span className="forestry-assignment-deadline-pill">
                                      ⏰ Due: Sunday, Nov 1, 2026 · 10:00 AM Sharp
                                    </span>
                                  </div>
                                  <h4 className="forestry-assignment-title">
                                    Homework: Forensic Data Screening &amp; Exploratory Analysis in Base R
                                  </h4>
                                  <p className="forestry-assignment-desc">
                                    Dataset: <code>data/raw/bagmati_raw_inventory.csv</code> · Submission format: GitHub Pull Request link sent to class WhatsApp.
                                  </p>
                                </div>
                                <div className="forestry-assignment-toggle-action">
                                  <span className="forestry-assignment-toggle-text">
                                    {isAssignmentOpen ? "Hide Assignment Brief" : "View Assignment & Protocol (5 Parts)"}
                                  </span>
                                  <span className="forestry-assignment-toggle-icon" aria-hidden="true">
                                    {isAssignmentOpen ? "▲" : "▼"}
                                  </span>
                                </div>
                              </button>

                              {isAssignmentOpen && (
                                <div className="forestry-assignment-content">
                                  <div className="forestry-assignment-notice">
                                    <strong>Academic Integrity &amp; Scope:</strong> This assignment must be solved strictly using Base R (Sections 1–8 and 13 of the course book). External packages such as <code>dplyr</code>, <code>tidyverse</code>, or pipe operators (<code>%&gt;%</code>, <code>|&gt;</code>) are prohibited. Because the Bagmati inventory dataset contains specific field-entry anomalies and non-standard missing codes, generic AI queries generate incorrect column indexing and flawed aggregations. All calculations must be derived and verified directly in your local R console.
                                  </div>

                                  {/* Submission Protocol */}
                                  <div className="forestry-assignment-section">
                                    <h5 className="forestry-assignment-section-title">
                                      Submission Protocol (Follow Strictly)
                                    </h5>
                                    <p className="forestry-assignment-section-desc">
                                      Do <strong>NOT</strong> commit directly to the <code>main</code> branch. Follow these exact steps:
                                    </p>
                                    <ol className="forestry-assignment-steps">
                                      <li>Open your terminal / Git Bash inside your project directory.</li>
                                      <li>
                                        Create and switch to a new branch named with your <code>Firstname_Lastname_Date</code>:
                                        <div className="forestry-cmd-box forestry-assignment-cmd">
                                          <div className="forestry-cmd-header">
                                            <span className="forestry-cmd-note">Example: git checkout -b ram_shrestha_2026_11_01</span>
                                            <button
                                              type="button"
                                              className={`forestry-cmd-copy-btn ${copiedId === "hw-branch" ? "is-copied" : ""}`}
                                              onClick={() => handleCopy("hw-branch", "git checkout -b firstname_lastname_2026_11_01")}
                                            >
                                              {copiedId === "hw-branch" ? "✓ Copied" : "Copy"}
                                            </button>
                                          </div>
                                          <pre className="forestry-cmd-pre">
                                            <code>git checkout -b firstname_lastname_2026_11_01</code>
                                          </pre>
                                        </div>
                                      </li>
                                      <li>
                                        Create your script in the <code>scripts/</code> directory named: <code>homework_unit2_firstname_lastname.R</code>.
                                      </li>
                                      <li>
                                        Solve all tasks below with clear comments and output messages using <code>cat()</code> or <code>print()</code>.
                                      </li>
                                      <li>
                                        Stage and commit your script:
                                        <div className="forestry-cmd-box forestry-assignment-cmd">
                                          <div className="forestry-cmd-header">
                                            <span className="forestry-cmd-note">Stage &amp; Commit with informative message</span>
                                            <button
                                              type="button"
                                              className={`forestry-cmd-copy-btn ${copiedId === "hw-commit" ? "is-copied" : ""}`}
                                              onClick={() => handleCopy("hw-commit", `git add scripts/homework_unit2_firstname_lastname.R\ngit commit -m "feat: complete unit 2 forensic data analysis and visualization homework"`)}
                                            >
                                              {copiedId === "hw-commit" ? "✓ Copied" : "Copy"}
                                            </button>
                                          </div>
                                          <pre className="forestry-cmd-pre">
                                            <code>{`git add scripts/homework_unit2_firstname_lastname.R\ngit commit -m "feat: complete unit 2 forensic data analysis and visualization homework"`}</code>
                                          </pre>
                                        </div>
                                      </li>
                                      <li>
                                        Push your branch to your remote repository on GitHub:
                                        <div className="forestry-cmd-box forestry-assignment-cmd">
                                          <div className="forestry-cmd-header">
                                            <span className="forestry-cmd-note">Push with upstream tracking (-u)</span>
                                            <button
                                              type="button"
                                              className={`forestry-cmd-copy-btn ${copiedId === "hw-push" ? "is-copied" : ""}`}
                                              onClick={() => handleCopy("hw-push", "git push -u origin firstname_lastname_2026_11_01")}
                                            >
                                              {copiedId === "hw-push" ? "✓ Copied" : "Copy"}
                                            </button>
                                          </div>
                                          <pre className="forestry-cmd-pre">
                                            <code>git push -u origin firstname_lastname_2026_11_01</code>
                                          </pre>
                                        </div>
                                      </li>
                                      <li>
                                        Go to your repository on GitHub in your browser:
                                        <ul>
                                          <li>Click <strong>Compare &amp; pull request</strong> (target: <code>main</code> branch).</li>
                                          <li>Title your PR: <code>[Homework Submission] Unit II - Firstname Lastname</code>.</li>
                                          <li>Submit the Pull Request.</li>
                                        </ul>
                                      </li>
                                      <li>
                                        <strong>Copy the link/URL of that open Pull Request</strong> and paste it into the class WhatsApp group before <strong>Sunday 10:00 AM</strong>.
                                      </li>
                                    </ol>
                                  </div>

                                  {/* Tasks List */}
                                  <div className="forestry-assignment-section">
                                    <h5 className="forestry-assignment-section-title">
                                      Assignment Tasks
                                    </h5>

                                    <div className="forestry-assignment-task-group">
                                      <h6 className="forestry-assignment-task-title">
                                        Part 1: Data Ingestion &amp; Structural Inspection
                                      </h6>
                                      <ol className="forestry-assignment-task-list">
                                        <li>Load <code>data/raw/bagmati_raw_inventory.csv</code> into an object named <code>inv</code> using <code>read.csv()</code>.</li>
                                        <li>
                                          Inspect the dataset:
                                          <ul>
                                            <li>How many total tree rows and how many columns are there? Print exact counts with <code>nrow()</code> and <code>ncol()</code>.</li>
                                            <li>Print all column names with <code>names()</code>. Notice the exact case-sensitivity of every column.</li>
                                            <li>Inspect the internal structure and storage types of each column using <code>str()</code>.</li>
                                          </ul>
                                        </li>
                                        <li>Verify the specific data type and storage mode of <code>DBH_cm</code> and <code>Species</code> using <code>class()</code> and <code>typeof()</code>.</li>
                                      </ol>
                                    </div>

                                    <div className="forestry-assignment-task-group">
                                      <h6 className="forestry-assignment-task-title">
                                        Part 2: Forensic Data Auditing &amp; Missing Values
                                      </h6>
                                      <p className="forestry-assignment-task-desc">
                                        Raw forestry survey sheets frequently contain transcription errors and protocol sentinel codes. Write Base R code to audit the following:
                                      </p>
                                      <ol className="forestry-assignment-task-list">
                                        <li><strong>Missing Data (<code>NA</code>):</strong> How many explicit <code>NA</code> values exist in <code>DBH_cm</code>? How many in <code>Height_m</code>? Print exact counts using <code>is.na()</code> and <code>sum()</code>.</li>
                                        <li><strong>Protocol Missing Codes (<code>-99</code> and <code>999</code>):</strong> Field crews often record <code>-99</code> or <code>999</code> when an attribute cannot be measured. How many trees have <code>DBH_cm == -99</code>? How many have <code>DBH_cm == 999</code>? How many have <code>Height_m == -99</code>?</li>
                                        <li><strong>Biological Boundary Violations:</strong> Are there any trees with non-positive diameters (DBH ≤ 0)? Use logical comparison and <code>sum(..., na.rm = TRUE)</code> to report the exact count.</li>
                                        <li>
                                          <strong>The Plot P17 Field Sheet Transcription Case:</strong> Query tree <code>Tree_ID == "T203"</code> in Plot <code>"P17"</code> using bracket row indexing:
                                          <pre className="forestry-cmd-pre" style={{ margin: "6px 0", background: "#18181b", borderRadius: "4px" }}>
                                            <code>{`inv[inv$Plot_ID == "P17" & inv$Tree_ID == "T203", ]`}</code>
                                          </pre>
                                          Its recorded DBH is <code>999 cm</code> despite having a measured height of 21.3 m. Field notes reveal the scribe entered 999 as a transcription error instead of the measured value. The audit log confirms the true measured diameter was <strong>29.9 cm</strong>. In your script, assign this corrected DBH value to tree T203.
                                        </li>
                                        <li><strong>Millimetre Entry Errors:</strong> Identify trees whose diameters were recorded in millimetres instead of centimetres (150 &lt; DBH &lt; 900 cm). Write a relational query to report the exact number of stems affected by this error, and correct them to centimetres by dividing by 10.</li>
                                      </ol>
                                    </div>

                                    <div className="forestry-assignment-task-group">
                                      <h6 className="forestry-assignment-task-title">
                                        Part 3: Logical Subsetting &amp; Ecological Queries
                                      </h6>
                                      <p className="forestry-assignment-task-desc">
                                        <em>Create a clean working subset <code>inv_clean</code> excluding records where DBH is missing (<code>NA</code>), non-positive (≤ 0), or sentinel codes (-99, 999).</em>
                                      </p>
                                      <ol className="forestry-assignment-task-list">
                                        <li>
                                          <strong>Size Classes via <code>cut()</code>:</strong> Create a factor column named <code>size_class</code> in <code>inv_clean</code> with levels:
                                          <ul>
                                            <li><strong>Sapling:</strong> (0, 10] cm</li>
                                            <li><strong>Pole:</strong> (10, 30] cm</li>
                                            <li><strong>Sawtimber:</strong> &gt; 30 cm</li>
                                          </ul>
                                          Generate a frequency table using <code>table(inv_clean$size_class)</code>. Report the exact stem count in each category. Which diameter class dominates the stand?
                                        </li>
                                        <li><strong>Finding the Champion Tree (<code>which.max</code>):</strong> Which row number holds the true biological champion tree (largest valid diameter)? Print that champion tree's full record (Plot_ID, Tree_ID, Species, DBH_cm, Height_m). <em>(Warning: If your output says DBH = 999 cm or 343 cm, you failed to screen missing codes or correct millimetre entries before searching!)</em></li>
                                        <li><strong>Target Species Subsetting:</strong> How many <em>Shorea robusta</em> (Sal) trees exist in the clean inventory? What is the mean DBH of <em>Shorea robusta</em>? (Remember <code>na.rm = TRUE</code>!)</li>
                                      </ol>
                                    </div>

                                    <div className="forestry-assignment-task-group">
                                      <h6 className="forestry-assignment-task-title">
                                        Part 4: Defensive Functions &amp; Stand Variability
                                      </h6>
                                      <ol className="forestry-assignment-task-list">
                                        <li>
                                          <strong>Basal Area Calculation:</strong> Write or reuse your defensive <code>calculate_basal_area(dbh_cm)</code> function (ensuring it stops on DBH ≤ 0 and warns on DBH &gt; 150). Calculate basal area for all trees in <code>inv_clean</code> and store it in <code>inv_clean$ba_m2</code>. What is the <strong>total basal area (m²)</strong> across all valid trees? Report to 4 decimal places.
                                        </li>
                                        <li>
                                          <strong>Coefficient of Variation (CV%):</strong> Implement your custom <code>calc_cv()</code> function: <code>CV% = (sd(x, na.rm=TRUE) / mean(x, na.rm=TRUE)) * 100</code>. Calculate the CV% of <code>DBH_cm</code> across all measured trees. Does the stand show low (&lt;20%) or high (&gt;30%) structural variability?
                                        </li>
                                        <li>
                                          <strong>Testing Model Domain Boundaries:</strong> Call <code>calculate_volume_example(dbh_cm, height_m)</code> on:
                                          <ul>
                                            <li><strong>Tree A:</strong> DBH = 32.4 cm, Height = 22.1 m</li>
                                            <li><strong>Tree B:</strong> DBH = 6.5 cm, Height = 4.2 m</li>
                                          </ul>
                                          What happens when you run Tree B? Explain in a code comment what warning was triggered and why domain guards are necessary in allometric forestry equations.
                                        </li>
                                      </ol>
                                    </div>

                                    <div className="forestry-assignment-task-group">
                                      <h6 className="forestry-assignment-task-title">
                                        Part 5: Exploratory Visualisation in Base R
                                      </h6>
                                      <p className="forestry-assignment-task-desc">
                                        Generate and save a 2-by-2 multi-panel diagnostic graph into your <code>figures/</code> directory as <code>figures/homework_unit2_diagnostics.png</code>:
                                      </p>
                                      <pre className="forestry-cmd-pre" style={{ margin: "8px 0", background: "#18181b", borderRadius: "6px" }}>
                                        <code>{`png("figures/homework_unit2_diagnostics.png", width = 1200, height = 1000, res = 150)
par(mfrow = c(2, 2))

# 1. Histogram of DBH_cm with a dashed red line for the mean
# 2. Histogram of Height_m with a dashed blue line for the median
# 3. Boxplot of DBH_cm comparing the 4 stands (Stand_ID)
# 4. Scatterplot of DBH_cm (X-axis) vs Height_m (Y-axis) with a trendline using abline(lm(...))

par(mfrow = c(1, 1))
dev.off()`}</code>
                                      </pre>
                                    </div>
                                  </div>

                                  {/* Grading Rubric */}
                                  <div className="forestry-assignment-section">
                                    <h5 className="forestry-assignment-section-title">
                                      Grading Rubric (Evaluation Breakdown)
                                    </h5>
                                    <div className="forestry-rubric-grid">
                                      <div className="forestry-rubric-card">
                                        <span className="forestry-rubric-score">40%</span>
                                        <h6 className="forestry-rubric-label">Base R Logic</h6>
                                        <p className="forestry-rubric-desc">
                                          Proper handling of <code>NA</code>, <code>na.rm = TRUE</code>, bracket indexing, and defensive guards.
                                        </p>
                                      </div>
                                      <div className="forestry-rubric-card">
                                        <span className="forestry-rubric-score">25%</span>
                                        <h6 className="forestry-rubric-label">Forensic Cleaning</h6>
                                        <p className="forestry-rubric-desc">
                                          Auditing sentinel codes (-99/999), resolving the P17/T203 typo, and mm-to-cm unit corrections.
                                        </p>
                                      </div>
                                      <div className="forestry-rubric-card">
                                        <span className="forestry-rubric-score">20%</span>
                                        <h6 className="forestry-rubric-label">Figure Export</h6>
                                        <p className="forestry-rubric-desc">
                                          Generating the 2x2 multi-panel diagnostic plot saved to <code>figures/</code>.
                                        </p>
                                      </div>
                                      <div className="forestry-rubric-card">
                                        <span className="forestry-rubric-score">15%</span>
                                        <h6 className="forestry-rubric-label">Git Discipline</h6>
                                        <p className="forestry-rubric-desc">
                                          Accurate branch naming, clean commit message, and valid Pull Request submitted to <code>main</code>.
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Footer Actions */}
                                  <div className="forestry-assignment-actions">
                                    <Link
                                      to="/course/Computational_Methods_for_Forestry_Research/unit-2-r-lab/"
                                      className="forestry-assignment-action-btn primary"
                                    >
                                      Open In-Browser Lab to Practice Code →
                                    </Link>
                                    <a
                                      href="/course/Computational_Methods_for_Forestry_Research/Unit-II/assignment_unit2_base_r.md"
                                      download="assignment_unit2_base_r.md"
                                      className="forestry-assignment-action-btn secondary"
                                    >
                                      Download Assignment (.md) ↓
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {unit.id === "unit-2" && (
                            <UnitQuestionsSection
                              unitId="unit-2"
                              isOpen={!!openQuestions["unit-2"]}
                              onToggle={() => toggleQuestions("unit-2")}
                              activeTab={activeTabByUnit["unit-2"] || "guiding"}
                              onSelectTab={tabId => selectTab("unit-2", tabId)}
                            />
                          )}

                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {unit.id === "unit-3" && unitQuestions["unit-3"] ? (
                            <React.Fragment>
                              <div className="forestry-preview-banner">
                                <span className="forestry-preview-banner-badge">
                                  Preview Phase · Upcoming Unit
                                </span>
                                <h5 className="forestry-preview-banner-title">
                                  Unit III Inquiries &amp; Pipeline Architecture
                                </h5>
                                <p className="forestry-preview-banner-desc">
                                  Lecture presentations and practical datasets will be uploaded as Unit III begins. In the meantime, preview the guiding research inquiries, five-stage pipeline checkpoints, and ecological review questions below to explore computational workflows early.
                                </p>
                              </div>
                              <UnitQuestionsSection
                                unitId="unit-3"
                                isOpen={!!openQuestions["unit-3"]}
                                onToggle={() => toggleQuestions("unit-3")}
                                activeTab={activeTabByUnit["unit-3"] || "guiding"}
                                onSelectTab={tabId => selectTab("unit-3", tabId)}
                              />
                            </React.Fragment>
                          ) : (
                            <p className="forestry-toc-empty">
                              No resources uploaded yet. Files will appear here as this unit begins.
                            </p>
                          )}
                        </React.Fragment>
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
