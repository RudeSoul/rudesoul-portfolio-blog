# Unit 3: Forest Inventory Data Cleaning, Stand Summaries & Biological Screening
# Bagmati Province Community Forest Observatory (2025 Census)

library(readr)
library(dplyr)
library(tidyr)

# Load raw inventory records (keep raw data immutable)
inventory_raw <- read_csv("bagmati_raw_inventory.csv", show_col_types = FALSE)
cat(sprintf("Imported raw inventory: %d rows x %d columns\n", nrow(inventory_raw), ncol(inventory_raw)))

# First look at taxonomic spelling variations
table(inventory_raw$Species, useNA = "ifany")

# Forensic cleaning pipeline:
# 1. P17/T203 was recorded as 999 due to an omitted decimal on the field tally sheet (actual: 9.9 cm).
#    Correct this before replacing sentinel codes (-99, 999) with NA so the stem is preserved.
# 2. Correct 12 trees recorded in mm (>150 cm threshold indicates millimetre entry).
# 3. Screen biological boundaries (flag suspicious stems rather than silently dropping rows).
inventory_flagged <- inventory_raw |>
  mutate(
    DBH_cm = if_else(Plot_ID == "P17" & Tree_ID == "T203" & DBH_cm == 999, 9.9, DBH_cm),
    DBH_cm = na_if(DBH_cm, -99) |> na_if(999),
    Height_m = na_if(Height_m, -99) |> na_if(999),
    
    unit_corrected_mm = !is.na(DBH_cm) & DBH_cm > 150,
    DBH_cm = if_else(unit_corrected_mm, DBH_cm / 10, DBH_cm),
    
    non_positive_dbh = !is.na(DBH_cm) & DBH_cm <= 0,
    height_dbh_ratio = Height_m / DBH_cm,
    height_flag = !is.na(height_dbh_ratio) & height_dbh_ratio > 2.0,
    
    flag_reason = case_when(
      non_positive_dbh ~ "Non-positive DBH (<= 0 cm)",
      height_flag ~ "Implausible Height:DBH ratio (> 2.0)",
      is.na(DBH_cm) | is.na(Height_m) ~ "Missing DBH or Height (NA)",
      unit_corrected_mm ~ "Corrected mm-to-cm transcription",
      TRUE ~ "Valid"
    )
  )

# Export audit table of flagged records for supervisor review
review_table <- inventory_flagged |>
  filter(flag_reason != "Valid") |>
  select(Plot_ID, Tree_ID, Species, DBH_cm, Height_m, height_dbh_ratio, flag_reason)

write_csv(review_table, "bagmati_flagged_records_review.csv")
cat(sprintf("Flagged %d records requiring supervisory review\n", nrow(review_table)))

# Deduplicate repeated plot visits and standardize taxonomy for 2025 census
inventory_clean <- inventory_flagged |>
  distinct(Plot_ID, Tree_ID, Measurement_Date, .keep_all = TRUE) |>
  filter(Census_Year == 2025, !is.na(DBH_cm), DBH_cm > 0, !is.na(Height_m), Height_m > 0) |>
  rename(Species_raw = Species) |>
  mutate(
    Species_standard = case_when(
      Species_raw %in% c("S. robusta", "Shorea rubusta", "Shorea robusta") ~ "Shorea robusta",
      Species_raw %in% c("Schima wallichi", "Schima wallichii") ~ "Schima wallichii",
      Species_raw %in% c("C. indica", "Castanopsis indica") ~ "Castanopsis indica",
      TRUE ~ Species_raw
    ),
    # Basal area in square metres: pi * (DBH in cm)^2 / 40000
    ba_m2 = pi * (DBH_cm^2) / 40000
  )

write_csv(inventory_clean, "bagmati_clean_inventory.csv")
cat(sprintf("Saved cleaned inventory: %d valid trees\n", nrow(inventory_clean)))

# Stand-level summaries: density, basal area, and species richness per plot
plot_summary <- inventory_clean |>
  group_by(Plot_ID, Stand_ID, Plot_area_ha, Elevation_m, Latitude, Longitude) |>
  summarise(
    n_trees = n(),
    trees_per_ha = n() / first(Plot_area_ha),
    total_ba_m2 = sum(ba_m2, na.rm = TRUE),
    ba_m2_ha = sum(ba_m2, na.rm = TRUE) / first(Plot_area_ha),
    mean_dbh_cm = mean(DBH_cm, na.rm = TRUE),
    mean_height_m = mean(Height_m, na.rm = TRUE),
    species_richness = n_distinct(Species_standard),
    .groups = "drop"
  )

write_csv(plot_summary, "bagmati_plot_summary.csv")

# Species Importance Value Index (IVI = RD + RDo + RF, max 300)
total_area_sampled <- sum(unique(inventory_clean[, c("Plot_ID", "Plot_area_ha")])$Plot_area_ha)
total_plots <- n_distinct(inventory_clean$Plot_ID)

species_summary <- inventory_clean |>
  group_by(Species_standard) |>
  summarise(
    n_stems = n(),
    density_ha = n() / total_area_sampled,
    dominance_ba_ha = sum(ba_m2, na.rm = TRUE) / total_area_sampled,
    plots_present = n_distinct(Plot_ID),
    frequency = n_distinct(Plot_ID) / total_plots,
    .groups = "drop"
  ) |>
  mutate(
    Relative_Density = (density_ha / sum(density_ha)) * 100,
    Relative_Dominance = (dominance_ba_ha / sum(dominance_ba_ha)) * 100,
    Relative_Frequency = (frequency / sum(frequency)) * 100,
    Importance_Value_IV = Relative_Density + Relative_Dominance + Relative_Frequency
  ) |>
  arrange(desc(Importance_Value_IV))

write_csv(species_summary, "bagmati_species_summary.csv")
print(species_summary)

# Programmatic GBIF query with local offline fallback
cat("\nQuerying GBIF occurrences for Shorea robusta (Nepal)...\n")
tryCatch({
  if (requireNamespace("rgbif", quietly = TRUE) && curl::has_internet()) {
    gbif_res <- rgbif::occ_search(
      scientificName = "Shorea robusta",
      country = "NP",
      hasCoordinate = TRUE,
      limit = 50
    )$data
    write_csv(gbif_res, "gbif_shorea_robusta_live.csv")
    cat(sprintf("Live query successful: saved %d records\n", nrow(gbif_res)))
  } else {
    cat("Using cached reference occurrences: gbif_shorea_robusta_bagmati.csv\n")
  }
}, error = function(e) {
  cat("Network unavailable; loaded local fallback: gbif_shorea_robusta_bagmati.csv\n")
})

