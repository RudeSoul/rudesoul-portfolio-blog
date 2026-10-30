# SECTION 1: R Objects, Assignment, and Single-Tree Arithmetic
# Start with a single tree in the field before scaling to a whole forest.

# Assign a measurement to an object using '<-'
dbh <- 28.1
height <- 20.1

# Objects can be overwritten if a measurement is updated or corrected:
dbh <- 28.4 # Diameter at breast height in centimetres (cm)
height <- 19.2 # Total tree height in metres (m)

# Print values to the console
dbh
height

# Calculate Basal Area (m2) from DBH (cm)
ba <- pi * (dbh^2) / 40000
ba


# SECTION 2: Data Types, Type Checking, and Type Casting (Changing Types)
# R needs to know what kind of data an object holds to prevent math errors.

# 1. The Core Data Types in Forestry

dbh_num <- 28.4 # Numeric (double): continuous measurements

tree_count <- 10L # Integer: whole numbers (the 'L' forces integer)

species_chr <- "Schima wallichii" # Character: text strings, species, IDs

is_alive <- TRUE # Logical: boolean TRUE or FALSE flags
cat("\014")

# Inspect types using class() (high-level type) and typeof() (internal storage)
class(dbh_num) # "numeric"
typeof(dbh_num) # "double"

class(tree_count) # "integer"
typeof(tree_count) # "integer"

class(species_chr) # "character"
typeof(species_chr) # "character"

class(is_alive) # "logical"
typeof(is_alive) # "logical"

# Verify types using is.*() functions (returns TRUE or FALSE)
is.numeric(dbh_num) # TRUE

is.integer(tree_count) # TRUE

is.character(species_chr) # TRUE

is.logical(is_alive) # TRUE


# 2. Why Data Types Matter: The "Number Stored as Text"
# Field sheets often import numbers as text due to accidental spaces or symbols.
messy_dbh <- c(12, 13, "22", 11, "35.1", "28.4", "17.8", 42, 22.4, NA)
class(messy_dbh) # "character"

# math on text causes an error:
pi * (messy_dbh^2) / 40000 # --> Error: non-numeric argument to binary operator


# 3. Type Casting (Explicitly Changing Types with as.* functions)

# Scenario A: Character -> Numeric
clean_dbh <- as.numeric(messy_dbh)
class(clean_dbh)
pi * (clean_dbh^2) / 40000

# What if a text string contains units like "35.1 cm"?
bad_entry <- "35.1 cm"
as.numeric(bad_entry)

# Scenario B: Numeric -> Character (e.g., turning plot numbers into ID labels)
plot_num <- c(1, 2, 3)
plot_id_chr <- as.character(plot_num)
plot_id_chr # "1" "2" "3" (prevents accidentally averaging plot IDs!)

# Scenario C: Logical <-> Numeric (Useful for counting TRUE conditions!)
# In R, TRUE equals 1 and FALSE equals 0.
as.numeric(c(TRUE, FALSE, TRUE))
as.logical(c(1, 0, 5, 0))

# Scenario D: Character -> Factor (Categorical groups for statistical modelling)
forest_types <- c("Community", "Private", "Community", "Protected")
forest_factor <- as.factor(forest_types)
class(forest_factor) # "factor"
levels(forest_factor)

# Scenario E: The Classic Factor-to-Numeric Problem
# If numeric codes are stored as a factor, convert to character FIRST, then numeric:
plot_codes_factor <- factor(c("101", "102", "105"))
as.numeric(plot_codes_factor) # WRONG! Returns internal level indices: 1 2 3
as.numeric(as.character(plot_codes_factor)) # CORRECT! Returns: 101 102 105

# 4. Implicit Coercion (When R changes types automatically in a vector)
# A vector can only hold ONE data type. Mixing types forces R to convert them
# following the hierarchy: logical -> integer -> numeric -> character
mixed_vec <- c(28.4, TRUE, "Schima")
mixed_vec # "28.4" "TRUE" "Schima" (all silently converted to character!)
class(mixed_vec)


