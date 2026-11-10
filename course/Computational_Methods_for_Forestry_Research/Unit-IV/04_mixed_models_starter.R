# Unit 4 Practice Starter: Statistical Modeling, Diagnostics & Mixed Effects
# Practice script for lab exercises. Fill in the commented sections.

library(readr)
library(dplyr)
library(ggplot2)
library(lme4)

# 1. Load clean inventory and filter flagged height outlier
# inv <- read_csv("../Unit-III/bagmati_clean_inventory.csv", show_col_types = FALSE) |>
#   filter(!height_flag)

# 2. Exploratory graphics: diameter distribution & height-DBH by species
# p_hist <- ggplot(inv, aes(x = DBH_cm)) +
#   geom_histogram(binwidth = 4, fill = "#2b5c8f", color = "white", alpha = 0.85) +
#   labs(
#     title = "Diameter Distribution in Bagmati Community Forest Plots",
#     x = "Diameter at Breast Height, DBH (cm)",
#     y = "Stem Count"
#   ) +
#   theme_bw(base_size = 12)
# ggsave("04_dbh_histogram.png", p_hist, width = 7, height = 4.5, dpi = 300)

# p_facet <- ggplot(inv, aes(x = DBH_cm, y = Height_m, color = Species_standard)) +
#   geom_point(alpha = 0.45, size = 1.4) +
#   geom_smooth(method = "lm", se = TRUE, color = "black", linewidth = 0.7) +
#   facet_wrap(~ Species_standard) +
#   labs(
#     title = "Height-DBH Relationships Across Dominant Bagmati Tree Species",
#     x = "Diameter at Breast Height, DBH (cm)",
#     y = "Total Height (m)"
#   ) +
#   theme_bw(base_size = 11) +
#   theme(legend.position = "none")
# ggsave("04_height_dbh_faceted.png", p_facet, width = 9, height = 6, dpi = 300)

# 3. Simple linear regression (lm) and residual diagnostic inspection
# fit_lm <- lm(Height_m ~ DBH_cm, data = inv)
# summary(fit_lm)

# png("04_lm_diagnostics.png", width = 1800, height = 1600, res = 250)
# par(mfrow = c(2, 2))
# plot(fit_lm)
# dev.off()

# 4. Mixed-effects model: add random intercept for Plot_ID to handle plot clustering
# fit_lmer <- lmer(Height_m ~ DBH_cm + (1 | Plot_ID), data = inv)
# summary(fit_lmer)

# 5. Extract variance components and compute Intraclass Correlation (ICC)
# vc <- as.data.frame(VarCorr(fit_lmer))
# sigma2_plot <- vc$vcov[vc$grp == "Plot_ID"]
# sigma2_res  <- vc$vcov[vc$grp == "Residual"]
# icc_plot    <- sigma2_plot / (sigma2_plot + sigma2_res)
# cat(sprintf("ICC: %.4f (%.1f%% of variance at plot level)\n", icc_plot, icc_plot * 100))

# 6. Compare standard error of estimates between lm and lmer
# model_comp <- data.frame(
#   Model = c("Ordinary Linear Model (lm)", "Mixed-Effects Model (lmer)"),
#   Intercept_Est = c(coef(fit_lm)[1], fixef(fit_lmer)[1]),
#   DBH_Slope_Est = c(coef(fit_lm)[2], fixef(fit_lmer)[2]),
#   Intercept_SE  = c(summary(fit_lm)$coefficients[1, 2], summary(fit_lmer)$coefficients[1, 2]),
#   ICC_Plot      = c(NA, round(icc_plot, 4))
# )
# write_csv(model_comp, "04_lm_vs_lmer_comparison.csv")

