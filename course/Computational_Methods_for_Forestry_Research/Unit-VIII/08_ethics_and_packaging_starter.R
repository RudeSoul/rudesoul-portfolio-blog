# Unit 8 Practice Starter: Research Ethics & Open Science Data Packaging
# Practice script for lab exercises. Fill in the commented sections.

library(readr)
library(dplyr)

# 1. Load clean inventory records
# inv_clean <- read_csv("../Unit-III/bagmati_clean_inventory.csv", show_col_types = FALSE)

# 2. Identify plots containing threatened Taxus wallichiana
# sensitive_plots <- inv_clean |>
#   filter(Species_standard == "Taxus wallichiana") |>
#   pull(Plot_ID) |>
#   unique()

# 3. Apply spatial minimization:
#    - Withhold exact Lat/Lon
#    - Group elevations into 200m bands
#    - Add Location_Access_Status
# public_safe_inventory <- inv_clean |>
#   mutate(
#     Elevation_Band = paste0(floor(Elevation_m / 200) * 200, "-", floor(Elevation_m / 200) * 200 + 200, " m"),
#     Location_Access_Status = if_else(
#       Plot_ID %in% sensitive_plots,
#       "Coordinates Withheld (Threatened Species Protection)",
#       "Generalised to Stand Level"
#     )
#   ) |>
#   select(Plot_ID, Stand_ID, Elevation_Band, Location_Access_Status,
#          Tree_ID, Species_standard, DBH_cm, Height_m, ba_m2)
# write_csv(public_safe_inventory, "bagmati_public_use_inventory.csv")