# SECTION 3: Logical Statements & Relational Operators
# Ask TRUE/FALSE questions about tree measurements to audit and filter data.

# 1. Relational (Comparison) Operators: >, <, >=, <=, == (equal), != (not equal)
dbh > 20 # TRUE  (Is DBH greater than 20 cm?)
dbh <= 10 # FALSE (Is DBH 10 cm or smaller?)
species_chr
species_chr == "Shorea robusta" # FALSE (Exact match check; note the double '==')
species_chr != "Pinus roxburghii" # TRUE (Not equal to Chir pine)
1 == "1"
# 2. Compound Logical Operators: & (AND), | (OR), ! (NOT)
# Merchantable timber rule: DBH > 30 cm AND Height > 18 m
(dbh > 30) & (height > 18) # FALSE (both conditions must be TRUE)

# Pole-sized range check: Is DBH between 10 cm and 30 cm?
(dbh >= 10) & (dbh <= 30) # TRUE

# Flagging rule: Is DBH negative OR absurdly large (> 150 cm)?
(dbh <= 0) | (dbh > 150) # FALSE (TRUE if at least one condition is met)

# Negation (! flips TRUE to FALSE and vice versa)
!(dbh < 0) # TRUE

# 3. Conditional Decision-Making with if / else (for a single value)
if (dbh >= 30) {
    cat("Classification: Sawtimber tree\n")
} else if (dbh >= 10) {
    cat("Classification: Pole-sized tree\n")
} else {
    cat("Classification: Sapling\n")
}

# SECTION 4: Vectors, Vectorisation, and Missing Values (NA)
# Move from 1 tree to 5 trees at once without writing loops.


# Combine multiple DBH measurements into a numeric vector using c()
trees_dbh <- c(28.4, 35.1, 17.8, 42.0, 22.4, 35.1, 17.8, 42.0, 22.4, 35.1, 17.8, 42.0, 22.4, 35.1, 17.8, 42.0, 22.4)
# Vectorised math: R applies the basal area formula to all 5 trees simultaneously
trees_ba <- pi * (trees_dbh^2) / 40000
round(trees_ba, )

# Vectorised logical choice with ifelse(test, yes, no)
ifelse(trees_dbh >= 30, "Large Stem", "Small/Medium Stem")

# Handling Missing Values (NA) in Field Data
heights <- c(19.2, 22.4, NA, 25.1, 17.1, 19.2, 22.4, NA, 25.1, 17.1, 19.2, 22.4, NA, 25.1, 17.1, 19.2, 22.4, NA, 25.1, 17.1)

# Default: fails safely so you know data are missing
mean(heights) # returns NA

# The fix: tell R to remove NAs before calculating
mean(heights, na.rm = TRUE) # returns 20.95 m

# How many trees had missing height measurements?
# (is.na() produces TRUE/FALSE; sum() counts the TRUEs because TRUE == 1)
is.na(heights) # FALSE FALSE TRUE FALSE FALSE
sum(is.na(heights)) # returns 1


# SECTION 5: Writing Defensive Functions with Vectorised Logical Guards
# Package our equations into reusable tools that catch bad field data.

# 1. Test how logical checks behave on a vector with planted errors
test_trees <- c(28.4, -12.0, 0, 999, NA)

# Which trees have impossible non-positive diameters?
test_trees <= 0

# Which trees are suspiciously large (> 150 cm) AND not missing?
test_trees > 150 & !is.na(test_trees)

# Do ANY trees in the vector violate the > 0 rule?
any(test_trees <= 0, na.rm = TRUE) # Returns a single TRUE

