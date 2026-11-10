# Unit 8: Spatial Data Minimization & Ethical Research Packaging
# Anonymizing precise GPS coordinates of endangered species (Taxus wallichiana) for FAIR release

library(readr)
library(dplyr)

# Load clean inventory records
inv_clean <- read_csv("../Unit-III/bagmati_clean_inventory.csv", show_col_types = FALSE)

# Himalayan yew (Taxus wallichiana) is heavily harvested for taxol.
# Publishing sub-metre GPS coordinates creates direct poaching risk.
sensitive_plots <- inv_clean |>
  filter(Species_standard == "Taxus wallichiana") |>
  pull(Plot_ID) |>
  unique()

cat("Plots harboring threatened Taxus wallichiana:", paste(sensitive_plots, collapse = ", "), "\n")

# Prepare public-safe research dataset:
# 1. Strip raw Latitude and Longitude columns.
# 2. Generalize elevations into broad 200m bands.
# 3. Add explicit data provenance and access status flags.
public_safe_inventory <- inv_clean |>
  mutate(
    Elevation_Band = paste0(floor(Elevation_m / 200) * 200, "-", floor(Elevation_m / 200) * 200 + 200, " m"),
    Location_Access_Status = if_else(
      Plot_ID %in% sensitive_plots,
      "Coordinates Withheld (Threatened Species Protection)",
      "Generalised to Stand Level"
    )
  ) |>
  select(
    Plot_ID, Stand_ID, Elevation_Band, Location_Access_Status,
    Tree_ID, Species_standard, DBH_cm, Height_m, ba_m2
  )

write_csv(public_safe_inventory, "bagmati_public_use_inventory.csv")
cat("Exported public-safe open science dataset to: bagmati_public_use_inventory.csv\n")

