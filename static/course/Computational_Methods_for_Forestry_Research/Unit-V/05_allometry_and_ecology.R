# Unit 5: Allometric Modeling, Biomass Estimation & Community Ecology
# Bagmati Forest Observatory: Growth Curves, Baskerville Correction & vegan Ordination

library(readr)
library(dplyr)
library(tidyr)
library(ggplot2)
library(vegan)

set.seed(2026)

# Load clean inventory and filter the flagged height outlier
inv <- read_csv("../Unit-III/bagmati_clean_inventory.csv", show_col_types = FALSE) |>
  filter(!height_flag)

# --- 1. Height-Diameter Allometry (Schima wallichii) ---
# Testing linear, log-linear, and non-linear asymptotic forms on the dominant timber species
schima <- inv |> filter(Species_standard == "Schima wallichii")

m_lin <- lm(Height_m ~ DBH_cm, data = schima)
m_log <- lm(log(Height_m) ~ log(DBH_cm), data = schima)

# Chapman-Richards curve: H = A * (1 - exp(-k * D))^p
m_cr <- nls(
  Height_m ~ A * (1 - exp(-k * DBH_cm))^p,
  data = schima,
  start = list(A = 28, k = 0.04, p = 1.1)
)

# Michaelis-Menten curve: H = (a * D) / (b + D)
m_mm <- nls(
  Height_m ~ (a * DBH_cm) / (b + DBH_cm),
  data = schima,
  start = list(a = 32, b = 18)
)

# Root Mean Square Error helper on original metre scale
rmse_fn <- function(obs, pred) sqrt(mean((obs - pred)^2))
mae_fn  <- function(obs, pred) mean(abs(obs - pred))

# Baskerville (1972) correction factor for back-transforming log predictions: CF = exp(sigma^2 / 2)
sigma_log_h <- summary(m_log)$sigma
cf_log_h    <- exp((sigma_log_h^2) / 2)

hd_comparison <- data.frame(
  Model = c("Linear", "Log-Linear (Baskerville Corrected)", "Chapman-Richards (nls)", "Michaelis-Menten (nls)"),
  AIC   = c(AIC(m_lin), NA, AIC(m_cr), AIC(m_mm)),
  RMSE_m = c(
    rmse_fn(schima$Height_m, predict(m_lin)),
    rmse_fn(schima$Height_m, exp(predict(m_log)) * cf_log_h),
    rmse_fn(schima$Height_m, predict(m_cr)),
    rmse_fn(schima$Height_m, predict(m_mm))
  )
)
print(hd_comparison)
write_csv(hd_comparison, "05_hd_model_comparison.csv")

# --- 2. Biomass Estimation & Back-Transformation Bias Correction ---
# Fit power-law: ln(Biomass) = a + b * ln(DBH)
m_agb <- lm(log(Biomass_kg) ~ log(DBH_cm), data = inv)
sigma_agb <- summary(m_agb)$sigma
cf_baskerville <- exp((sigma_agb^2) / 2)

inv <- inv |>
  mutate(
    pred_log_agb = predict(m_agb),
    agb_naive_kg = exp(pred_log_agb),
    agb_corrected_kg = exp(pred_log_agb) * cf_baskerville
  )

cat(sprintf("\nBaskerville Correction Factor: %.4f\n", cf_baskerville))
cat(sprintf("Total Naive Biomass     : %.2f Mg\n", sum(inv$agb_naive_kg) / 1000))
cat(sprintf("Total Corrected Biomass : %.2f Mg\n", sum(inv$agb_corrected_kg) / 1000))

# Cross-validation: naive random tree split vs realistic whole-plot holdout
# (Trees in the same plot share stand conditions, making random tree splits overly optimistic)
train_idx <- sample(seq_len(nrow(inv)), size = floor(0.8 * nrow(inv)))
train_trees <- inv[train_idx, ]
test_trees  <- inv[-train_idx, ]