# 2. Build a Defensive Basal Area Function
calculate_basal_area <- function(dbh_cm) {
    # Guard 1: Check data type
    if (!is.numeric(dbh_cm)) {
        stop("Error: DBH must be numeric (measured in cm)!")
    }
    # Guard 2: Stop on biologically impossible negative or zero values
    if (any(dbh_cm <= 0, na.rm = TRUE)) {
        stop("Error: DBH must be strictly greater than 0!")
    }
    # Guard 3: Warn on potential unit errors (e.g., mm recorded instead of cm)
    if (any(dbh_cm > 150, na.rm = TRUE)) {
        warning("Warning: DBH > 150 cm detected. Did you record in mm?")
    }

    ba_m2 <- pi * (dbh_cm^2) / 40000
    return(ba_m2)
}

# Test the function on valid and invalid inputs
calculate_basal_area(28.4)
calculate_basal_area(c(28.4, 999)) # Runs, but triggers our custom unit warning!


calculate_basal_area(-12) # Halts with: "Error: DBH must be strictly greater than 0!"

# 3. Build a Coefficient of Variation (CV%) Function
calc_cv <- function(x) {
    cv <- (sd(x, na.rm = TRUE) / mean(x, na.rm = TRUE)) * 100
    return(round(cv, 2))
}
calc_cv()
calc_cv(c(28.4, 35.1, 17.8, 42.0, 22.4)) # Returns 34.81 (%)


# SECTION 6: Importing the Inventory CSV & Base R Data Frame Inspection
# Load unit2_starter_trees.csv and inspect its structure and columns.

trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

# Inspect the table structure before doing any math
head(trees) # First 6 rows
head(trees, 3) # Up to 15 rows (shows all 10 rows in our starter file)
nrow(trees) # Number of tree records (10)
ncol(trees) # Number of columns (5)
names(trees) # Column names: "plot_id", "tree_id", "species", "dbh_cm", "height_m"
str(trees) # Structure and data type of every column

# Access a single column as a vector using '$'
trees$dbh_cm

# Apply our custom functions to the inventory column
calc_cv(trees$dbh_cm)
trees$ba_m2 <- calculate_basal_area(trees$dbh_cm) # Appends new column 'ba_m2'
head(trees)


# SECTION 7: Querying, Subsetting, and Categorising Data in Base R
# Answer specific forestry questions from the table using logical indexing.

# 1. Logical Subsetting with Square Brackets [rows, columns]
# "Show me all DBH values greater than 30 cm"
trees$dbh_cm[trees$dbh_cm > 30]

# "What are the species of the trees with DBH > 30 cm?"
trees$species[trees$dbh_cm > 30]

# "Which row number has the largest diameter tree in the inventory?"
which.max(trees$dbh_cm) # Returns row 8 (P03, T001, Shorea robusta, 45.2 cm)

# "Print the full row record of that champion tree"
trees[which.max(trees$dbh_cm), ]

# 2. Categorising Continuous Data into Factors using cut()
# Create standard forestry diameter classes: Sapling (0-10], Pole (10-30], Sawtimber (>30)
trees$size_class <- cut(
    trees$dbh_cm,
    breaks = c(0, 10, 30, Inf),
    labels = c("Sapling", "Pole", "Sawtimber")
)

# Check the data type of our new column (cut automatically creates a factor!)
class(trees$size_class)

# Instantly view the stand structure frequency table:
table(trees$size_class)


# SECTION 8: Quick Exploratory Visualisation in Base R
# Visualise diameter distribution and species differences in seconds.

# 1. Check diameter distribution shape:

# GRAPH TYPE: Histogram (Univariate Continuous Data)
# WHEN TO USE: When you have 1 continuous numeric variable (e.g., DBH, Height, BA).
# WHY USE IT:  Reveals stand structure—such as an "inverse-J" curve (many small
#              regenerating stems, few large trees), even-aged bell curves,
#              skewness, bimodal gaps, or extreme measurement outliers.
# 1A. Basic Histogram (Fast 1-second check)
hist(
    trees$dbh_cm,
    main = "Diameter Distribution",
    xlab = "DBH (cm)",
    col  = "forestgreen"
)

