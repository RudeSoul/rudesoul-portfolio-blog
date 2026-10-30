
# MATHEMATICAL DERIVATION OF TREE BASAL AREA (m2):
#   Stem radius r = DBH / 2
#   Basal Area (cm2) = pi * r^2 = pi * (DBH / 2)^2 = (pi * DBH^2) / 4
#   Convert cm2 to m2: Divide by 10,000 (since 1 m = 100 cm, 1 m2 = 10,000 cm2)
#   BA (m2) = (pi * DBH^2) / (4 * 10,000) = (pi * DBH^2) / 40,000
#           ≈ 0.00007854 * DBH^2

# ------------------------------------------------------------------------------
# TASK 1: Implement Defensive Basal Area Function
# ------------------------------------------------------------------------------
# Requirements:
#   1. Input validation: verify that dbh_cm is numeric. If not, stop() with an error.
#   2. Biological boundary: verify that all values are > 0. If any <= 0, stop().
#   3. Missing data: if any values are NA, issue a warning() but allow calculation.
#   4. Domain check: if any DBH > 150 cm, issue a warning() about possible mm entry.
#   5. Vectorized calculation: calculate and return BA (m2) = pi * dbh_cm^2 / 40000.

calculate_basal_area <- function(dbh_cm) {
  # TODO 1A: Check if dbh_cm is numeric. If not: stop("DBH must be numeric.")
  
  # TODO 1B: Check if any dbh_cm <= 0 (ignoring NAs). If so: stop("DBH must be > 0.")
  
  # TODO 1C: Check if any is.na(dbh_cm). If so: warning("Missing values detected.")
  
  # TODO 1D: Domain check: check if any dbh_cm > 150. If so: warning("DBH > 150 cm detected.")
  
  # TODO 1E: Return vectorised calculation:
  # ba_m2 <- pi * dbh_cm^2 / 40000
  # return(ba_m2)
}

# ------------------------------------------------------------------------------
# TASK 2: Implement Cylinder Volume Function with Domain Guard
# ------------------------------------------------------------------------------
# Formula: Volume (m3) = pi * (DBH_cm / 200)^2 * Height_m
# Calibrated domain: DBH in [10, 80] cm, Height in [5, 40] m
# Requirements:
#   1. Validate that dbh_cm and height_m are numeric and strictly positive (> 0).
#   2. If any tree falls outside the calibrated domain (DBH < 10 or > 80, or
#      Height < 5 or > 40), trigger a warning() alerting the user to extrapolation.
#   3. Return calculated volume in m3.

calculate_volume_example <- function(dbh_cm, height_m) {
  # TODO 2A: Defensive type and positivity checks
  
  # TODO 2B: Check domain bounds (10-80 cm, 5-40 m) and warn if violated
  
  # TODO 2C: Compute and return volume:
  # volume_m3 <- pi * (dbh_cm / 200)^2 * height_m
  # return(volume_m3)
}

# ------------------------------------------------------------------------------
# TASK 3: Verification & The 4-Case Defensive Test Suite
# ------------------------------------------------------------------------------
# Test Case 1: Single tree (Schima wallichii: DBH = 28.4 cm, Height = 19.2 m)
# Expected BA: ~0.063347 m2
cat("--- Test 1: Single Tree Calculation ---\n")
test_dbh <- 28.4
test_ht  <- 19.2
# cat("BA (m2):", calculate_basal_area(test_dbh), "\n")
# cat("Vol (m3):", calculate_volume_example(test_dbh, test_ht), "\n\n")

# Test Case 2: Vector of 5 trees
dbh_vec <- c(12.4, 18.7, 25.1, 31.6, 44.2)
cat("--- Test 2: 5-Tree Vector Calculation ---\n")
# cat("Mean DBH:", mean(dbh_vec), "cm\n")
# cat("Total Basal Area:", sum(calculate_basal_area(dbh_vec)), "m2\n\n")

# Test Case 3: The 4 Suspicious Edge Cases
# Observe how your defensive checks respond to:
#   A. Negative DBH: -12 cm (should trigger error!)
#   B. Zero DBH: 0 cm (should trigger error!)
#   C. Missing DBH: NA (should trigger warning and return NA)
#   D. Character String: "35.1" (should trigger type error!)

cat("--- Test 3: Suspicious Edge Cases ---\n")
# try(calculate_basal_area(-12))
# try(calculate_basal_area(0))
# try(calculate_basal_area(c(25.0, NA, 30.0)))
# try(calculate_basal_area("35.1"))

# ------------------------------------------------------------------------------
# TASK 4: Process the 10-Tree Starter Inventory
# ------------------------------------------------------------------------------
# 1. Read data/unit2_starter_trees.csv using relative paths.
# 2. Add a new column `ba_m2` using your calculate_basal_area() function.
# 3. Add a new column `vol_m3` using your calculate_volume_example() function.
# 4. Display the resulting table with print(head(inventory)).
# 5. Export the processed table to `unit2_tree_metrics.csv`.

cat("--- Test 4: Processing 10-Tree Starter Inventory ---\n")
# inventory <- read.csv("data/unit2_starter_trees.csv")
# inventory$ba_m2 <- calculate_basal_area(inventory$dbh_cm)
# inventory$vol_m3 <- calculate_volume_example(inventory$dbh_cm, inventory$height_m)
# print(inventory)
# write.csv(inventory, "unit2_tree_metrics.csv", row.names = FALSE)
