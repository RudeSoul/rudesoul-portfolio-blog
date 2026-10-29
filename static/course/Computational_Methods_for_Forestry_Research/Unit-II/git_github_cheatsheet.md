# Git & GitHub Cheatsheet for Forestry Computational Research
**Course**: Computational Methods for Forestry Research (M.Sc. Forestry, Tribhuvan University)  
**Instructor**: Prabesh Gouli  
**Unit II**: Programming Fundamentals & Version Controlled Workflows  

---

## 1. Initial Setup & Identity Configuration (One-Time Setup)

Configure your name and email once on your computer. This identity will be permanently attached to all your research commits and GitHub contributions.

```bash
# Set your display name (e.g., your full name)
git config --global user.name "Your Name"

# Set your GitHub account email address
git config --global user.email "student@iof.edu.np"

# Set the standard default branch name to 'main'
git config --global init.defaultBranch main

# Verify your configuration settings
git config --list
```

---

## 2. Starting or Cloning a Repository

### A. Initialize Git in an existing RStudio project folder
```bash
# Navigate to your project folder
cd /path/to/X_observatory

# Initialize a new local Git repository (.git hidden folder)
git init
```

### B. Clone an existing repository from GitHub to your laptop
```bash
git clone https://github.com/username/repository-name.git
```

---

## 3. Daily Local Lifecycle (Status, Add, Commit)

Execute these commands frequently throughout your coding and data cleaning sessions:

```bash
# 1. Check which files were modified, created, or staged
git status

# 2. View exact line-by-line differences before staging
git diff scripts/02_tree_functions.R

# 3. Stage a specific script or dataset for the next commit
git add scripts/02_tree_functions.R

# Or stage multiple related files:
git add data/raw/bagmati_raw_inventory.csv scripts/02_tree_functions.R

# 4. Commit staged changes with an informative, descriptive message
git commit -m "feat: implement vectorised basal area formula with numeric guards"

# 5. Inspect the commit history log
git log --oneline -n 10
```

---

## 4. Syncing with GitHub (Pull & Push)

```bash
# Always fetch and merge the latest remote updates BEFORE starting work
git pull origin main

# Upload your committed local snapshots to GitHub
git push origin main
```

---

## 5. Branching & Checkout (Safe Experimentation)

Use branches when developing new allometric models, statistical tests, or assignments without breaking your working `main` branch.

```bash
# List all local branches (* indicates the current branch)
git branch

# Create a new branch and switch to it immediately
git checkout -b feature-biomass-allometry
# (Alternative modern command: git switch -c feature-biomass-allometry)

# Switch back to the main branch
git checkout main
# (Alternative modern command: git switch main)

# Delete a feature branch once it has been merged
git branch -d feature-biomass-allometry
```

---

## 6. Merging Branches Locally

Once your model functions or script improvements are tested and verified on your feature branch:

```bash
# 1. Switch to the destination branch (usually main)
git checkout main

# 2. Pull the latest main updates
git pull origin main

# 3. Merge your feature branch into main
git merge feature-biomass-allometry

# 4. Push the merged main branch up to GitHub
git push origin main
```

---

## 7. Collaboration: Fork & Pull Request (PR) Workflow

When contributing to a shared research repository, open source package, or class project:

1. **Fork on GitHub**: Click the **Fork** button on the top-right of the class repository on github.com to create your personal copy.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/shared-forestry-repo.git
   cd shared-forestry-repo
   ```
3. **Connect the original upstream repository**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/shared-forestry-repo.git
   ```
4. **Create a topic branch for your assignment/feature**:
   ```bash
   git checkout -b hw2-tree-functions
   ```
5. **Write your R functions, stage, and commit**:
   ```bash
   git add scripts/02_tree_functions.R
   git commit -m "feat: add tree volume validation function"
   ```
6. **Push your branch to your GitHub fork**:
   ```bash
   git push -u origin hw2-tree-functions
   ```
7. **Open the Pull Request (PR)**:
   - Go to your fork on GitHub in your browser.
   - You will see a banner: **"Compare & pull request"**.
   - Click it, explain your changes, and submit the PR for instructor review!

---

## 8. Golden Rules for Forestry Computational Science
1. **Rule of Immutable Raw Data**: Never manually edit files in `data/raw/`. Always write clean, reproducible R/Python transformation scripts.
2. **Use `.gitignore`**: Never commit credentials, API keys, large binary raster tiles (>100MB), or OS junk files (`.DS_Store`, `Thumbs.db`).
3. **Commit Atomic Units**: Commit one logical step at a time (e.g. "feat: add height-DBH curve fit") rather than waiting until the end of the semester to commit everything at once.