# 1B. Customised Histogram (Playing with bins, axis limits, labels, and reference lines)
hist(
    trees$dbh_cm,
    breaks = seq(10, 50, by = 5), # Force exact 5 cm diameter classes (bins)
    freq   = TRUE, # TRUE = counts (frequency); FALSE = probability density
    main   = "Stand Diameter Distribution with Mean & Median",
    sub    = "Bagmati Starter Inventory (n = 10 trees)",
    xlab   = "Diameter at Breast Height, DBH (cm)",
    ylab   = "Number of Stems (Frequency)",
    col    = "#2e8b57", # Sea-green hex colour
    border = "white", # Clean white border between bars
    xlim   = c(10, 50), # Explicit X-axis range
    ylim   = c(0, 5), # Explicit Y-axis range (gives headroom for labels)
    labels = TRUE, # Prints the exact tree count on top of each bar!
    las    = 1 # Keeps Y-axis numbers horizontal and easy to read
)

# Add vertical reference lines to the histogram:
abline(v = mean(trees$dbh_cm, na.rm = TRUE), col = "red", lwd = 2, lty = 2) # Dashed red mean line
abline(v = median(trees$dbh_cm, na.rm = TRUE), col = "blue", lwd = 2, lty = 3) # Dotted blue median line
legend(
    "topright",
    legend = c("Mean DBH", "Median DBH"),
    col    = c("red", "blue"),
    lwd    = 2,
    lty    = c(2, 3),
    bty    = "n" # Removes the box border around the legend
)


# 1C. Histogram + Smooth Kernel Density Curve Overlay
# WHEN TO USE: When comparing a sample's shape against a smooth theoretical distribution.
# WHY USE IT:  Smooths out awkward jumps caused by arbitrary histogram bin widths.
hist(
    trees$dbh_cm,
    freq   = FALSE, # MUST be FALSE (density scale) to overlay a density curve!
    breaks = 6,
    main   = "DBH Probability Density & Rug Plot",
    xlab   = "DBH (cm)",
    col    = "lightgreen",
    border = "darkgreen",
    las    = 1
)
lines(density(trees$dbh_cm, na.rm = TRUE), col = "darkgreen", lwd = 3) # Smooth curve
rug(trees$dbh_cm, lwd = 2, col = "black") # Adds tick marks at the bottom for every exact tree!


# 2. Compare diameter across species:

# GRAPH TYPE: Boxplot (Continuous Variable vs. Categorical Group)
# WHEN TO USE: Comparing 1 continuous variable (DBH, Height) across categorical
#              groups (Species, Plot_ID, Forest Type, Elevation Zone).
# WHY USE IT:  Shows 5 things at once: Median (centre line), Interquartile Range
#              (25th-75th percentile box = spread), Whiskers (range), and Outliers[cite: 1, 2].


# 2A. Standard Vertical Boxplot
par(mar = c(8, 4, 4, 2)) # Add bottom margin space so rotated species names fit
boxplot(
    dbh_cm ~ species,
    data = trees,
    main = "DBH Comparison by Species",
    xlab = "",
    ylab = "DBH (cm)",
    col  = "lightblue",
    las  = 2 # Rotates species labels perpendicular to the axis
)
par(mar = c(5, 4, 4, 2) + 0.1) # Reset plot margins to default

# 2B. Advanced Boxplot + Stripchart Overlay (Best for small/medium sample sizes!)
# WHY ADD STRIPCHART: A boxplot hides whether a species has 2 trees or 200 trees.
#                     Overlaying jittered points shows the exact underlying stems!
par(mar = c(5, 10, 4, 2)) # Extra LEFT margin (10) so horizontal Latin names fit easily
boxplot(
    dbh_cm ~ species,
    data       = trees,
    horizontal = TRUE, # Flip sideways so species names read naturally left-to-right!
    main       = "DBH Spread by Species (with Individual Stems)",
    xlab       = "Diameter at Breast Height, DBH (cm)",
    ylab       = "",
    col        = c("#a6cee3", "#b2df8a", "#fb9a99", "#fdbf6f"), # Distinct colour per species
    border     = "grey20",
    boxwex     = 0.6, # Controls box thickness
    staplewex  = 0.5, # Controls width of whisker end-caps
    outpch     = 19, # Solid circle for outliers (if any)
    outcol     = "red", # Colour outliers red
    varwidth   = TRUE, # Box width scales with sample size (sqrt of n)!
    las        = 1 # Horizontal axis text
)

