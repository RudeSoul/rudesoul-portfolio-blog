# Unit 5 Practice Starter: Allometric Modeling & Community Ecology
# Practice script for lab exercises. Fill in the commented sections.

library(readr)
library(dplyr)
library(tidyr)
library(ggplot2)
library(vegan)

set.seed(2026)

# 1. Load clean inventory and filter the flagged height outlier
# inv <- read_csv("../Unit-III/bagmati_clean_inventory.csv", show_col_types = FALSE) |>
#   filter(!height_flag)

# 2. Fit candidate height-diameter curves for Schima wallichii:
#    - Linear: Height ~ DBH
#    - Log-linear: log(Height) ~ log(DBH)
#    - Chapman-Richards: H ~ A * (1 - exp(-k * DBH))^p
#    - Michaelis-Menten: H ~ (a * DBH) / (b + DBH)
#
# schima <- inv |> filter(Species_standard == "Schima wallichii")
# m_lin  <- lm(Height_m ~ DBH_cm, data = schima)
# m_log  <- lm(log(Height_m) ~ log(DBH_cm), data = schima)
# m_cr   <- nls(Height_m ~ A * (1 - exp(-k * DBH_cm))^p, data = schima, start = list(A = 28, k = 0.04, p = 1.1))
# m_mm   <- nls(Height_m ~ (a * DBH_cm) / (b + DBH_cm), data = schima, start = list(a = 32, b = 18))

# 3. Model evaluation with RMSE and Baskerville correction for log model
# rmse_fn <- function(obs, pred) sqrt(mean((obs - pred)^2))
# sigma_log_h <- summary(m_log)$sigma
# cf_log_h    <- exp((sigma_log_h^2) / 2)
#
# hd_comparison <- data.frame(
#   Model = c("Linear", "Log-Linear (Baskerville Corrected)", "Chapman-Richards (nls)", "Michaelis-Menten (nls)"),
#   AIC   = c(AIC(m_lin), NA, AIC(m_cr), AIC(m_mm)),
#   RMSE_m = c(
#     rmse_fn(schima$Height_m, predict(m_lin)),
#     rmse_fn(schima$Height_m, exp(predict(m_log)) * cf_log_h),
#     rmse_fn(schima$Height_m, predict(m_cr)),
#     rmse_fn(schima$Height_m, predict(m_mm))
#   )
# )
# write_csv(hd_comparison, "05_hd_model_comparison.csv")

# 4. Biomass power-law: compare naive predictions vs Baskerville-corrected totals
# m_agb <- lm(log(Biomass_kg) ~ log(DBH_cm), data = inv)
# cf_baskerville <- exp((summary(m_agb)$sigma^2) / 2)
# inv <- inv |>
#   mutate(
#     agb_naive_kg = exp(predict(m_agb)),
#     agb_corrected_kg = exp(predict(m_agb)) * cf_baskerville
#   )

# 5. Cross-validation: 80:20 random tree split vs whole-plot holdout
# (Compare prediction errors when holding out 4 entire stands: P17-P20)
# holdout_plots <- c("P17", "P18", "P19", "P20")
# train_plot_df <- inv |> filter(!Plot_ID %in% holdout_plots)
# test_plot_df  <- inv |> filter(Plot_ID %in% holdout_plots)
# m_plot_cv <- lm(log(Biomass_kg) ~ log(DBH_cm), data = train_plot_df)
# cf_plot   <- exp(summary(m_plot_cv)$sigma^2 / 2)
# pred_plot_test <- exp(predict(m_plot_cv, newdata = test_plot_df)) * cf_plot

# 6. Community diversity and NMDS ordination with vegan
# sp_matrix_df <- inv |>
#   count(Plot_ID, Species_standard) |>
#   pivot_wider(names_from = Species_standard, values_from = n, values_fill = 0)
# write_csv(sp_matrix_df, "bagmati_species_by_plot_matrix.csv")
#
# comm_mat <- as.data.frame(sp_matrix_df[, -1])
# rownames(comm_mat) <- sp_matrix_df$Plot_ID
#
# diversity_table <- data.frame(
#   Plot_ID = rownames(comm_mat),
#   Richness_S = specnumber(comm_mat),
#   Shannon_H  = round(diversity(comm_mat, index = "shannon"), 3),
#   Simpson_1_minus_D = round(diversity(comm_mat, index = "simpson"), 3)
# )
# write_csv(diversity_table, "05_plot_diversity_metrics.csv")
#
# nmds <- metaMDS(comm_mat, distance = "bray", k = 2, trymax = 50, trace = FALSE)

