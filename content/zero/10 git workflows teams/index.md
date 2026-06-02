---
title: "Git Workflows for Teams: Collaboration Patterns"
date: "2026-05-23"
description: "Git workflows that actually work in teams - from branching strategies to effective commit messages"
tags: ["git", "workflow", "collaboration", "version-control"]
---

## The Git Collaboration Challenge

Working solo, Git was simple. Working in a team, I learned that a good Git workflow is essential. Here's what I learned about effective Git collaboration patterns.

## Branching Strategies

### Git Flow (Traditional)

```bash
# Main branches
main        # Production-ready code
develop     # Integration branch

# Supporting branches
feature/*   # New features
release/*   # Preparing releases
hotfix/*    # Urgent production fixes

# Workflow
git checkout develop
git checkout -b feature/user-authentication
# ... work on feature ...
git checkout develop
git merge feature/user-authentication
git checkout main
git merge develop
```

### GitHub Flow (Simpler)

```bash
# Single main branch + feature branches
main        # Always deployable

# Workflow
git checkout main
git pull
git checkout -b feature/new-feature
# ... work ...
git push origin feature/new-feature
# Create PR on GitHub
# Review, merge to main
```

### Trunk-Based Development (Modern)

```bash
# Small, frequent commits directly to main
# Use feature flags for incomplete features
git checkout main
git pull
# ... small changes ...
git commit -m "Add login button"
git push
# Deploy continuously
```

## Effective Branch Naming

```bash
# Good naming conventions
feature/user-authentication
feature/add-search-functionality
bugfix/fix-login-error
hotfix/critical-security-patch
refactor/improve-api-structure
docs/update-readme
chore/update-dependencies

# Unclear naming (avoid)
fix
new-stuff
test
update
```

## Commit Messages That Matter

### Conventional Commits Format

```bash
# Format: <type>(<scope>): <subject>

# Types
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Formatting, missing semicolons, etc.
refactor: # Code restructuring
test:     # Adding tests
chore:    # Build process, dependencies

# Examples
git commit -m "feat(auth): add JWT token refresh"
git commit -m "fix(api): handle null user gracefully"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(components): extract reusable button component"
```

### Writing Good Commit Messages

```bash
# Good commit message
git commit -m "fix(api): prevent null pointer in user lookup

- Added null check before accessing user properties
- Return 404 instead of 500 for non-existent users
- Added test case for missing user scenario

Fixes #123"

# Bad commit message (avoid)
git commit -m "fix"
git commit -m "updated code"
git commit -m "asdf"
```

## Working with Remotes

### Fetch vs Pull

```bash
# Fetch - download changes without merging
git fetch origin
git fetch origin main

# Pull - fetch + merge
git pull origin main
# Equivalent to:
git fetch origin main
git merge origin/main

# Safer workflow - review changes before merging
git fetch origin
git log origin/main --oneline  # See what's new
git merge origin/main           # Merge when ready
```

### Handling Merge Conflicts

```bash
# When conflict occurs
git merge feature/new-feature
# Auto-merging conflicted files

# Open conflicted file
# Look for conflict markers:
<<<<<<< HEAD
// Current branch code
=======
// Incoming branch code
>>>>>>> feature/new-feature

# Resolve manually
# Remove conflict markers
# Keep the correct code

# Mark as resolved
git add conflicted-file.js
git commit
```

### Rebase vs Merge

```bash
# Merge - preserves history
git checkout main
git merge feature/new-feature
# Creates merge commit

# Rebase - linear history
git checkout feature/new-feature
git rebase main
# Replays commits on top of main

# Use merge for public branches
# Use rebase for personal branches (before PR)
```

## Pull Request Best Practices

### Creating Good PRs

```markdown
## Description

Brief description of what this PR does

## Changes

- Added user authentication
- Updated API endpoints
- Fixed login bug

## Testing

- [x] Tested locally
- [x] Unit tests pass
- [x] Manual testing completed

## Screenshots (if applicable)

![Screenshot](url)

## Related Issues

Closes #123
Fixes #456
```

### Code Review Guidelines

```markdown
# For Reviewers

1. Review within 24 hours
2. Be constructive, not critical
3. Suggest improvements, don't just point out problems
4. Approve when ready, or request changes with clear feedback

# For Authors

1. Keep PRs small (< 400 lines if possible)
2. Respond to feedback promptly
3. Update PR based on feedback
4. Don't take feedback personally
```

## Git Aliases for Efficiency

```bash
# Add to ~/.gitconfig
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = !gitk
  lg = log --oneline --decorate --all --graph
  amend = commit --amend --no-edit
  wip = commit -am "WIP"
  unwip = reset HEAD~1

# Usage
git st          # Instead of git status
git co main     # Instead of git checkout main
git lg          # Nice graph view
```

## Common Workflows

### Feature Development

```bash
# 1. Start feature
git checkout main
git pull origin main
git checkout -b feature/new-feature

# 2. Make changes
git add .
git commit -m "feat: implement new feature"

# 3. Push and create PR
git push origin feature/new-feature
# Create PR on GitHub/GitLab

# 4. After PR approved, merge and cleanup
git checkout main
git pull origin main
git branch -d feature/new-feature
```

### Hotfix Workflow

```bash
# 1. Create hotfix from main
git checkout main
git checkout -b hotfix/critical-bug

# 2. Fix bug
git commit -m "fix: resolve critical security issue"

# 3. Merge to main and develop
git checkout main
git merge hotfix/critical-bug
git tag -a v1.0.1 -m "Hotfix release"

git checkout develop
git merge hotfix/critical-bug

# 4. Delete hotfix branch
git branch -d hotfix/critical-bug
```

## Undoing Changes

### Undo Local Changes

```bash
# Discard changes in working directory
git checkout -- filename
git restore filename  # Newer Git syntax

# Discard all changes
git checkout -- .

# Unstage changes
git reset HEAD filename
git restore --staged filename
```

### Amend Last Commit

```bash
# Add changes to last commit
git add forgotten-file.js
git commit --amend --no-edit

# Change commit message
git commit --amend -m "New message"

# ⚠️ Don't amend commits that are already pushed!
```

### Revert Commits

```bash
# Revert a commit (creates new commit)
git revert <commit-hash>

# Revert last commit
git revert HEAD

# Revert multiple commits
git revert HEAD~3..HEAD
```

### Reset (Use with Caution)

```bash
# Soft reset - keep changes staged
git reset --soft HEAD~1

# Mixed reset - keep changes unstaged (default)
git reset HEAD~1
git reset --mixed HEAD~1

# Hard reset - discard all changes ⚠️
git reset --hard HEAD~1
```

## Working with Tags

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin v1.0.0
git push origin --tags  # Push all tags

# List tags
git tag
git tag -l "v1.*"

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

## Stashing

```bash
# Save current changes
git stash
git stash save "WIP: working on feature"

# List stashes
git stash list

# Apply stash
git stash apply
git stash apply stash@{0}

# Pop stash (apply and remove)
git stash pop

# Drop stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

## .gitignore Best Practices

```gitignore
# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
*.min.js

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Coverage
coverage/
.nyc_output/

# Temporary files
*.tmp
*.temp
```

## What I Learned

1. **Choose the right workflow**: Simple is often better
2. **Write good commit messages**: Future you will thank present you
3. **Review PRs promptly**: Don't be a bottleneck
4. **Keep branches focused**: One feature per branch
5. **Use tags for releases**: Makes deployment easier
6. **Learn to undo safely**: Mistakes happen, Git can fix them

The key insight: **A good Git workflow isn't about complex rules—it's about clear communication and consistent practices that help the team work together smoothly.**