# Overlay actual tree data points on top of the boxes:
stripchart(
    dbh_cm ~ species,
    data   = trees,
    method = "jitter", # Jitters points slightly so identical DBHs don't overlap
    jitter = 0.15,
    pch    = 19, # Solid circle points
    col    = "black",
    add    = TRUE # Draws directly on top of the existing boxplot!
)
par(mar = c(5, 4, 4, 2) + 0.1)


# 3. Explore Height-Diameter Allometry:

# GRAPH TYPE: Scatterplot (Two Continuous Variables: X vs. Y)
# WHEN TO USE: Testing how two numeric variables relate (e.g., DBH vs. Height,
#              DBH vs. Biomass, Elevation vs. Basal Area)[cite: 1, 2].
# WHY USE IT:  Reveals linear vs. nonlinear growth curves, whether variance fans
#              out for larger trees (heteroscedasticity), and data-entry errors
#              (like a 10 cm DBH tree recorded as 40 m tall)[cite: 1, 2].


# Convert species to factor to assign automatic colours and point shapes
sp_factor <- as.factor(trees$species)

plot(
    x    = trees$dbh_cm,
    y    = trees$height_m,
    main = "Height-Diameter (H-D) Allometric Relationship",
    xlab = "Diameter at Breast Height, DBH (cm)",
    ylab = "Total Tree Height (m)",
    pch  = c(15, 16, 17, 18)[sp_factor], # Different shape per species (square, circle, triangle, diamond)
    col  = c("darkgreen", "darkorange", "purple", "steelblue")[sp_factor],
    cex  = trees$dbh_cm / 15, # BUBBLE PLOT EFFECT: Point size scales with tree DBH!
    xlim = c(10, 50),
    ylim = c(10, 30),
    las  = 1,
    bty  = "L" # Clean L-shaped axis frame (removes top/right border)
)

# Add background reference grid
grid(col = "grey85", lty = "dotted")

# Add a linear regression trend line (Red dashed) and smooth LOWESS curve (Blue solid)
abline(lm(height_m ~ dbh_cm, data = trees), col = "firebrick", lwd = 2, lty = 2)
lines(lowess(trees$dbh_cm, trees$height_m), col = "navy", lwd = 2)

# Label every tree with its tree_id right on the graph
text(
    x      = trees$dbh_cm,
    y      = trees$height_m,
    labels = trees$tree_id,
    pos    = 3, # Position: 1=below, 2=left, 3=above, 4=right
    cex    = 0.75, # Text size
    col    = "grey30"
)


# Add species legend
legend(
    "topleft",
    legend = levels(sp_factor),
    col    = c("darkgreen", "darkorange", "purple", "steelblue"),
    pch    = c(15, 16, 17, 18),
    pt.cex = 1.2,
    title  = "Species",
    bty    = "n"
)


# 4. Compare Categorical Counts & Stand Totals:

# GRAPH TYPE: Barplot (Categorical Frequencies or Group Summaries)
# WHEN TO USE: Counting stems per species, stems per size class (Sapling/Pole/Sawtimber),
#              or comparing total Basal Area across Plots (P01, P02, P03)[cite: 2].
# WHY USE IT:  Bar height starts at zero, allowing immediate visual comparison of
#              abundance, dominance, or stocking across discrete categories.
#              (Note: Histograms are for continuous bins; Barplots are for categories!)


# 4A. Simple Frequency Barplot (Stems per Species)
species_counts <- table(trees$species)

