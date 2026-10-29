# Git & GitHub Cheatsheet for Forestry Computational Research
**Course**: Computational Methods for Forestry Research (M.Sc. Forestry, Tribhuvan University)  
**Instructor**: Prabesh Gouli  
**Unit II**: Programming Fundamentals & Version Controlled Workflows  

---

## 1. Initial Setup & Global Identity (One-Time Setup)

Configure your name and email once on your computer. This identity will be permanently attached to all your research commits and GitHub contributions.

```bash
# Set your full display name
git config --global user.name "Your Name"

# Set your institutional / GitHub account email address
git config --global user.email "student@iof.edu.np"

# Set the standard default branch name to 'main'
git config --global init.defaultBranch main

# Verify your configuration settings
git config --list
```

---

## 2. SSH Authentication & GitHub Login Verification

SSH keys allow you to push and pull securely without typing passwords on every transaction.

```bash
# 1. Generate an Ed25519 SSH key pair (Press Enter to accept default path and optional passphrase)
ssh-keygen -t ed25519 -C "student@iof.edu.np"

# 2. Display and copy your public key
cat ~/.ssh/id_ed25519.pub

# 3. Add to GitHub:
# Go to github.com -> Settings -> SSH and GPG keys -> New SSH key -> Paste the key

# 4. Test and verify your connection to GitHub
ssh -T git@github.com
# Expected response: "Hi username! You've successfully authenticated, but GitHub does not provide shell access."
```

---

## 3. Connecting Remotes (`git remote add`)

Connect your local working repository to GitHub or link the upstream class repository.

```bash
# 1. Initialize Git in an existing project folder
git init

# 2. Connect local repository to your remote GitHub repository (SSH URL recommended)
git remote add origin git@github.com:YOUR_USERNAME/forestry-research.git

# If using HTTPS instead:
git remote add origin https://github.com/YOUR_USERNAME/forestry-research.git

# 3. Verify configured remote URLs
git remote -v

# 4. Connect original course repository as upstream (for forked projects)
git remote add upstream git@github.com:ORIGINAL_OWNER/forestry-research.git

# 5. Push initial commit and set upstream tracking branch
git push -u origin main
```

---

## 4. Daily Local Working Cycle (Status, Diff, Add, Commit)

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

## 5. Syncing with GitHub (Pull & Push)

```bash
# Always fetch and merge the latest remote updates BEFORE starting work
git pull origin main

# Upload your committed local snapshots to GitHub
git push origin main
```

---

## 6. Branching & Checkout (Safe Experimentation)

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

## 7. Merging Branches Locally

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

## 8. Collaboration: Fork & Pull Request (PR) Workflow

When contributing to a shared research repository, open source package, or class project:

1. **Fork on GitHub**: Click the **Fork** button on the top-right of the class repository on github.com to create your personal copy.
2. **Clone your fork**:
   ```bash
   git clone git@github.com:YOUR_USERNAME/shared-forestry-repo.git
   cd shared-forestry-repo
   ```
3. **Connect the original upstream repository**:
   ```bash
   git remote add upstream git@github.com:ORIGINAL_OWNER/shared-forestry-repo.git
   git remote -v
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
8. **Keep your fork up-to-date with upstream changes**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   git push origin main
   ```

---

## 9. Undo & Safe Recovery (Fixing Mistakes)

```bash
# Discard uncommitted changes in a specific file (restore to last commit)
git restore scripts/02_tree_functions.R

# Unstage a file added by mistake (keeps file modifications in your workspace)
git restore --staged scripts/02_tree_functions.R

# Amend the last commit message (before pushing)
git commit --amend -m "fix: corrected parameter name in basal area function"
```

---

## 10. Golden Rules for Forestry Computational Science
1. **Rule of Immutable Raw Data**: Never manually edit files in `data/raw/`. Always write clean, reproducible R/Python transformation scripts.
2. **Use `.gitignore`**: Never commit credentials, API keys, large binary raster tiles (>100MB), or OS junk files (`.DS_Store`, `Thumbs.db`).
3. **Commit Atomic Units**: Commit one logical step at a time (e.g. "feat: add height-DBH curve fit") rather than waiting until the end of the semester to commit everything at once.
