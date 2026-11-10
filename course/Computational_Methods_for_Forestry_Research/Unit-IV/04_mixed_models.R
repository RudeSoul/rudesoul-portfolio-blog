# Unit 4: Statistical Modeling, Residual Diagnostics & Mixed-Effects in Forestry
# Bagmati Community Forest Inventory: Assessing Height-DBH Allometry across Plots

library(readr)
library(dplyr)
library(ggplot2)
library(lme4)

# Load cleaned inventory and filter the single height outlier (40m / 10cm ratio)
inv <- read_csv("../Unit-III/bagmati_clean_inventory.csv", show_col_types = FALSE) |>
  filter(!height_flag)

# 1. Exploratory diameter distribution and species-specific height-diameter curves
p_hist <- ggplot(inv, aes(x = DBH_cm)) +
  geom_histogram(binwidth = 4, fill = "#2b5c8f", color = "white", alpha = 0.85) +
  labs(
    title = "Diameter Distribution in Bagmati Community Forest Plots",
    x = "Diameter at Breast Height, DBH (cm)",
    y = "Stem Count"
  ) +
  theme_bw(base_size = 12)

ggsave("04_dbh_histogram.png", p_hist, width = 7, height = 4.5, dpi = 300)

p_facet <- ggplot(inv, aes(x = DBH_cm, y = Height_m, color = Species_standard)) +
  geom_point(alpha = 0.45, size = 1.4) +
  geom_smooth(method = "lm", se = TRUE, color = "black", linewidth = 0.7) +
  facet_wrap(~ Species_standard) +
  labs(
    title = "Height-DBH Relationships Across Dominant Bagmati Tree Species",
    x = "Diameter at Breast Height, DBH (cm)",
    y = "Total Height (m)",
    color = "Species"
  ) +
  theme_bw(base_size = 11) +
  theme(legend.position = "none")

ggsave("04_height_dbh_faceted.png", p_facet, width = 9, height = 6, dpi = 300)

# 2. Simple linear regression (naive baseline: assumes all stems are independent)
fit_lm <- lm(Height_m ~ DBH_cm, data = inv)
cat("\n--- Simple Linear Regression (Treating Trees as Independent) ---\n")
print(summary(fit_lm))
print(confint(fit_lm))

# Check residual assumptions: heteroscedasticity & non-normality
png("04_lm_diagnostics.png", width = 1800, height = 1600, res = 250)
par(mfrow = c(2, 2))
plot(fit_lm)
dev.off()

# 3. Hierarchical structure: trees clustered within sample plots
# Fitting random intercept by Plot_ID to avoid pseudoreplication
cat(sprintf("\nSampling structure: %d trees across %d permanent sample plots\n",
            nrow(inv), n_distinct(inv$Plot_ID)))

fit_lmer <- lmer(Height_m ~ DBH_cm + (1 | Plot_ID), data = inv)
cat("\n--- Linear Mixed-Effects Model (Random Intercept for Plot_ID) ---\n")
print(summary(fit_lmer))
print(confint(fit_lmer, parm = "beta_", method = "Wald"))

# 4. Intraclass Correlation Coefficient (ICC): variance partitioned between plots vs within plots
vc <- as.data.frame(VarCorr(fit_lmer))
sigma2_plot <- vc$vcov[vc$grp == "Plot_ID"]
sigma2_res  <- vc$vcov[vc$grp == "Residual"]
icc_plot    <- sigma2_plot / (sigma2_plot + sigma2_res)

cat(sprintf("\nBetween-Plot Variance (sigma^2_plot) : %.4f\n", sigma2_plot))
cat(sprintf("Residual Variance    (sigma^2_res)  : %.4f\n", sigma2_res))
cat(sprintf("Intraclass Correlation (ICC)         : %.4f (%.1f%% of height variation is between plots)\n",
            icc_plot, icc_plot * 100))

# 5. Export side-by-side comparison of ordinary LM vs mixed-effects LMER
model_comp <- data.frame(
  Model = c("Ordinary Linear Model (lm)", "Mixed-Effects Model (lmer)"),
  Intercept_Est = c(coef(fit_lm)[1], fixef(fit_lmer)[1]),
  DBH_Slope_Est = c(coef(fit_lm)[2], fixef(fit_lmer)[2]),
  Intercept_SE  = c(summary(fit_lm)$coefficients[1, 2], summary(fit_lmer)$coefficients[1, 2]),
  ICC_Plot      = c(NA, round(icc_plot, 4))
)

write_csv(model_comp, "04_lm_vs_lmer_comparison.csv")
cat("\nSaved model comparison table to: 04_lm_vs_lmer_comparison.csv\n")