bp <- barplot(
    species_counts,
    main = "Stem Abundance by Species",
    ylab = "Number of Trees",
    col = terrain.colors(length(species_counts)), # Built-in forestry terrain palette
    border = "black",
    ylim = c(0, max(species_counts) + 1.5), # Extra room at top for count numbers
    las = 1,
    cex.names = 0.85 # Slightly shrink species names so they fit
)
# Print exact counts on top of each bar using the bar midpoints saved in 'bp':
text(x = bp, y = species_counts, labels = species_counts, pos = 3, font = 2)


# 4B. Grouped vs. Stacked Barplot (Species Composition Across Plots)
# WHEN TO USE: When comparing two categorical variables at once (Plot_ID x Species)[cite: 1, 2].
plot_sp_table <- table(trees$species, trees$plot_id)

barplot(
    plot_sp_table,
    beside      = TRUE, # TRUE = side-by-side grouped bars; FALSE = stacked bars!
    main        = "Species Composition Across Sample Plots",
    xlab        = "Sample Plot ID",
    ylab        = "Stem Count",
    col         = c("#1b9e77", "#d95f02", "#7570b3", "#e7298a"),
    ylim        = c(0, 3),
    las         = 1,
    legend.text = rownames(plot_sp_table),
    args.legend = list(x = "topright", bty = "n", cex = 0.8)
)


# 5. Multi-Variable Matrix Overview:

# GRAPH TYPE: Pairs Plot / Scatterplot Matrix (All Numeric Columns at Once)
# WHEN TO USE: First 30 seconds of exploring a new dataset with 3+ numeric columns
#              (e.g., DBH, Height, Basal Area, Volume, Elevation)[cite: 1, 2].
# WHY USE IT:  Shows every pairwise relationship in one grid so you immediately
#              spot collinearity, nonlinear curves, and multi-dimensional outliers.


# Ensure basal area exists for the matrix
trees$ba_m2 <- pi * (trees$dbh_cm^2) / 40000

pairs(
    trees[, c("dbh_cm", "height_m", "ba_m2")],
    main  = "Multivariate Forestry Metric Matrix",
    pch   = 19,
    col   = c("forestgreen", "darkorange", "purple", "steelblue")[sp_factor],
    panel = panel.smooth # Automatically draws a smooth trend curve in every panel!
)


# 6. Multi-Panel Diagnostic Dashboard (Combining Graphs in One Figure):

# GRAPH TYPE: Multi-Panel Layout via par(mfrow = c(rows, cols))
# WHEN TO USE: Creating a single summary figure for a thesis or field report that
#              shows distribution, species comparison, and allometry side-by-side[cite: 1, 2].


par(mfrow = c(2, 2)) # Split plotting window into a 2x2 grid (4 graphs on 1 page)

# Panel 1: Histogram of DBH
hist(trees$dbh_cm, main = "A. DBH Distribution", xlab = "DBH (cm)", col = "forestgreen", border = "white")

# Panel 2: Histogram of Height
hist(trees$height_m, main = "B. Height Distribution", xlab = "Height (m)", col = "steelblue", border = "white")

# Panel 3: Boxplot of DBH by Plot
boxplot(dbh_cm ~ plot_id, data = trees, main = "C. DBH by Plot", xlab = "Plot ID", ylab = "DBH (cm)", col = "gold")

# Panel 4: Scatterplot of Height vs DBH
plot(trees$dbh_cm, trees$height_m, main = "D. Height vs. DBH", xlab = "DBH (cm)", ylab = "Height (m)", pch = 19, col = "darkgreen")
abline(lm(height_m ~ dbh_cm, data = trees), col = "red", lwd = 2)

par(mfrow = c(1, 1)) # Always reset layout back to 1x1 when finished!


# SECTION 9: Modern Tidyverse Workflow (readr & dplyr Pipelines)
#  Filter target species, derive tree metrics, summarise by plot, and export.


library(readr)
library(dplyr)

# 1. Import as a modern tibble
trees_tbl <- read_csv("./DATA/RAW/unit2_starter_trees.csv", show_col_types = FALSE)
print(trees_tbl)

