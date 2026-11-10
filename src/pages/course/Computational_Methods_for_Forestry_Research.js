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
        label: "Lecture Presentation: Computational Workflow & Reproducible Foundations (Slide Deck)",
        type: "PPTX",
        size: "64 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-I/unit1_computational_workflow.pptx",
        slideDeck: {
          basePath: "/course/Computational_Methods_for_Forestry_Research/slides/unit-1",
          totalSlides: 8,
        },
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
        label: "Lecture Presentation: Programming Fundamentals in Base R (Slide Deck)",
        type: "PPTX",
        size: "165 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/unit2_programming_fundamentals_r.pptx",
        slideDeck: {
          basePath: "/course/Computational_Methods_for_Forestry_Research/slides/unit-2",
          totalSlides: 11,
        },
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
    files: [
      {
        name: "unit3_forest_inventory_cleaning_apis.pptx",
        label: "Lecture Presentation: Forest Inventory Data Cleaning & APIs (Slide Deck)",
        type: "PPTX",
        size: "66 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/unit3_forest_inventory_cleaning_apis.pptx",
        slideDeck: {
          basePath: "/course/Computational_Methods_for_Forestry_Research/slides/unit-3",
          totalSlides: 8,
        },
      },
      {
        name: "03_clean_inventory.R",
        label: "Master Data Cleaning & Stand Summaries Pipeline (Complete Solution)",
        type: "R",
        size: "5.2 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/03_clean_inventory.R",
      },
      {
        name: "03_clean_inventory_starter.R",
        label: "Data Cleaning & Stand Summaries Starter Script (Practice Lab)",
        type: "R",
        isStarter: true,
        size: "4.2 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/03_clean_inventory_starter.R",
      },
      {
        name: "bagmati_raw_inventory.csv",
        label: "Raw Bagmati Inventory Dataset (2,005 Stems with Realistic Field Errors)",
        type: "CSV",
        size: "228 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/bagmati_raw_inventory.csv",
      },
      {
        name: "bagmati_clean_inventory.csv",
        label: "Validated Baseline Inventory Dataset (Standardized Taxonomy & Measurements)",
        type: "CSV",
        size: "361 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/bagmati_clean_inventory.csv",
      },
      {
        name: "bagmati_flagged_records_review.csv",
        label: "Supervisor Audit Table (30 Screened Anomalies & Transcription Flags)",
        type: "CSV",
        size: "2.2 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/bagmati_flagged_records_review.csv",
      },
      {
        name: "bagmati_plot_summary.csv",
        label: "Plot-Level Stand Structure Metrics (TPH, BA/ha, Mean DBH, Richness)",
        type: "CSV",
        size: "2.7 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/bagmati_plot_summary.csv",
      },
      {
        name: "bagmati_species_summary.csv",
        label: "Species Importance Value Index (Density, Dominance, Frequency, IVI)",
        type: "CSV",
        size: "1.2 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/bagmati_species_summary.csv",
      },
      {
        name: "gbif_shorea_robusta_bagmati.csv",
        label: "GBIF Occurrence Reference Dataset (Offline Sal Distribution in Nepal)",
        type: "CSV",
        size: "5.3 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/gbif_shorea_robusta_bagmati.csv",
      },
      {
        name: "species_lookup.csv",
        label: "Taxonomic Lookup Table (Botanical & Common Name Standardization)",
        type: "CSV",
        size: "370 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-III/species_lookup.csv",
      },
    ],
  },
  {
    id: "unit-4",
    num: "04",
    title: "Unit IV: Statistical Modeling & Mixed-Effects — Overcoming Pseudoreplication",
    files: [
      {
        name: "unit4_statistics_viz_mixed_models.pptx",
        label: "Lecture Presentation: Statistical Modeling & Mixed-Effects (Slide Deck)",
        type: "PPTX",
        size: "65 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-IV/unit4_statistics_viz_mixed_models.pptx",
        slideDeck: {
          basePath: "/course/Computational_Methods_for_Forestry_Research/slides/unit-4",
          totalSlides: 8,
        },
      },
      {
        name: "04_mixed_models.R",
        label: "Linear vs Mixed-Effects Allometry Pipeline & ICC Partitioning (Complete Solution)",
        type: "R",
        size: "3.4 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-IV/04_mixed_models.R",
      },
      {
        name: "04_mixed_models_starter.R",
        label: "Mixed-Effects Modeling Starter Script (Practice Lab)",
        type: "R",
        isStarter: true,
        size: "2.6 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-IV/04_mixed_models_starter.R",
      },
      {
        name: "04_lm_vs_lmer_comparison.csv",
        label: "Model Standard Error Comparison Table (Quantifying Pseudoreplication Bias)",
        type: "CSV",
        size: "232 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-IV/04_lm_vs_lmer_comparison.csv",
      },
      {
        name: "04_dbh_histogram.png",
        label: "Publication Figure: Diameter Distribution Across Bagmati Community Plots",
        type: "PNG",
        size: "113 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-IV/04_dbh_histogram.png",
      },
      {
        name: "04_height_dbh_faceted.png",
        label: "Publication Figure: Species-Faceted Height-DBH Allometric Regressions",
        type: "PNG",
        size: "570 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-IV/04_height_dbh_faceted.png",
      },
      {
        name: "04_lm_diagnostics.png",
        label: "Diagnostic Figure: 4-Panel Linear Regression Assumption Residual Plots",
        type: "PNG",
        size: "304 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-IV/04_lm_diagnostics.png",
      },
    ],
  },
  {
    id: "unit-5",
    num: "05",
    title: "Unit V: Allometry, Non-Linear Growth Models & Community Ecology",
    files: [
      {
        name: "unit5_allometry_growth_ecology.pptx",
        label: "Lecture Presentation: Allometric Biomass & Community Ecology (Slide Deck)",
        type: "PPTX",
        size: "65 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-V/unit5_allometry_growth_ecology.pptx",
        slideDeck: {
          basePath: "/course/Computational_Methods_for_Forestry_Research/slides/unit-5",
          totalSlides: 8,
        },
      },
      {
        name: "05_allometry_and_ecology.R",
        label: "Non-Linear Curves, Baskerville Bias Correction & NMDS Ordination (Complete Solution)",
        type: "R",
        size: "5.6 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-V/05_allometry_and_ecology.R",
      },
      {
        name: "05_allometry_and_ecology_starter.R",
        label: "Allometric & Ecological Ordination Starter Script (Practice Lab)",
        type: "R",
        isStarter: true,
        size: "3.3 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-V/05_allometry_and_ecology_starter.R",
      },
      {
        name: "05_hd_model_comparison.csv",
        label: "H-D Model Evaluation Table (Linear, Chapman-Richards, Michaelis-Menten)",
        type: "CSV",
        size: "231 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-V/05_hd_model_comparison.csv",
      },
      {
        name: "05_biomass_cross_validation.csv",
        label: "Biomass Cross-Validation Metrics (Random Tree Split vs Whole-Plot Holdout)",
        type: "CSV",
        size: "178 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-V/05_biomass_cross_validation.csv",
      },
      {
        name: "05_plot_diversity_metrics.csv",
        label: "Stand Biodiversity Indices (Richness S, Shannon H', Simpson 1-D, Elevation)",
        type: "CSV",
        size: "893 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-V/05_plot_diversity_metrics.csv",
      },
      {
        name: "bagmati_species_by_plot_matrix.csv",
        label: "Community Ecology Species-by-Plot Abundance Matrix",
        type: "CSV",
        size: "630 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-V/bagmati_species_by_plot_matrix.csv",
      },
      {
        name: "05_nmds_ordination.png",
        label: "Publication Figure: NMDS Ordination Along Kathmandu Valley Elevation Gradient",
        type: "PNG",
        size: "208 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-V/05_nmds_ordination.png",
      },
    ],
  },
  {
    id: "unit-6",
    num: "06",
    title: "Unit VI: Python for Automation & Batch Data Pipelines",
    files: [
      {
        name: "unit6_python_automation_batch_processing.pptx",
        label: "Lecture Presentation: Python Pipeline Automation & Batch Processing (Slide Deck)",
        type: "PPTX",
        size: "65 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VI/unit6_python_automation_batch_processing.pptx",
        slideDeck: {
          basePath: "/course/Computational_Methods_for_Forestry_Research/slides/unit-6",
          totalSlides: 8,
        },
      },
      {
        name: "06_batch_pipeline.py",
        label: "Automated 100-Plot Batch Ingestion & QC Logging Pipeline (Complete Solution)",
        type: "PY",
        size: "3.9 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VI/06_batch_pipeline.py",
      },
      {
        name: "06_batch_pipeline_starter.py",
        label: "Batch Processing & QC Logging Starter Script (Practice Lab)",
        type: "PY",
        isStarter: true,
        size: "2.6 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VI/06_batch_pipeline_starter.py",
      },
      {
        name: "plots_batch.zip",
        label: "Complete Batch Archive (100 Individual Forest Plot CSVs for Pipeline Testing)",
        type: "ZIP",
        size: "98 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VI/plots_batch.zip",
      },
      {
        name: "bagmati_quality_control.csv",
        label: "Automated QC Log Report (Flagged Anomalies, Schema Violations, NA Counts)",
        type: "CSV",
        size: "359 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VI/bagmati_quality_control.csv",
      },
      {
        name: "bagmati_plot_summary.csv",
        label: "Aggregated 100-Plot Summary Metrics Output Table",
        type: "CSV",
        size: "4.2 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VI/bagmati_plot_summary.csv",
      },
    ],
  },
  {
    id: "unit-7",
    num: "07",
    title: "Unit VII: Spatial Analysis, LiDAR, GEE & Machine Learning Classification",
    files: [
      {
        name: "unit7_spatial_lidar_gee_machine_learning.pptx",
        label: "Lecture Presentation: Spatial Analysis, LiDAR Point Clouds & GEE (Slide Deck)",
        type: "PPTX",
        size: "65 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/unit7_spatial_lidar_gee_machine_learning.pptx",
        slideDeck: {
          basePath: "/course/Computational_Methods_for_Forestry_Research/slides/unit-7",
          totalSlides: 8,
        },
      },
      {
        name: "07_spatial_lidar_gee.py",
        label: "Spatial Buffers, DEM Extraction, LiDAR CHM & Random Forest ML (Complete Solution)",
        type: "PY",
        size: "4.6 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/07_spatial_lidar_gee.py",
      },
      {
        name: "07_spatial_lidar_gee_starter.py",
        label: "Spatial & Machine Learning Starter Script (Practice Lab)",
        type: "PY",
        isStarter: true,
        size: "2.1 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/07_spatial_lidar_gee_starter.py",
      },
      {
        name: "bagmati_plots.geojson",
        label: "Permanent Sample Plot Coordinates (Vector Point Layer, WGS84)",
        type: "GEOJSON",
        size: "5.1 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/bagmati_plots.geojson",
      },
      {
        name: "bagmati_boundary.geojson",
        label: "Study Watershed & Forest Administrative Boundary (Vector Polygon)",
        type: "GEOJSON",
        size: "392 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/bagmati_boundary.geojson",
      },
      {
        name: "bagmati_ground_truth.geojson",
        label: "Sentinel-2 Ground Truth Training & Validation Points (200 Reference Pixels)",
        type: "GEOJSON",
        size: "77 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/bagmati_ground_truth.geojson",
      },
      {
        name: "bagmati_dem.tif",
        label: "Digital Elevation Model Raster (Topography & Altitude, 30m Grid)",
        type: "TIF",
        size: "798 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/bagmati_dem.tif",
      },
      {
        name: "bagmati_sample.las",
        label: "Airborne LiDAR 3D Point Cloud Sample Tile (Ground & Canopy Returns)",
        type: "LAS",
        size: "166 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/bagmati_sample.las",
      },
      {
        name: "07_rf_accuracy_assessment.csv",
        label: "Random Forest Confusion Matrix (Producer & User Accuracy, Omission & Commission)",
        type: "CSV",
        size: "338 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/07_rf_accuracy_assessment.csv",
      },
      {
        name: "bagmati_landscape_master.csv",
        label: "Integrated Master Landscape Dataset (Field Plots, Elevation, LiDAR CHM, NDVI)",
        type: "CSV",
        size: "741 B",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VII/bagmati_landscape_master.csv",
      },
    ],
  },
  {
    id: "unit-8",
    num: "08",
    title: "Unit VIII: Decision Support Dashboards, Data Ethics & Capstone",
    files: [
      {
        name: "unit8_integration_ethics_dashboards.pptx",
        label: "Lecture Presentation: Decision Support Dashboards & Research Ethics (Slide Deck)",
        type: "PPTX",
        size: "65 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/unit8_integration_ethics_dashboards.pptx",
        slideDeck: {
          basePath: "/course/Computational_Methods_for_Forestry_Research/slides/unit-8",
          totalSlides: 8,
        },
      },
      {
        name: "app.R",
        label: "R Shiny Interactive Biomass Estimator with Active Domain Guards (Complete App)",
        type: "R",
        size: "2.9 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/app.R",
      },
      {
        name: "app_starter.R",
        label: "R Shiny Dashboard Starter Script (Practice Lab)",
        type: "R",
        isStarter: true,
        size: "2.4 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/app_starter.R",
      },
      {
        name: "app.py",
        label: "Python Streamlit Interactive Biomass Estimator with Domain Guards (Complete App)",
        type: "PY",
        size: "1.4 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/app.py",
      },
      {
        name: "app_starter.py",
        label: "Python Streamlit Dashboard Starter Script (Practice Lab)",
        type: "PY",
        isStarter: true,
        size: "1.1 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/app_starter.py",
      },
      {
        name: "08_ethics_and_packaging.R",
        label: "Spatial Data Minimization & Sensitive Taxus Protection Script (Complete Solution)",
        type: "R",
        size: "1.5 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/08_ethics_and_packaging.R",
      },
      {
        name: "08_ethics_and_packaging_starter.R",
        label: "Research Ethics & FAIR Data Packaging Starter Script (Practice Lab)",
        type: "R",
        isStarter: true,
        size: "1.2 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/08_ethics_and_packaging_starter.R",
      },
      {
        name: "bagmati_public_use_inventory.csv",
        label: "FAIR-Compliant Public-Use Inventory (Anonymized Coordinates & Elevation Bands)",
        type: "CSV",
        size: "237 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/bagmati_public_use_inventory.csv",
      },
      {
        name: "capstone_project_briefs.md",
        label: "Capstone Research Briefs, Deliverable Rubric & AI Disclosure Protocol",
        type: "MD",
        size: "2.6 KB",
        url: "/course/Computational_Methods_for_Forestry_Research/Unit-VIII/capstone_project_briefs.md",
      },
    ],
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
  "unit-4": {
    unitLabel: "Unit IV",
    unitTitle: "Statistical Modeling & Mixed-Effects — Overcoming Pseudoreplication",
    intro:
      "Guiding inquiries, model diagnostics, and mixed-effects checkpoints from Unit IV. Focuses on accounting for hierarchical sampling, residual validation, and partitioning between-plot vs within-plot variance.",
    categories: [
      {
        id: "guiding",
        label: "Guiding Questions",
        description: "Hierarchical sampling questions and statistical design inquiries.",
        cards: [
          {
            title: "The Sampling Hierarchy Dilemma",
            badge: "Statistical Independence",
            type: "quotes",
            items: [
              "Why is treating 2,000 trees measured across 20 sample plots as 2,000 independent observations statistically invalid in forest ecology?",
              "How does environmental heterogeneity among plots (slope, aspect, elevation, soil depth) induce correlation among co-occurring trees?",
              "What happens to standard errors and p-values when an ordinary linear model ignores plot clustering (pseudoreplication)?",
            ],
          },
          {
            title: "Variance Partitioning Inquiries",
            badge: "Intraclass Correlation",
            type: "quotes",
            items: [
              "What proportion of the total variation in tree height is driven by differences between stands versus differences among individual trees within the same stand?",
              "If the between-plot variance is substantial (ICC > 30%), what does this imply for future sample allocation across Bagmati Province?",
            ],
          },
        ],
      },
      {
        id: "practical",
        label: "Practical Checkpoints",
        description: "Hands-on diagnostic workflows and mixed-effects model outputs.",
        cards: [
          {
            title: "Linear Model Assumption Diagnostics",
            badge: "Residual Audit",
            type: "ordered",
            items: [
              "Residuals vs Fitted: Is the variance constant (homoscedastic), or does residual spread expand with tree size?",
              "Normal Q-Q: Do residual quantiles follow the 1:1 diagonal, or do large canopy dominants skew the distribution?",
              "Scale-Location: Is there a systematic trend in square-root standardized residuals across fitted values?",
              "Residuals vs Leverage: Are any single influential stems (e.g., the 40m/10cm outlier) exerting excessive leverage on the fitted slope?",
            ],
          },
          {
            title: "Model Comparison & ICC Benchmarks",
            badge: "Model Validation",
            type: "quotes",
            items: [
              "Compare the intercept standard error between lm and lmer: by what factor does accounting for plot clustering widen our uncertainty?",
              "Confirm that the random intercept variance (sigma^2_plot) and residual variance (sigma^2_res) sum to the total variance observed in tree heights.",
            ],
          },
        ],
      },
      {
        id: "review",
        label: "Review Problems",
        description: "Conceptual and analytical review problems from Unit IV.",
        cards: [
          {
            title: "End-of-Unit Mixed Modeling Review",
            badge: "Conceptual Review",
            type: "ordered",
            items: [
              "Pseudoreplication: Define pseudoreplication in the context of forest inventory plots and state its consequence on Type I error rates.",
              "Fixed versus Random Effects: Why is Plot_ID treated as a random effect rather than a 20-level fixed categorical predictor?",
              "Standard Error Honest Assessment: Explain why an ordinary linear regression model gives researchers an illusion of precision in clustered ecological data.",
              "Intraclass Correlation: In your own words, explain how the ICC is calculated from variance components and what an ICC of 0.34 indicates ecologically.",
              "Outlier Screening: Why should an implausible height-to-DBH ratio record be investigated and flagged rather than silently erased prior to model fitting?",
            ],
          },
        ],
      },
    ],
  },
  "unit-5": {
    unitLabel: "Unit V",
    unitTitle: "Allometry, Non-Linear Growth Models & Community Ecology",
    intro:
      "Guiding inquiries on asymptotic height-diameter functions, logarithmic back-transformation bias (Baskerville correction), spatial cross-validation, and multivariate community ecology.",
    categories: [
      {
        id: "guiding",
        label: "Guiding Questions",
        description: "Biometric and macroecological research inquiries driving Unit V.",
        cards: [
          {
            title: "Asymptotic Growth & Physiological Limits",
            badge: "Biometrics",
            type: "quotes",
            items: [
              "Why do linear height-diameter models fail biologically at large tree diameters?",
              "What physical and hydraulic constraints limit maximum tree height as diameter continues to expand?",
              "Does Chapman-Richards or Michaelis-Menten provide a better empirical fit for Schima wallichii across Bagmati stands?",
            ],
          },
          {
            title: "Logarithmic Back-Transformation Bias",
            badge: "Carbon Accounting",
            type: "quotes",
            items: [
              "Why does exponentiating a log-log regression prediction yield the geometric mean rather than the arithmetic mean of biomass?",
              "What magnitude of carbon stock underestimation occurs across Bagmati community forests if the Baskerville correction factor is omitted?",
            ],
          },
          {
            title: "Community Turnover & Elevational Gradients",
            badge: "Community Ecology",
            type: "quotes",
            items: [
              "How does tree species composition shift across the Kathmandu Valley rim as elevation increases from 1,400 m to 2,200 m?",
              "Can a single 2D ordination plot capture the dominant compositional gradients across our permanent sample plots?",
            ],
          },
        ],
      },
      {
        id: "practical",
        label: "Practical Checkpoints",
        description: "Allometric curve fitting, bias correction, and ordination benchmarks.",
        cards: [
          {
            title: "Non-Linear Model Evaluation Checklist",
            badge: "Curve Evaluation",
            type: "ordered",
            items: [
              "Fit linear, log-linear, Chapman-Richards, and Michaelis-Menten functions for Schima wallichii.",
              "Evaluate all candidate models on the original metre scale using Root Mean Square Error (RMSE) and AIC.",
              "Apply the Baskerville (1972) correction factor: CF = exp(sigma^2 / 2) to the log-linear model before computing RMSE.",
              "Compare naive total biomass (Mg) vs. bias-corrected total biomass across the Bagmati inventory.",
            ],
          },
          {
            title: "Cross-Validation Benchmarks",
            badge: "Spatial Generalization",
            type: "quotes",
            items: [
              "Compare Test RMSE between an 80:20 random tree split and a whole-plot holdout: why does the whole-plot holdout exhibit higher test error?",
            ],
          },
        ],
      },
      {
        id: "review",
        label: "Review Problems",
        description: "End-of-unit problems on non-linear estimation and ordination.",
        cards: [
          {
            title: "Allometry & Ecology Review Problems",
            badge: "Synthesis Review",
            type: "ordered",
            items: [
              "Chapman-Richards Parameters: Interpret the biological meaning of parameters A (asymptote), k (growth rate), and p (shape) in height-diameter allometry.",
              "Baskerville Correction: State the mathematical formula for the Baskerville correction factor and explain why it is always strictly greater than 1.",
              "Spatial Cross-Validation: Explain why holding out entire sample plots provides a more realistic estimate of model generalization than holding out individual trees.",
              "Diversity Indices: Compare species richness (S), Shannon index (H'), and Simpson index (1-D) in terms of their sensitivity to rare species.",
              "NMDS Stress: What does an ordination stress value of 0.11 indicate regarding the 2D preservation of multi-dimensional Bray-Curtis distances?",
            ],
          },
        ],
      },
    ],
  },
  "unit-6": {
    unitLabel: "Unit VI",
    unitTitle: "Python for Automation & Batch Data Pipelines",
    intro:
      "Core principles of building fault-tolerant, automated batch data pipelines in Python to ingest, validate, and summarize hundreds of raw field inventory spreadsheets with quality-control logging.",
    categories: [
      {
        id: "guiding",
        label: "Guiding Questions",
        description: "Automation architecture and data ingestion inquiries.",
        cards: [
          {
            title: "Batch Scalability in Forest Inventories",
            badge: "Data Engineering",
            type: "quotes",
            items: [
              "If a district forestry office delivers 100 separate plot spreadsheets instead of one combined master sheet, how can we process them without error-prone manual copying?",
              "How do we ensure that a single corrupt CSV file or missing column does not cause an entire regional batch pipeline to crash midway?",
            ],
          },
          {
            title: "Automated Quality Control Auditing",
            badge: "Audit Integrity",
            type: "quotes",
            items: [
              "Why must data-quality anomalies (missing DBH, non-positive diameters, extreme heights) be logged to a dedicated QC table rather than silently skipped?",
            ],
          },
        ],
      },
      {
        id: "practical",
        label: "Practical Checkpoints",
        description: "Python batch pipeline implementation deliverables.",
        cards: [
          {
            title: "Pipeline Architecture Checklist",
            badge: "Pipeline Checkpoints",
            type: "ordered",
            items: [
              "Pathlib Traversal: Use Path.glob('*.csv') to dynamically discover all raw plot files regardless of operating system.",
              "Exception Shielding: Wrap pd.read_csv in try/except blocks to log unreadable files and continue pipeline execution.",
              "Schema Verification: Compare set(data.columns) against mandatory columns to flag malformed files (e.g. plot_004.csv missing Species).",
              "Vectorized Tree Metrics: Calculate basal area in m2 using vectorized NumPy/Pandas operations on positive DBH stems.",
              "Dual Output Generation: Export both the aggregated plot summary table and the automated quality-control audit log.",
            ],
          },
        ],
      },
      {
        id: "review",
        label: "Review Problems",
        description: "End-of-unit problems on Python scripting and batch pipelines.",
        cards: [
          {
            title: "Automation & Batch Processing Review",
            badge: "Technical Review",
            type: "ordered",
            items: [
              "Pathlib vs OS String Paths: Give two reasons why pathlib.Path is preferred over raw string manipulation for file paths.",
              "Defensive Exception Handling: Why is catching Exception and returning a tuple (None, qc_issues) preferable to letting Python exit with a traceback?",
              "Automated QC Logging: How does generating bagmati_quality_control.csv protect research integrity when field data is collected by multiple teams?",
              "Vectorization vs Row Iteration: Explain why iterrows() in Pandas is computationally inefficient for large forest inventories compared to vectorized arithmetic.",
            ],
          },
        ],
      },
    ],
  },
  "unit-7": {
    unitLabel: "Unit VII",
    unitTitle: "Spatial Analysis, LiDAR, GEE & Machine Learning Classification",
    intro:
      "Inquiries on spatial coordinate systems, digital elevation models, 3D airborne LiDAR canopy metrics, Google Earth Engine cloud composites, and Random Forest land cover classification.",
    categories: [
      {
        id: "guiding",
        label: "Guiding Questions",
        description: "Spatial geometry and remote sensing integration inquiries.",
        cards: [
          {
            title: "Coordinate Reference Systems & Geometric Accuracy",
            badge: "Spatial Geometry",
            type: "quotes",
            items: [
              "Why does creating a 15-metre buffer around a point in geographic coordinates (EPSG:4326, degrees) produce an invalid, distorted area in mountain terrain?",
              "How does reprojecting to a metric projected coordinate system (UTM Zone 45N, EPSG:32645) ensure consistent physical ground areas?",
            ],
          },
          {
            title: "LiDAR Point Cloud Structural Metrics",
            badge: "3D Remote Sensing",
            type: "quotes",
            items: [
              "How is a continuous Canopy Height Model (CHM) derived by subtracting ground returns (Class 2) from upper canopy returns (Class 5)?",
              "Why does 3D airborne LiDAR provide direct measurements of forest vertical structure that optical satellite sensors cannot?",
            ],
          },
          {
            title: "Spatial Autocorrelation in Machine Learning",
            badge: "Spatial ML",
            type: "quotes",
            items: [
              "Why does naive random train/test splitting produce artificially inflated accuracy scores when classifying spatial remote sensing imagery?",
            ],
          },
        ],
      },
      {
        id: "practical",
        label: "Practical Checkpoints",
        description: "Spatial data processing and machine learning validation steps.",
        cards: [
          {
            title: "Spatial & Machine Learning Pipeline Steps",
            badge: "Spatial Checkpoints",
            type: "ordered",
            items: [
              "Reproject plot points to UTM Zone 45N and generate 15-metre circular sample buffers.",
              "Sample 30m DEM GeoTIFF elevation at plot coordinates using rasterio.",
              "Read LiDAR .las point cloud with laspy and compute mean plot CHM (95th percentile canopy minus mean ground).",
              "Train a 100-tree Random Forest classifier on Sentinel-2 spectral bands using a spatial block cross-validation split (South Train vs North Val).",
              "Generate the complete accuracy assessment table: Producer's Accuracy, User's Accuracy, Omission, and Commission errors.",
              "Export the integrated bagmati_landscape_master.csv merging field, LiDAR, and satellite metrics.",
            ],
          },
        ],
      },
      {
        id: "review",
        label: "Review Problems",
        description: "Conceptual and computational review problems from Unit VII.",
        cards: [
          {
            title: "Spatial Modeling & Machine Learning Review",
            badge: "Remote Sensing Review",
            type: "ordered",
            items: [
              "Metric Projections: Explain why geographic CRS (latitude/longitude in degrees) cannot be used directly for distance or area calculations.",
              "ASPRS LiDAR Classification: Which ASPRS standard classification codes represent bare earth and high vegetation in airborne LiDAR?",
              "Producer's vs User's Accuracy: Distinguish between Producer's Accuracy (omission error) and User's Accuracy (commission error) in forest cover mapping.",
              "Sensor Saturation: Why does optical NDVI saturate in dense subtropical forests, and how does 3D LiDAR canopy height overcome this limitation?",
              "Spatial Blocking: Explain why spatial block validation (North vs South) provides a more rigorous accuracy metric than random cross-validation.",
            ],
          },
        ],
      },
    ],
  },
  "unit-8": {
    unitLabel: "Unit VIII",
    unitTitle: "Decision Support Dashboards, Data Ethics & Capstone",
    intro:
      "Principles of building interactive biometric decision tools, safeguarding vulnerable biodiversity through spatial data minimization, and assembling a reproducible scientific capstone.",
    categories: [
      {
        id: "guiding",
        label: "Guiding Questions",
        description: "Decision tools, research ethics, and capstone synthesis inquiries.",
        cards: [
          {
            title: "The Model Extrapolation Hazard",
            badge: "Decision Support",
            type: "quotes",
            items: [
              "What happens when a community forest manager enters a 150 cm DBH tree into an allometric equation calibrated only up to 80 cm?",
              "Why must interactive decision tools feature active, visual domain boundary safeguards rather than silently calculating extrapolated predictions?",
            ],
          },
          {
            title: "Research Ethics & Biodiversity Poaching Risk",
            badge: "Data Ethics",
            type: "quotes",
            items: [
              "Why is publishing sub-metre GPS coordinates of threatened species like Himalayan Yew (Taxus wallichiana) ethically irresponsible in open science?",
              "How does spatial data minimization allow researchers to share FAIR data without providing illegal harvesters with a roadmap to wild populations?",
            ],
          },
        ],
      },
      {
        id: "practical",
        label: "Practical Checkpoints",
        description: "Interactive dashboard, spatial redaction, and capstone deliverable steps.",
        cards: [
          {
            title: "Interactive Dashboard & Ethics Deliverables",
            badge: "Capstone Deliverables",
            type: "ordered",
            items: [
              "Implement reactive input validation in R Shiny or Streamlit alerting users when DBH falls outside the 10-80 cm calibration domain.",
              "Filter clean inventory for plots containing Taxus wallichiana and identify stands requiring coordinate redaction.",
              "Apply spatial minimization: strip exact Lat/Lon coordinates and aggregate elevation into 200m elevation bands.",
              "Export bagmati_public_use_inventory.csv with explicit Location_Access_Status metadata tags.",
              "Complete one Capstone Research Brief (Allometry, Elevational Turnover, or Multi-Sensor Forest Structure) using documented reproducible code.",
            ],
          },
        ],
      },
      {
        id: "review",
        label: "Review Problems",
        description: "Comprehensive end-of-course review questions for Unit VIII and Capstone.",
        cards: [
          {
            title: "Ethics, Decision Support & Capstone Review",
            badge: "Final Synthesis",
            type: "ordered",
            items: [
              "Domain of Applicability: Define the domain of applicability of an empirical forestry model and explain why software should guard against extrapolation.",
              "Data Minimization: What is the principle of data minimization in scientific data publication, and how was it applied to the Bagmati inventory?",
              "FAIR Open Science: How can research datasets satisfy Findable, Accessible, Interoperable, and Reusable principles while protecting sensitive conservation taxa?",
              "AI Disclosure Integrity: Why is maintaining an AI-use disclosure log essential for scientific reproducibility and academic honesty in modern computational research?",
              "Capstone Integration: How do the eight units of this course connect field tally sheets to defensible, reproducible, and ethical forest science?",
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

const BINARY_FILE_PREVIEWS = {
  "plots_batch.zip": `# Unit VI: 100-Plot Batch Ingestion Archive
# Contains 100 individual forest inventory plot CSVs (plot_001.csv to plot_100.csv)

## Sample Plot Data (plot_001.csv):
Plot_ID,Tree_ID,Species,DBH_cm,Height_m
P01,T01,Shorea robusta,32.4,18.5
P01,T02,Shorea robusta,28.1,16.2
P01,T03,Schima wallichii,22.7,14.8
P01,T04,Castanopsis indica,19.3,13.1
P01,T05,Shorea robusta,45.2,22.4
P01,T06,Schima wallichii,15.8,11.2
P01,T07,Alnus nepalensis,38.6,20.1
P01,T08,Shorea robusta,26.4,15.9

## Python Batch Processing Script:
from pathlib import Path
import pandas as pd

plot_files = sorted(Path("plots_batch").glob("*.csv"))
all_plots = [pd.read_csv(f) for f in plot_files]
master_df = pd.concat(all_plots, ignore_index=True)
print(f"Loaded {len(plot_files)} plots with {len(master_df)} total trees.")`,

  "bagmati_dem.tif": `# Unit VII Spatial Asset: Bagmati Watershed Digital Elevation Model (DEM)

## Raster Layer Specifications:
- Source: SRTM 30m Digital Elevation Model
- Spatial Extent: Kathmandu Valley & Bagmati Rim (85.28°E to 85.45°E, 27.62°N to 27.78°N)
- Coordinate Reference System: Projected UTM Zone 45N (EPSG:32645)
- Spatial Resolution: 30.0 m x 30.0 m grid cells
- Elevation Range: 1,245.0 m to 2,732.0 m
- Data Format: Cloud-Optimized GeoTIFF (Float32)

## Python Extraction Code (rasterio):
import rasterio

with rasterio.open("bagmati_dem.tif") as dem:
    print(f"CRS: {dem.crs} | Resolution: {dem.res}")
    # Sample elevation at plot UTM coordinates:
    coords = [(330200.0, 3065400.0), (332150.0, 3068900.0)]
    elevations = [val[0] for val in dem.sample(coords)]
    print(f"Sampled plot elevations (m): {elevations}")`,

  "bagmati_sample.las": `# Unit VII Spatial Asset: Airborne LiDAR 3D Point Cloud Sample

## Point Cloud Layer Specifications:
- File Format: ASPRS LAS 1.4 Binary Point Cloud
- Projected CRS: UTM Zone 45N (EPSG:32645)
- Vertical Datum: Orthometric height (EGM96, metres)
- Total Point Count: 32,840 returns
- ASPRS Point Classifications:
    * Class 2: Ground Returns (Bare Earth DTM)
    * Class 5: High Vegetation Returns (Canopy Surface DSM)

## Python Point Cloud Extraction (laspy):
import laspy
import numpy as np

las = laspy.read("bagmati_sample.las")
ground_z = las.z[las.classification == 2]
canopy_z = las.z[las.classification == 5]

dtm = np.mean(ground_z)
dsm = np.percentile(canopy_z, 95)
chm = dsm - dtm
print(f"Derived Canopy Height Model (CHM): {chm:.2f} metres")`,
}

const parseCsvPreview = (text, maxRows = 250) => {
  if (!text) return { headers: [], rows: [], totalCount: 0 }
  const lines = text.trim().split("\n")
  if (lines.length === 0) return { headers: [], rows: [], totalCount: 0 }
  const totalCount = lines.length - 1
  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""))
  const rows = lines.slice(1, maxRows + 1).map(line =>
    line.split(",").map(p => p.trim().replace(/^"|"$/g, ""))
  )
  return { headers, rows, totalCount }
}

const escapeHtml = str => {
  if (!str) return ""
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/* ==========================================================================
   Course Access Protection Configuration (Way A: 7-Day Calendar Windows)
   ========================================================================== */

const COURSE_ACCESS_CONFIG = {
  enabled: true,
  storageKey: "tu_iof_forestry_course_auth_v1",
  salt: "tu-iof-bagmati-2026-phase-01",
  windows: [
    {
      id: "week-1",
      label: "Week 1: Computational Workflow & Reproducible Foundations",
      validFrom: "2026-11-09T00:00:00+05:45",
      validTo: "2026-11-16T23:59:59+05:45",
      // Phrase: "forestry-bagmati-2026"
      hash: "408b1f5ce942fcd601aa12a49ef5ef7affce5f0446d4254d288ab623c61171db",
    },
    {
      id: "week-2",
      label: "Week 2: Programming Fundamentals & Reusable Functions in R",
      validFrom: "2026-11-17T00:00:00+05:45",
      validTo: "2026-11-24T23:59:59+05:45",
      // Phrase: "sal-inventory-2026"
      hash: "7546d03cc2c1a092d679af634112d00f5897ef1d64645f76f2b1fff5e9566625",
    },
  ],
}

const computeSha256 = async message => {
  if (
    typeof window === "undefined" ||
    !window.crypto ||
    !window.crypto.subtle
  ) {
    return ""
  }
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}

const formatWindowDate = isoStr => {
  try {
    const d = new Date(isoStr)
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  } catch (e) {
    return isoStr
  }
}

const CourseAccessGate = ({
  activeWindow,
  allWindows,
  salt,
  onAuthorized,
}) => {
  const [passphrase, setPassphrase] = React.useState("")
  const [showPassphrase, setShowPassphrase] = React.useState(false)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [successMessage, setSuccessMessage] = React.useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    const trimmed = passphrase.trim().toLowerCase()
    if (!trimmed) {
      setErrorMessage("Please enter the course access phrase.")
      return
    }

    if (!activeWindow) {
      setErrorMessage(
        "No active access window is currently open. Please contact your instructor."
      )
      return
    }

    setIsVerifying(true)
    try {
      // 1. Check if it matches the active weekly window
      const computedHash = await computeSha256(
        `${trimmed}:${salt}:${activeWindow.validTo}`
      )

      if (computedHash === activeWindow.hash) {
        setSuccessMessage("✓ Access verified! Unlocking course materials...")
        setTimeout(() => {
          onAuthorized(activeWindow)
        }, 500)
        return
      }

      // 2. Check if student entered a past expired phrase or future phrase
      let foundPast = null
      let foundFuture = null

      for (const win of allWindows) {
        if (win.id === activeWindow.id) continue
        const checkHash = await computeSha256(
          `${trimmed}:${salt}:${win.validTo}`
        )
        if (checkHash === win.hash) {
          const winTo = new Date(win.validTo).getTime()
          const now = Date.now()
          if (now > winTo) {
            foundPast = win
          } else {
            foundFuture = win
          }
          break
        }
      }

      if (foundPast) {
        setErrorMessage(
          `⚠️ This phrase was for ${foundPast.label}, which expired on ${formatWindowDate(
            foundPast.validTo
          )}. Access phrases are discarded after 7 days and cannot be reused. Please enter the current week's phrase.`
        )
      } else if (foundFuture) {
        setErrorMessage(
          `ℹ️ This access phrase is for ${foundFuture.label}, which is not yet active (valid from ${formatWindowDate(
            foundFuture.validFrom
          )}).`
        )
      } else {
        setErrorMessage(
          "❌ Incorrect access phrase. Please verify the phrase provided by your course instructor."
        )
      }
    } catch (err) {
      setErrorMessage("Verification error. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="forestry-gate-container">
      <div className="forestry-gate-card">
        <span className="forestry-gate-badge">
          Tribhuvan University · Institute of Forestry
        </span>

        <div className="forestry-gate-icon-wrapper" aria-hidden="true">
          🔒
        </div>

        <h2 className="forestry-gate-title">Restricted Course Access</h2>
        <p className="forestry-gate-desc">
          Course syllabus, presentation slide decks, datasets, and computational
          code are restricted to enrolled students. Please enter the active
          weekly access phrase to continue.
        </p>

        {activeWindow && (
          <div className="forestry-gate-window-box">
            <div className="forestry-gate-window-label">
              <span>{activeWindow.label}</span>
              <span className="forestry-gate-window-status">
                Active 7-Day Window
              </span>
            </div>
            <div className="forestry-gate-window-dates">
              Valid until: {formatWindowDate(activeWindow.validTo)}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="forestry-gate-form">
          <div className="forestry-gate-input-wrapper">
            <input
              type={showPassphrase ? "text" : "password"}
              value={passphrase}
              onChange={e => setPassphrase(e.target.value)}
              placeholder="Enter weekly access phrase"
              className="forestry-gate-input"
              autoComplete="off"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassphrase(prev => !prev)}
              className="forestry-gate-toggle-btn"
              title={showPassphrase ? "Hide phrase" : "Show phrase"}
              aria-label={showPassphrase ? "Hide phrase" : "Show phrase"}
            >
              {showPassphrase ? "🙈" : "👁"}
            </button>
          </div>

          {errorMessage && (
            <div className="forestry-gate-alert error">{errorMessage}</div>
          )}

          {successMessage && (
            <div className="forestry-gate-alert success">{successMessage}</div>
          )}

          <button
            type="submit"
            className="forestry-gate-submit-btn"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Unlock Course →"}
          </button>
        </form>

        <p className="forestry-gate-help-note">
          <strong>Notice:</strong> Access phrases are time-sensitive and are
          discarded after 7 days. Once verified, your access persists on this
          browser for the remainder of the active window without re-entering.
        </p>
      </div>
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
    "unit-4": "guiding",
    "unit-5": "guiding",
    "unit-6": "guiding",
    "unit-7": "guiding",
    "unit-8": "guiding",
  })

  // Authentication & Access Window State
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  const [activeAccessWindow, setActiveAccessWindow] = React.useState(null)
  const [authChecked, setAuthChecked] = React.useState(false)

  // File Viewer Modal State
  const [modalFile, setModalFile] = React.useState(null)
  const [modalContent, setModalContent] = React.useState("")
  const [isModalLoading, setIsModalLoading] = React.useState(false)
  const [modalError, setModalError] = React.useState(null)
  const [isModalCopied, setIsModalCopied] = React.useState(false)
  const [csvViewMode, setCsvViewMode] = React.useState("table") // "table" or "raw"
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(1)

  const handleOpenFile = React.useCallback(file => {
    setModalFile(file)
    setIsModalCopied(false)
    setModalError(null)
    setCsvViewMode(file.type === "CSV" ? "table" : "raw")
    setCurrentSlideIndex(1)

    if (file.type === "PNG" || file.type === "PPTX") {
      setIsModalLoading(false)
      setModalContent("")
      return
    }

    if (BINARY_FILE_PREVIEWS[file.name]) {
      setIsModalLoading(false)
      setModalContent(BINARY_FILE_PREVIEWS[file.name])
      return
    }

    setIsModalLoading(true)
    fetch(file.url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load file (${res.status})`)
        }
        return res.text()
      })
      .then(text => {
        setModalContent(text)
        setIsModalLoading(false)
      })
      .catch(err => {
        setModalError(err.message || "Failed to load file contents.")
        setIsModalLoading(false)
      })
  }, [])

  const handleCloseModal = React.useCallback(() => {
    setModalFile(null)
    setModalContent("")
    setModalError(null)
    setIsModalCopied(false)
  }, [])

  const handleCopyModalContent = React.useCallback(() => {
    if (!modalContent) return
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(modalContent).then(() => {
        setIsModalCopied(true)
        setTimeout(() => setIsModalCopied(false), 2000)
      })
    }
  }, [modalContent])

  const handleOpenInNewTab = React.useCallback(() => {
    if (!modalFile) return

    let pageHtml = ""
    const fileName = escapeHtml(modalFile.name)
    const fileLabel = escapeHtml(modalFile.label || modalFile.name)
    const fileType = escapeHtml(modalFile.type || "FILE")

    if (modalFile.type === "PPTX" && modalFile.slideDeck) {
      const total = modalFile.slideDeck.totalSlides
      const base = modalFile.slideDeck.basePath
      let thumbHtml = ""
      for (let i = 1; i <= total; i++) {
        thumbHtml += `<button class="thumb-btn ${
          i === currentSlideIndex ? "active" : ""
        }" onclick="goToSlide(${i})" title="Slide ${i}"><img class="thumb-img" src="${base}/slide-${i}.png" alt="Slide ${i}" /><span class="thumb-num">${i}</span></button>`
      }

      pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${fileName} · Slide Presentation</title>
  <style>
    * { box-sizing: border-box; }
    body { background: #0b1120; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .header { height: 56px; padding: 0 20px; background: #0f172a; border-bottom: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
    .title-col { display: flex; align-items: center; gap: 10px; overflow: hidden; }
    .badge { background: #ea580c; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px; }
    .file-name { font-weight: 700; font-size: 14px; color: #f1f5f9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .file-sub { color: #64748b; font-size: 12px; font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .counter { font-family: "JetBrains Mono", Consolas, monospace; font-size: 13px; font-weight: 700; color: #94a3b8; }
    .btn { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px; }
    .btn:hover:not(:disabled) { background: #334155; color: #fff; }
    .btn:disabled { opacity: 0.35; cursor: not-allowed; }
    .stage { flex: 1; display: flex; align-items: center; justify-content: center; position: relative; padding: 16px 60px; overflow: hidden; background: #070d17; }
    .slide-frame { max-width: 100%; max-height: calc(100vh - 170px); border-radius: 8px; box-shadow: 0 24px 48px rgba(0,0,0,0.7); border: 1px solid #1e293b; overflow: hidden; background: #020617; display: flex; align-items: center; justify-content: center; }
    .slide-img { max-width: 100%; max-height: calc(100vh - 170px); width: auto; height: auto; object-fit: contain; display: block; }
    .nav-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; background: rgba(15,23,42,0.85); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 18px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; backdrop-filter: blur(6px); z-index: 10; }
    .nav-arrow:hover { background: rgba(30,41,59,0.95); transform: translateY(-50%) scale(1.08); border-color: #38bdf8; color: #38bdf8; }
    .nav-arrow.prev { left: 16px; }
    .nav-arrow.next { right: 16px; }
    .thumbnails { height: 72px; background: #0b1120; border-top: 1px solid #1e293b; display: flex; align-items: center; gap: 8px; padding: 0 16px; overflow-x: auto; flex-shrink: 0; }
    .thumb-btn { background: #020617; border: 2px solid #1e293b; border-radius: 5px; padding: 2px; cursor: pointer; height: 50px; position: relative; flex-shrink: 0; opacity: 0.55; transition: all 0.15s; }
    .thumb-btn:hover { opacity: 0.85; border-color: #475569; }
    .thumb-btn.active { opacity: 1; border-color: #38bdf8; box-shadow: 0 0 12px rgba(56,189,248,0.4); }
    .thumb-img { height: 100%; width: auto; border-radius: 3px; display: block; }
    .thumb-num { position: absolute; bottom: 2px; right: 3px; background: rgba(0,0,0,0.8); color: #fff; font-size: 8px; font-weight: 700; padding: 1px 3px; border-radius: 2px; font-family: monospace; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title-col">
      <span class="badge">PPTX</span>
      <span class="file-name">${fileName}</span>
      <span class="file-sub">· ${fileLabel}</span>
    </div>
    <div class="actions">
      <button class="btn" id="prevBtn" onclick="prevSlide()">◀ Previous</button>
      <span class="counter" id="slideCounter">Slide ${currentSlideIndex} of ${total}</span>
      <button class="btn" id="nextBtn" onclick="nextSlide()">Next ▶</button>
      <button class="btn" onclick="toggleFullScreen()">⛶ Fullscreen</button>
    </div>
  </div>
  <div class="stage">
    <button class="nav-arrow prev" onclick="prevSlide()" title="Previous slide (←)">◀</button>
    <div class="slide-frame">
      <img id="mainSlide" class="slide-img" src="${base}/slide-${currentSlideIndex}.png" alt="Slide" />
    </div>
    <button class="nav-arrow next" onclick="nextSlide()" title="Next slide (→)">▶</button>
  </div>
  <div class="thumbnails">${thumbHtml}</div>

  <script>
    let current = ${currentSlideIndex};
    const total = ${total};
    const base = "${base}";
    function update() {
      document.getElementById('mainSlide').src = base + '/slide-' + current + '.png';
      document.getElementById('slideCounter').textContent = 'Slide ' + current + ' of ' + total;
      document.getElementById('prevBtn').disabled = current <= 1;
      document.getElementById('nextBtn').disabled = current >= total;
      document.querySelectorAll('.thumb-btn').forEach((btn, idx) => {
        if (idx + 1 === current) {
          btn.classList.add('active');
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          btn.classList.remove('active');
        }
      });
    }
    function prevSlide() { if (current > 1) { current--; update(); } }
    function nextSlide() { if (current < total) { current++; update(); } }
    function goToSlide(n) { current = n; update(); }
    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') nextSlide();
    });
    update();
  </script>
</body>
</html>`
    } else if (modalFile.type === "CSV" && csvViewMode === "table" && modalContent) {
      const { headers, rows } = parseCsvPreview(modalContent, 1000)
      const ths = headers.map(h => `<th>${escapeHtml(h)}</th>`).join("")
      const trs = rows
        .map(
          (r, i) =>
            `<tr><td style="color:#64748b;text-align:center;">${i + 1}</td>${r
              .map(c => `<td>${escapeHtml(c)}</td>`)
              .join("")}</tr>`
        )
        .join("")

      pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${fileName} · Data Table</title>
  <style>
    * { box-sizing: border-box; }
    body { background: #0f172a; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .header { height: 52px; padding: 0 20px; background: #0b1120; border-bottom: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
    .title-col { display: flex; align-items: center; gap: 10px; }
    .badge { background: #059669; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; }
    .file-name { font-weight: 700; font-size: 14px; color: #f1f5f9; }
    .file-sub { color: #64748b; font-size: 12px; }
    .btn { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
    .btn:hover { background: #334155; color: #fff; }
    .table-wrapper { flex: 1; overflow: auto; }
    table { width: 100%; border-collapse: collapse; font-family: "JetBrains Mono", Consolas, monospace; font-size: 12px; text-align: left; }
    th { position: sticky; top: 0; background: #1e293b; color: #94a3b8; font-weight: 700; padding: 10px 14px; border-bottom: 2px solid #334155; white-space: nowrap; z-index: 2; }
    td { padding: 8px 14px; border-bottom: 1px solid #1e293b; white-space: nowrap; }
    tr:hover td { background: rgba(51,65,85,0.4); color: #fff; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title-col">
      <span class="badge">CSV</span>
      <span class="file-name">${fileName}</span>
      <span class="file-sub">· ${fileLabel} (${rows.length} rows preview)</span>
    </div>
    <button class="btn" id="copyBtn" onclick="copyCsv()">📋 Copy Raw CSV</button>
  </div>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr><th style="width:44px;text-align:center;">#</th>${ths}</tr>
      </thead>
      <tbody>${trs}</tbody>
    </table>
  </div>
  <script>
    const rawData = ${JSON.stringify(modalContent)};
    function copyCsv() {
      navigator.clipboard.writeText(rawData).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = '📋 Copy Raw CSV'; }, 2000);
      });
    }
  </script>
</body>
</html>`
    } else if (modalFile.type === "PNG") {
      pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${fileName} · Figure</title>
  <style>
    * { box-sizing: border-box; }
    body { background: #070d17; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .header { height: 52px; padding: 0 20px; background: #0b1120; border-bottom: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
    .title-col { display: flex; align-items: center; gap: 10px; }
    .badge { background: #dc2626; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; }
    .file-name { font-weight: 700; font-size: 14px; color: #f1f5f9; }
    .stage { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; overflow: auto; }
    img { max-width: 95%; max-height: calc(100vh - 120px); object-fit: contain; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.7); border: 1px solid #1e293b; }
    .caption { font-size: 13px; color: #94a3b8; margin-top: 14px; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title-col">
      <span class="badge">PNG</span>
      <span class="file-name">${fileName}</span>
      <span style="color:#64748b;font-size:12px;">· ${fileLabel}</span>
    </div>
  </div>
  <div class="stage">
    <img src="${modalFile.url}" alt="${fileName}" />
    <div class="caption">${fileLabel}</div>
  </div>
</body>
</html>`
    } else {
      // Code / Text / Script view with line numbers
      const lines = (modalContent || "").split("\n")
      const lineNums = lines
        .map((_, i) => `<span class="ln">${i + 1}</span>`)
        .join("\n")
      const escapedCode = escapeHtml(modalContent || "")

      pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${fileName} · Source Code</title>
  <style>
    * { box-sizing: border-box; }
    body { background: #0f172a; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .header { height: 52px; padding: 0 20px; background: #0b1120; border-bottom: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
    .title-col { display: flex; align-items: center; gap: 10px; }
    .badge { background: #2563eb; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; }
    .file-name { font-weight: 700; font-size: 14px; color: #f1f5f9; }
    .file-sub { color: #64748b; font-size: 12px; }
    .btn { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
    .btn:hover { background: #334155; color: #fff; }
    .code-container { flex: 1; display: flex; overflow: auto; background: #0f172a; }
    .gutter { padding: 16px 12px 16px 16px; background: #0b1120; border-right: 1px solid #1e293b; display: flex; flex-direction: column; user-select: none; text-align: right; flex-shrink: 0; font-family: "JetBrains Mono", Consolas, monospace; font-size: 13px; line-height: 1.6; color: #475569; }
    pre { flex: 1; margin: 0; padding: 16px 20px; font-family: "JetBrains Mono", Consolas, Menlo, Monaco, monospace; font-size: 13px; line-height: 1.6; color: #e2e8f0; white-space: pre; tab-size: 2; overflow-x: auto; background: transparent; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title-col">
      <span class="badge">${fileType}</span>
      <span class="file-name">${fileName}</span>
      <span class="file-sub">· ${fileLabel} (${lines.length} lines)</span>
    </div>
    <button class="btn" id="copyBtn" onclick="copyCode()">📋 Copy Code</button>
  </div>
  <div class="code-container">
    <div class="gutter">${lineNums}</div>
    <pre><code>${escapedCode}</code></pre>
  </div>
  <script>
    const codeText = ${JSON.stringify(modalContent || "")};
    function copyCode() {
      navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = '📋 Copy Code'; }, 2000);
      });
    }
  </script>
</body>
</html>`
    }

    const blob = new Blob([pageHtml], { type: "text/html;charset=utf-8" })
    const blobUrl = URL.createObjectURL(blob)
    window.open(blobUrl, "_blank")
  }, [modalFile, modalContent, csvViewMode, currentSlideIndex])

  React.useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "Escape" && modalFile) {
        handleCloseModal()
      } else if (modalFile && modalFile.type === "PPTX" && modalFile.slideDeck) {
        if (e.key === "ArrowLeft" || e.key === "PageUp") {
          setCurrentSlideIndex(prev => Math.max(1, prev - 1))
        } else if (
          e.key === "ArrowRight" ||
          e.key === "PageDown" ||
          e.key === " "
        ) {
          setCurrentSlideIndex(prev =>
            Math.min(modalFile.slideDeck.totalSlides, prev + 1)
          )
        }
      }
    }
    if (modalFile) {
      document.addEventListener("keydown", handleKeyDown)
      if (typeof document !== "undefined" && document.body) {
        document.body.style.overflow = "hidden"
      }
    } else {
      if (typeof document !== "undefined" && document.body) {
        document.body.style.overflow = ""
      }
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      if (typeof document !== "undefined" && document.body) {
        document.body.style.overflow = ""
      }
    }
  }, [modalFile, handleCloseModal])

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

  React.useEffect(() => {
    if (!COURSE_ACCESS_CONFIG.enabled) {
      setIsAuthorized(true)
      setAuthChecked(true)
      return
    }

    const checkAuthStatus = async () => {
      let now = Date.now()
      try {
        if (typeof window !== "undefined") {
          const resp = await fetch(window.location.href, {
            method: "HEAD",
            cache: "no-store",
          })
          const dateHeader = resp.headers.get("date")
          if (dateHeader) {
            now = new Date(dateHeader).getTime()
          }
        }
      } catch (e) {
        // Fallback to local clock
      }

      // Find current active window
      const active = COURSE_ACCESS_CONFIG.windows.find(w => {
        const from = new Date(w.validFrom).getTime()
        const to = new Date(w.validTo).getTime()
        return now >= from && now <= to
      })

      setActiveAccessWindow(active || null)

      if (typeof window !== "undefined" && window.localStorage) {
        try {
          const raw = window.localStorage.getItem(
            COURSE_ACCESS_CONFIG.storageKey
          )
          if (raw && active) {
            const data = JSON.parse(raw)
            if (
              data.windowId === active.id &&
              data.hash === active.hash &&
              now <= new Date(active.validTo).getTime()
            ) {
              setIsAuthorized(true)
            } else {
              window.localStorage.removeItem(COURSE_ACCESS_CONFIG.storageKey)
              setIsAuthorized(false)
            }
          }
        } catch (e) {
          setIsAuthorized(false)
        }
      }

      setAuthChecked(true)
    }

    checkAuthStatus()
  }, [])

  const handleAuthorize = React.useCallback(windowData => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(
          COURSE_ACCESS_CONFIG.storageKey,
          JSON.stringify({
            windowId: windowData.id,
            hash: windowData.hash,
            unlockedAt: Date.now(),
          })
        )
      } catch (e) {}
    }
    setIsAuthorized(true)
  }, [])

  const handleLockCourse = React.useCallback(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(COURSE_ACCESS_CONFIG.storageKey)
    }
    setIsAuthorized(false)
  }, [])

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

        {!authChecked ? (
          <div
            style={{
              textAlign: "center",
              padding: "70px 20px",
              color: "#64748b",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.9rem",
            }}
          >
            Verifying course access credentials...
          </div>
        ) : !isAuthorized ? (
          <CourseAccessGate
            activeWindow={activeAccessWindow}
            allWindows={COURSE_ACCESS_CONFIG.windows}
            salt={COURSE_ACCESS_CONFIG.salt}
            onAuthorized={handleAuthorize}
          />
        ) : (
          <>
            {activeAccessWindow && (
              <div className="forestry-auth-status-bar">
                <div className="forestry-auth-status-info">
                  <span>🔒 Access Active:</span>
                  <span>{activeAccessWindow.label}</span>
                  <span style={{ color: "#15803d", fontWeight: 400 }}>
                    (Valid until {formatWindowDate(activeAccessWindow.validTo)})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLockCourse}
                  className="forestry-auth-lock-btn"
                  title="Lock course on this device"
                >
                  Lock Course
                </button>
              </div>
            )}

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
                                <button
                                  type="button"
                                  onClick={() => handleOpenFile(file)}
                                  className="forestry-resource-view-btn"
                                >
                                  View
                                </button>
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
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleOpenFile({
                                          name: "assignment_unit2_base_r.md",
                                          label: "Homework Assignment: Forensic Data Screening & Base R",
                                          type: "MD",
                                          size: "8.5 KB",
                                          url: "/course/Computational_Methods_for_Forestry_Research/Unit-II/assignment_unit2_base_r.md",
                                        })
                                      }
                                      className="forestry-assignment-action-btn secondary"
                                    >
                                      View Assignment (.md)
                                    </button>
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

                          {unit.id !== "unit-1" && unit.id !== "unit-2" && unitQuestions[unit.id] && (
                            <UnitQuestionsSection
                              unitId={unit.id}
                              isOpen={!!openQuestions[unit.id]}
                              onToggle={() => toggleQuestions(unit.id)}
                              activeTab={activeTabByUnit[unit.id] || "guiding"}
                              onSelectTab={tabId => selectTab(unit.id, tabId)}
                            />
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
      </>
    )}
  </div>

      {/* File Content Viewer Modal */}
      {modalFile && (
        <div
          className="forestry-modal-overlay"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="forestry-modal-title"
        >
          <div
            className="forestry-modal-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="forestry-modal-header">
              <div className="forestry-modal-header-info">
                <span
                  className={`forestry-resource-type ${
                    modalFile.type ? modalFile.type.toLowerCase() : ""
                  }`}
                >
                  {modalFile.type}
                </span>
                <div className="forestry-modal-title-col">
                  <span
                    id="forestry-modal-title"
                    className="forestry-modal-filename"
                  >
                    {modalFile.name}
                  </span>
                  <span className="forestry-modal-meta">
                    {modalFile.label} · {modalFile.size}
                  </span>
                </div>
              </div>

              <div className="forestry-modal-header-actions">
                {modalFile.type === "PPTX" && modalFile.slideDeck && (
                  <span
                    className="forestry-slide-counter"
                    style={{
                      padding: "4px 10px",
                      background: "#1e293b",
                      borderRadius: 6,
                    }}
                  >
                    Slide {currentSlideIndex} of {modalFile.slideDeck.totalSlides}
                  </span>
                )}

                {modalFile.type === "CSV" && !isModalLoading && !modalError && (
                  <div className="forestry-modal-toggle-group">
                    <button
                      type="button"
                      className={`forestry-modal-toggle-btn ${
                        csvViewMode === "table" ? "is-active" : ""
                      }`}
                      onClick={() => setCsvViewMode("table")}
                    >
                      Table
                    </button>
                    <button
                      type="button"
                      className={`forestry-modal-toggle-btn ${
                        csvViewMode === "raw" ? "is-active" : ""
                      }`}
                      onClick={() => setCsvViewMode("raw")}
                    >
                      Raw
                    </button>
                  </div>
                )}

                {modalContent && (
                  <button
                    type="button"
                    className={`forestry-modal-copy-btn ${
                      isModalCopied ? "is-copied" : ""
                    }`}
                    onClick={handleCopyModalContent}
                    title="Copy contents to clipboard"
                  >
                    {isModalCopied ? "✓ Copied" : "📋 Copy"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleOpenInNewTab}
                  className="forestry-modal-newtab-btn"
                  title="Open readable viewer in new window / tab"
                >
                  New Tab ↗
                </button>

                <button
                  type="button"
                  className="forestry-modal-close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close viewer"
                  title="Close (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="forestry-modal-body">
              {isModalLoading ? (
                <div className="forestry-modal-loading">
                  <span className="forestry-modal-spinner" />
                  Loading file contents...
                </div>
              ) : modalError ? (
                <div className="forestry-modal-error">{modalError}</div>
              ) : modalFile.type === "PPTX" && modalFile.slideDeck ? (
                <div className="forestry-slide-deck-container">
                  <div className="forestry-slide-stage">
                    <button
                      type="button"
                      className="forestry-slide-arrow prev"
                      onClick={() =>
                        setCurrentSlideIndex(prev => Math.max(1, prev - 1))
                      }
                      disabled={currentSlideIndex <= 1}
                      aria-label="Previous slide"
                      title="Previous slide (←)"
                    >
                      ◀
                    </button>

                    <div className="forestry-slide-frame">
                      <img
                        src={`${modalFile.slideDeck.basePath}/slide-${currentSlideIndex}.png`}
                        alt={`Slide ${currentSlideIndex} of ${modalFile.slideDeck.totalSlides}`}
                        className="forestry-slide-image"
                      />
                    </div>

                    <button
                      type="button"
                      className="forestry-slide-arrow next"
                      onClick={() =>
                        setCurrentSlideIndex(prev =>
                          Math.min(modalFile.slideDeck.totalSlides, prev + 1)
                        )
                      }
                      disabled={
                        currentSlideIndex >= modalFile.slideDeck.totalSlides
                      }
                      aria-label="Next slide"
                      title="Next slide (→)"
                    >
                      ▶
                    </button>
                  </div>

                  <div className="forestry-slide-controls-bar">
                    <button
                      type="button"
                      className="forestry-slide-nav-btn"
                      onClick={() =>
                        setCurrentSlideIndex(prev => Math.max(1, prev - 1))
                      }
                      disabled={currentSlideIndex <= 1}
                    >
                      ◀ Previous
                    </button>

                    <span className="forestry-slide-counter">
                      Slide {currentSlideIndex} of{" "}
                      {modalFile.slideDeck.totalSlides}
                    </span>

                    <button
                      type="button"
                      className="forestry-slide-nav-btn"
                      onClick={() =>
                        setCurrentSlideIndex(prev =>
                          Math.min(modalFile.slideDeck.totalSlides, prev + 1)
                        )
                      }
                      disabled={
                        currentSlideIndex >= modalFile.slideDeck.totalSlides
                      }
                    >
                      Next ▶
                    </button>
                  </div>

                  <div className="forestry-slide-thumbnails">
                    {Array.from(
                      { length: modalFile.slideDeck.totalSlides },
                      (_, i) => i + 1
                    ).map(slideNum => (
                      <button
                        key={slideNum}
                        type="button"
                        className={`forestry-slide-thumb-btn ${
                          slideNum === currentSlideIndex ? "is-active" : ""
                        }`}
                        onClick={() => setCurrentSlideIndex(slideNum)}
                        title={`Slide ${slideNum}`}
                      >
                        <img
                          src={`${modalFile.slideDeck.basePath}/slide-${slideNum}.png`}
                          alt={`Slide ${slideNum}`}
                          className="forestry-slide-thumb-img"
                        />
                        <span className="forestry-slide-thumb-num">
                          {slideNum}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : modalFile.type === "PNG" ? (
                <div className="forestry-modal-image-container">
                  <img
                    src={modalFile.url}
                    alt={modalFile.name}
                    className="forestry-modal-image"
                  />
                  <p className="forestry-modal-image-caption">
                    {modalFile.label}
                  </p>
                </div>
              ) : modalFile.type === "CSV" && csvViewMode === "table" ? (
                (() => {
                  const { headers, rows } = parseCsvPreview(modalContent, 250)
                  return (
                    <div className="forestry-table-wrapper">
                      <table className="forestry-data-table">
                        <thead>
                          <tr>
                            <th style={{ width: 44, textAlign: "center" }}>#</th>
                            {headers.map((h, i) => (
                              <th key={i}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td
                                style={{
                                  color: "#64748b",
                                  textAlign: "center",
                                }}
                              >
                                {rIdx + 1}
                              </td>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                })()
              ) : (
                <div className="forestry-code-viewer">
                  <div className="forestry-line-numbers" aria-hidden="true">
                    {(modalContent || "").split("\n").map((_, i) => (
                      <span key={i} className="forestry-line-num">
                        {i + 1}
                      </span>
                    ))}
                  </div>
                  <pre className="forestry-code-pre">
                    <code>{modalContent}</code>
                  </pre>
                </div>
              )}
            </div>

            <div className="forestry-modal-footer">
              <span>
                {modalFile.type === "PPTX" && modalFile.slideDeck
                  ? `Showing slide ${currentSlideIndex} of ${modalFile.slideDeck.totalSlides} · Use ← / → arrow keys to flip slides`
                  : modalFile.type === "CSV" && csvViewMode === "table" && modalContent
                  ? (() => {
                      const count = modalContent.trim().split("\n").length - 1
                      return `Showing ${Math.min(count, 250)} of ${count} rows · ${modalFile.name}`
                    })()
                  : modalContent
                  ? `${modalContent.split("\n").length} lines · ${modalFile.name}`
                  : modalFile.name}
              </span>
              <span>Press Esc to close · Click "New Tab ↗" to view full screen</span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ComputationalForestryPage