m_tree_cv <- lm(log(Biomass_kg) ~ log(DBH_cm), data = train_trees)
cf_tree   <- exp(summary(m_tree_cv)$sigma^2 / 2)
pred_tree_test <- exp(predict(m_tree_cv, newdata = test_trees)) * cf_tree

# Whole-plot holdout (evaluating on 4 completely unseen stands: P17-P20)
holdout_plots <- c("P17", "P18", "P19", "P20")
train_plot_df <- inv |> filter(!Plot_ID %in% holdout_plots)
test_plot_df  <- inv |> filter(Plot_ID %in% holdout_plots)

m_plot_cv <- lm(log(Biomass_kg) ~ log(DBH_cm), data = train_plot_df)
cf_plot   <- exp(summary(m_plot_cv)$sigma^2 / 2)
pred_plot_test <- exp(predict(m_plot_cv, newdata = test_plot_df)) * cf_plot

cv_results <- data.frame(
  Validation_Strategy = c("Random 80:20 Tree Split", "Plot-Grouped Holdout (4 Unseen Plots)"),
  Test_RMSE_kg = c(rmse_fn(test_trees$Biomass_kg, pred_tree_test),
                   rmse_fn(test_plot_df$Biomass_kg, pred_plot_test)),
  Test_MAE_kg  = c(mae_fn(test_trees$Biomass_kg, pred_tree_test),
                   mae_fn(test_plot_df$Biomass_kg, pred_plot_test))
)
print(cv_results)
write_csv(cv_results, "05_biomass_cross_validation.csv")

# --- 3. Community Ecology: Diversity & NMDS Ordination with vegan ---
# Pivot clean stems into a species-by-plot abundance matrix
sp_matrix_df <- inv |>
  count(Plot_ID, Species_standard) |>
  pivot_wider(names_from = Species_standard, values_from = n, values_fill = 0)

write_csv(sp_matrix_df, "bagmati_species_by_plot_matrix.csv")

comm_mat <- as.data.frame(sp_matrix_df[, -1])
rownames(comm_mat) <- sp_matrix_df$Plot_ID

# Plot diversity metrics
plot_meta <- read_csv("../Unit-III/bagmati_plot_summary.csv", show_col_types = FALSE)
diversity_table <- data.frame(
  Plot_ID = rownames(comm_mat),
  Richness_S = specnumber(comm_mat),
  Shannon_H  = round(diversity(comm_mat, index = "shannon"), 3),
  Simpson_1_minus_D = round(diversity(comm_mat, index = "simpson"), 3)
) |>
  left_join(plot_meta |> select(Plot_ID, Elevation_m, ba_m2_ha), by = "Plot_ID")

write_csv(diversity_table, "05_plot_diversity_metrics.csv")

# Non-metric multidimensional scaling (Bray-Curtis dissimilarity, 2 dimensions)
nmds <- metaMDS(comm_mat, distance = "bray", k = 2, trymax = 50, trace = FALSE)
nmds_scores <- as.data.frame(scores(nmds, display = "sites"))
nmds_scores$Plot_ID <- rownames(nmds_scores)
nmds_scores <- left_join(nmds_scores, diversity_table, by = "Plot_ID")

p_nmds <- ggplot(nmds_scores, aes(x = NMDS1, y = NMDS2, color = Elevation_m, label = Plot_ID)) +
  geom_point(size = 3.5) +
  geom_text(vjust = -0.8, size = 3, show.legend = FALSE) +
  scale_color_viridis_c(name = "Elevation (m)") +
  labs(
    title = paste0("NMDS Ordination of Bagmati Plots (Bray-Curtis, Stress = ", round(nmds$stress, 3), ")"),
    subtitle = "Composition shifts distinctly along the valley elevation gradient"
  ) +
  theme_bw(base_size = 11)

ggsave("05_nmds_ordination.png", p_nmds, width = 7.5, height = 5.5, dpi = 300)