# 2. Filtering with the %in% logical operator
target_species <- c("Shorea robusta", "Schima wallichii")

# Check which trees belong to our target species (returns a logical vector)
trees_tbl$species %in% target_species

# Extract only those rows using a dplyr pipe (|>)
target_trees <- trees_tbl |>
    filter(species %in% target_species)
print(target_trees)

# 3. Derive Tree-Level Metrics using mutate()
# - ba_m2:    Basal area in m2
# - vol_m3:   Geometric cylinder approximation in m3 (teaching example)
# - hd_ratio: Height-to-DBH slenderness ratio (m/cm)
tree_metrics <- trees_tbl |>
    mutate(
        ba_m2    = round(pi * (dbh_cm^2) / 40000, 6),
        vol_m3   = round(pi * (dbh_cm / 200)^2 * height_m, 4),
        hd_ratio = round(height_m / dbh_cm, 3)
    )

print(tree_metrics)

# 4. Export Derived Tree Metrics to CSV
# Ensure output directory exists before saving so write_csv() never fails
dir.create("./DATA/CALCULATED", recursive = TRUE, showWarnings = FALSE)
write_csv(tree_metrics, "./DATA/CALCULATED/unit2_tree_metrics.csv")
cat("Tree metrics successfully saved to: ./DATA/CALCULATED/unit2_tree_metrics.csv\n")

# 5. Aggregate from Tree-Level to Plot-Level Summary (P01, P02, P03)
plot_summary <- tree_metrics |>
    group_by(plot_id) |>
    summarise(
        tree_count   = n(),
        mean_dbh_cm  = round(mean(dbh_cm, na.rm = TRUE), 1),
        mean_ht_m    = round(mean(height_m, na.rm = TRUE), 1),
        total_ba_m2  = round(sum(ba_m2, na.rm = TRUE), 4),
        total_vol_m3 = round(sum(vol_m3, na.rm = TRUE), 3),
        .groups      = "drop"
    )

print(plot_summary)


# SECTION 10: Scaling from Plot Totals to Per-Hectare Stand Metrics
# A plot total is NOT a stand metric until we divide by Plot Area (ha)!


# Suppose each of our sample plots (P01, P02, P03) is a 0.05-hectare circular plot
plot_area_ha <- 0.05

# Convert plot-level counts and basal area to per-hectare (ha^-1) values:
# Formula: Metric_per_ha = Metric_plot / plot_area_ha (multiplying by 20 for 0.05 ha)
plot_summary_ha <- plot_summary |>
    mutate(
        plot_area_ha = plot_area_ha,
        trees_per_ha = tree_count / plot_area_ha, # Stems per hectare (TPH)
        ba_m2_ha     = round(total_ba_m2 / plot_area_ha, 2), # Basal area per hectare (m2/ha)
        vol_m3_ha    = round(total_vol_m3 / plot_area_ha, 2) # Volume per hectare (m3/ha)
    )

print(plot_summary_ha)


# SECTION 11: Loops (`for` and `while`) vs. Vectorisation
#  R vectorisation is fast for tables, but loops are essential when steps
#       happen sequentially (e.g., annual forest growth or reading 100 files).


# 1. The `for` Loop: Step through each tree in our inventory one by one
# Create an empty numeric vector to store results
loop_ba <- numeric(nrow(trees))

for (i in 1:nrow(trees)) {
    # Calculate basal area for the i-th tree
    loop_ba[i] <- pi * (trees$dbh_cm[i]^2) / 40000

    # Print a step-by-step progress log for the first 3 trees
    if (i <= 3) {
        cat(
            "Tree", trees$tree_id[i], "(", trees$species[i], ") -> BA =",
            round(loop_ba[i], 4), "m2\n"
        )
    }
}

# Verify that the loop gives the exact same answer as vectorised code:
all.equal(loop_ba, trees$ba_m2) # Returns TRUE!

