
# OBJECTIVE:
# Write an automated R script that audits your project directory structure.
# A reproducible research workflow requires a standardized, predictable folder
# hierarchy. This script verifies that all required subdirectories exist.

# ------------------------------------------------------------------------------
# TASK 1: Define Required Observatory Subdirectories
# ------------------------------------------------------------------------------
# Create a character vector named `required_folders` containing the relative paths
# of all standard project directories for the Bagmati Forest Observatory:
#   - "data/raw"
#   - "data/processed"
#   - "data/external"
#   - "scripts"
#   - "figures"
#   - "outputs"
#   - "reports"
#   - "notebooks"
#
# TODO 1: Fill in the vector below
required_folders <- c(
  # Add the required directory path strings here:
  
)

# ------------------------------------------------------------------------------
# TASK 2: Automated Verification Loop
# ------------------------------------------------------------------------------
# Write a for-loop that iterates over each folder in `required_folders`.
# For each folder:
#   1. Test if the directory exists using file.exists() or dir.exists().
#   2. Print a formatted status message to the console using cat() and sprintf().
#      Example output:
#      Directory data/raw           : OK (TRUE)
#      Directory outputs            : MISSING (FALSE)
#   3. (Bonus): If a folder is missing, automatically create it using
#      dir.create(folder, recursive = TRUE, showWarnings = FALSE)
#
# TODO 2: Complete the loop below

cat("======================================================================\n")
cat("=== Checking Bagmati Observatory Project Structure ===\n")
cat("======================================================================\n")

for (folder in required_folders) {
  # Step 1: Check existence
  # exists_flag <- ...
  
  # Step 2: Print formatted status line
  # cat(sprintf("Directory %-20s : %s\n", folder, ifelse(exists_flag, "OK (TRUE)", "MISSING (FALSE)")))
  
  # Step 3 (Optional auto-healing):
  # if (!exists_flag) {
  #   dir.create(folder, recursive = TRUE, showWarnings = FALSE)
  #   cat(sprintf("  --> Auto-created missing directory: %s\n", folder))
  # }
}

cat("======================================================================\n")
cat("Verification complete! Ensure all directories report OK (TRUE).\n")
cat("======================================================================\n")
