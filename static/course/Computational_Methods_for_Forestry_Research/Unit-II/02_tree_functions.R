# Equation: BA (m2) = pi * DBH (cm)^2 / 40000
calculate_basal_area <- function(dbh_cm) {
  if (!is.numeric(dbh_cm)) {
    stop("Error: DBH must be numeric (measured in centimetres).")
  }
  if (any(dbh_cm <= 0, na.rm = TRUE)) {
    stop("Error: DBH must be strictly greater than zero.")
  }
  if (any(is.na(dbh_cm))) {
    warning("Note: Missing values (NA) detected in DBH; returning NA for those records.")
  }
  if (any(dbh_cm > 150, na.rm = TRUE)) {
    warning("Domain Warning: DBH > 150 cm detected. Check whether measurements were recorded in mm.")
  }

  ba_m2 <- pi * dbh_cm^2 / 40000
  return(ba_m2)
}

calculate_volume_example <- function(dbh_cm, height_m) {
  if (!is.numeric(dbh_cm) || !is.numeric(height_m)) {
    stop("Error: DBH and height must be numeric.")
  }
  if (any(dbh_cm <= 0, na.rm = TRUE)) {
    stop("Error: DBH must be greater than zero.")
  }
  if (any(height_m <= 0, na.rm = TRUE)) {
    stop("Error: Height must be greater than zero.")
  }
  if (any(dbh_cm < 10 | dbh_cm > 80, na.rm = TRUE) ||
    any(height_m < 5 | height_m > 40, na.rm = TRUE)) {
    warning("Domain of applicability warning: One or more trees fall outside valid range (DBH 10-80 cm, Height 5-40 m).")
  }


  volume_m3 <- pi * (dbh_cm / 200)^2 * height_m
  return(volume_m3)
}

if (sys.nframe() == 0) {
  species <- "Schima wallichii"
  dbh_cm <- 28.4
  height_m <- 19.2
  cat("Single Tree BA (m2):", round(calculate_basal_area(dbh_cm), 6), "\n")


  dbh_vec <- c(12.4, 18.7, 25.1, 31.6, 44.2)
  cat("Vector Mean DBH:", mean(dbh_vec), "| Total BA:", round(sum(calculate_basal_area(dbh_vec)), 4), "m2\n")


  inventory <- read.csv("./unit2_starter_trees.csv")
  inventory$ba_m2 <- calculate_basal_area(inventory$dbh_cm)
  inventory$vol_m3_example <- calculate_volume_example(inventory$dbh_cm, inventory$height_m)
  print(head(inventory))
  write.csv(inventory, "./unit2_tree_metrics.csv", row.names = FALSE)
}