# 2. The `while` Loop: Useful when you don't know how many steps it will take
# Forestry problem: A Shorea robusta tree has DBH = 20 cm and grows 0.8 cm/year.
# How many years until it reaches the harvestable sawtimber threshold of 30 cm?
current_dbh <- 20.0
years <- 0

while (current_dbh < 30.0) {
    current_dbh <- current_dbh + 0.8 # Sequential growth: depends on previous year!
    years <- years + 1
}
cat("Years to reach >= 30 cm DBH:", years, "years (Final DBH:", current_dbh, "cm)\n")


# SECTION 12: The Scalar `if` vs. Vector Logic Trap
# Show students WHY plain `if()` fails on a column, and how to fix it.


# Suppose we want to check a vector of 3 trees where one has a negative error:
sample_dbh <- c(28.4, -5.0, 31.2)

# TRAP: Scalar `if (sample_dbh <= 0)` only expects a SINGLE TRUE/FALSE value!
# Passing a vector of length 3 throws an error in modern R:
# "Error in if (sample_dbh <= 0) : the condition has length > 1"

# FIX 1: Use `any()` or `all()` inside `if()` to collapse a vector to 1 TRUE/FALSE
if (any(sample_dbh <= 0, na.rm = TRUE)) {
    cat("Guard triggered: At least one tree in the vector has DBH <= 0!\n")
}

# FIX 2: Use vectorised `ifelse()` when you want a label for EVERY row in a table
trees$audit_status <- ifelse(trees$dbh_cm > 0 & trees$dbh_cm <= 150, "Valid", "Check")
table(trees$audit_status)


# SECTION 13: Tree Volume Function & Domain of Applicability
# A formula can be mathematically valid in R but biologically wrong if
#       applied outside the tree sizes (domain) used to calibrate it!


calculate_volume_example <- function(dbh_cm, height_m) {
    # 1. Type Guard
    if (!is.numeric(dbh_cm) || !is.numeric(height_m)) {
        stop("Error: Both DBH (cm) and Height (m) must be numeric.")
    }
    # 2. Physical Guard (must be positive)
    if (any(dbh_cm <= 0, na.rm = TRUE) || any(height_m <= 0, na.rm = TRUE)) {
        stop("Error: DBH and Height must be strictly greater than zero.")
    }
    # 3. Domain-of-Applicability Guard:
    # Suppose our equation is only calibrated for DBH [10, 80 cm] and Height [5, 40 m]
    if (any(dbh_cm < 10 | dbh_cm > 80, na.rm = TRUE) ||
        any(height_m < 5 | height_m > 40, na.rm = TRUE)) {
        warning("Domain Warning: One or more trees fall outside the calibrated range (DBH: 10-80 cm, Height: 5-40 m). Extrapolating!")
    }

    # Teaching example only: Geometric cylinder approximation (m3)
    # Note: Real research must use a species- and region-specific allometric equation!
    vol_m3 <- pi * (dbh_cm / 200)^2 * height_m
    return(round(vol_m3, 4))
}

# Test within valid domain (runs silently):
calculate_volume_example(dbh_cm = 28.4, height_m = 19.2)

# Test outside calibrated domain (e.g., a 4 cm sapling triggers the domain warning!):
calculate_volume_example(dbh_cm = 4.0, height_m = 3.2)


# SECTION 14: R Lists — Storing Mixed Data Types Together
# Vectors hold 1 type; Data Frames hold equal-length columns; Lists can
#       bundle anything together (text, numbers, vectors, and whole tables!).


# Create a metadata + data bundle for Plot P01 using list()
p01_bundle <- list(
    plot_id        = "P01",
    forest_name    = "Bagmati Community Forest",
    plot_area_ha   = 0.05,
    is_permanent   = TRUE,
    measured_trees = trees[trees$plot_id == "P01", ] # Embeds a data frame inside the list!
)

# Inspect the list structure:
str(p01_bundle)

# Access list elements using '$' or double brackets '[[ ]]':
p01_bundle$forest_name
p01_bundle[["measured_trees"]]
