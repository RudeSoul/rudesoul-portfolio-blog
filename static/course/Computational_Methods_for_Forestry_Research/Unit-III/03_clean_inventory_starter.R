# Unit 3 Practice Starter: Forest Inventory Cleaning & Stand Summaries
# Practice script for lab exercises. Fill in the commented sections.

library(readr)
library(dplyr)
library(tidyr)

# Basal area helper (square metres from DBH in cm)
calculate_basal_area <- function(dbh_cm) {
  pi * dbh_cm^2 / 40000
}

# 1. Import raw inventory and inspect structure
# inventory_raw <- read_csv("bagmati_raw_inventory.csv", show_col_types = FALSE)
# cat("Raw Dimensions:", nrow(inventory_raw), "rows x", ncol(inventory_raw), "columns\n")
# table(inventory_raw$Species, useNA = "ifany")

# 2. Forensic cleaning & biological sanity screening
# Note: P17/T203 had DBH=999 because a field clerk omitted the decimal (9.9 cm on paper tally).
# Fix this specific stem first before converting general sentinel codes (-99, 999) to NA!
#
# inventory_flagged <- inventory_raw |>
#   mutate(
#     DBH_cm = if_else(Plot_ID == "P17" & Tree_ID == "T203" & DBH_cm == 999, 9.9, DBH_cm),
#     DBH_cm = na_if(DBH_cm, -99) |> na_if(999),
#     Height_m = na_if(Height_m, -99) |> na_if(999),
#
#     # Check for mm entries recorded as cm (>150 cm threshold)
#     unit_corrected_mm = !is.na(DBH_cm) & DBH_cm > 150,
#     DBH_cm = if_else(unit_corrected_mm, DBH_cm / 10, DBH_cm),
#
#     # Biological screening rules
#     non_positive_dbh = !is.na(DBH_cm) & DBH_cm <= 0,
#     height_dbh_ratio = Height_m / DBH_cm,
#     height_flag = !is.na(height_dbh_ratio) & height_dbh_ratio > 2.0,
#
#     flag_reason = case_when(
#       non_positive_dbh ~ "Non-positive DBH (<= 0 cm)",
#       height_flag ~ "Implausible Height:DBH ratio (> 2.0)",
#       is.na(DBH_cm) | is.na(Height_m) ~ "Missing DBH or Height (NA)",
#       unit_corrected_mm ~ "Corrected mm-to-cm transcription",
#       TRUE ~ "Valid"
#     )
#   )

# 3. Export suspicious rows for supervisor review
# review_table <- inventory_flagged |>
#   filter(flag_reason != "Valid") |>
#   select(Plot_ID, Tree_ID, Species, DBH_cm, Height_m, height_dbh_ratio, flag_reason)
# write_csv(review_table, "bagmati_flagged_records_review.csv")

# 4. Filter to 2025 census, deduplicate, and harmonize species names
# inventory_clean <- inventory_flagged |>
#   distinct(Plot_ID, Tree_ID, Measurement_Date, .keep_all = TRUE) |>
#   filter(Census_Year == 2025, !is.na(DBH_cm), DBH_cm > 0, !is.na(Height_m), Height_m > 0) |>
#   rename(Species_raw = Species) |>
#   mutate(
#     Species_standard = case_when(
#       Species_raw %in% c("S. robusta", "Shorea rubusta", "Shorea robusta") ~ "Shorea robusta",
#       Species_raw %in% c("Schima wallichi", "Schima wallichii") ~ "Schima wallichii",
#       Species_raw %in% c("C. indica", "Castanopsis indica") ~ "Castanopsis indica",
#       TRUE ~ Species_raw
#     ),
#     ba_m2 = calculate_basal_area(DBH_cm)
#   )
# write_csv(inventory_clean, "bagmati_clean_inventory.csv")

# 5. Stand summaries: TPH, BA/ha, mean DBH, and species richness
# plot_summary <- inventory_clean |>
#   group_by(Plot_ID, Stand_ID, Plot_area_ha, Elevation_m, Latitude, Longitude) |>
#   summarise(
#     n_trees = n(),
#     trees_per_ha = n() / first(Plot_area_ha),
#     total_ba_m2 = sum(ba_m2, na.rm = TRUE),
#     ba_m2_ha = sum(ba_m2, na.rm = TRUE) / first(Plot_area_ha),
#     mean_dbh_cm = mean(DBH_cm, na.rm = TRUE),
#     species_richness = n_distinct(Species_standard),
#     .groups = "drop"
#   )
# write_csv(plot_summary, "bagmati_plot_summary.csv")

# 6. Species Importance Value Index (IVI)
# total_area <- sum(unique(inventory_clean[, c("Plot_ID", "Plot_area_ha")])$Plot_area_ha)
# total_n_plots <- n_distinct(inventory_clean$Plot_ID)
#
# species_summary <- inventory_clean |>
#   group_by(Species_standard) |>
#   summarise(
#     n_stems = n(),
#     density_ha = n() / total_area,
#     dominance_ba_ha = sum(ba_m2, na.rm = TRUE) / total_area,
#     plots_present = n_distinct(Plot_ID),
#     frequency = n_distinct(Plot_ID) / total_n_plots,
#     .groups = "drop"
#   ) |>
#   mutate(
#     Relative_Density = (density_ha / sum(density_ha)) * 100,
#     Relative_Dominance = (dominance_ba_ha / sum(dominance_ba_ha)) * 100,
#     Relative_Frequency = (frequency / sum(frequency)) * 100,
#     Importance_Value_IV = Relative_Density + Relative_Dominance + Relative_Frequency
#   ) |>
#   arrange(desc(Importance_Value_IV))
# write_csv(species_summary, "bagmati_species_summary.csv")

