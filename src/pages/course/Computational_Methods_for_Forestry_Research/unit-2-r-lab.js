import * as React from "react"
import { Link } from "gatsby"
import Layout from "../../../components/layout"
import Seo from "../../../components/seo"
import "../../forestry-research.css"
import "../../forestry-lab.css"

const initialSections = [
  {
    id: "sec-1",
    num: "01",
    title: "R Objects, Assignment, & Single-Tree Arithmetic",
    desc: "Assign field measurements to R objects using '<-', inspect variables, and compute Basal Area (m²) for a single stem.",
    code: `# SECTION 1: Single-Tree Arithmetic
# Assign measurements to objects using '<-'
dbh <- 28.4      # Diameter at breast height in centimetres (cm)
height <- 19.2   # Total tree height in metres (m)

# Print values to the console
dbh
height

# Calculate Basal Area (m2) from DBH (cm)
# Formula: BA = pi * (DBH / 200)^2  OR  pi * (DBH^2) / 40000
ba <- pi * (dbh^2) / 40000
ba`,
  },
  {
    id: "sec-2",
    num: "02",
    title: "Data Types, Type Checking, & Explicit Type Casting",
    desc: "Inspect internal storage types (numeric, integer, character, logical) and avoid classic traps like 'numbers stored as text' or factor-to-numeric coercion.",
    code: `# SECTION 2: Data Types & Type Casting
# 1. Core Data Types in Forestry
dbh_num     <- 28.4                 # Numeric (double)
tree_count  <- 10L                  # Integer (L forces integer)
species_chr <- "Schima wallichii"   # Character
is_alive    <- TRUE                 # Logical

# Inspect types
class(dbh_num)
typeof(dbh_num)
is.numeric(dbh_num)

# 2. Number Stored as Text (Common Field Sheet Error)
messy_dbh <- "35.1"
clean_dbh <- as.numeric(messy_dbh)
pi * (clean_dbh^2) / 40000

# 3. Factor-to-Numeric Problem
# Factors store categorical codes. To get actual numeric values, cast to character first!
plot_codes_factor <- factor(c("101", "102", "105"))
as.numeric(plot_codes_factor)                # Returns level indices: 1 2 3
as.numeric(as.character(plot_codes_factor))  # Correct: 101 102 105`,
  },
  {
    id: "sec-3",
    num: "03",
    title: "Logical Statements & Relational Operators",
    desc: "Audit field measurements with comparison operators (>, <, ==, !=) and compound logic (&, |, !), then classify stems with conditional decision trees.",
    code: `# SECTION 3: Logical Statements & Decisions
dbh <- 28.4
height <- 19.2
species_chr <- "Schima wallichii"

# Comparison operators
dbh > 20
species_chr == "Shorea robusta"

# Merchantable timber check: DBH > 30 cm AND Height > 18 m
(dbh > 30) & (height > 18)

# Pole-sized check: DBH between 10 cm and 30 cm
(dbh >= 10) & (dbh <= 30)

# Single-stem classification
if (dbh >= 30) {
  cat("Classification: Sawtimber tree\\n")
} else if (dbh >= 10) {
  cat("Classification: Pole-sized tree\\n")
} else {
  cat("Classification: Sapling\\n")
}`,
  },
  {
    id: "sec-4",
    num: "04",
    title: "Vectors, Vectorisation, & Missing Values (NA)",
    desc: "Move from 1 tree to multiple trees simultaneously using vectorised formulas, logical ifelse(), and safe handling of missing field data.",
    code: `# SECTION 4: Vectors & Missing Values
# Vector of DBH measurements (cm)
trees_dbh <- c(28.4, 35.1, 17.8, 42.0, 22.4)

# Vectorised formula: calculates all 5 basal areas simultaneously!
trees_ba <- pi * (trees_dbh^2) / 40000
round(trees_ba, 4)

# Vectorised labeling
ifelse(trees_dbh >= 30, "Large Stem", "Small/Medium Stem")

# Handling Missing Values (NA)
heights <- c(19.2, 22.4, NA, 25.1, 17.1)
mean(heights)                # Returns NA (fails safely)
mean(heights, na.rm = TRUE)  # Removes NA: returns 20.95 m

# How many missing heights?
sum(is.na(heights))`,
  },
  {
    id: "sec-5",
    num: "05",
    title: "Defensive Functions with Vectorised Logical Guards",
    desc: "Package formulas into reusable functions with stop() and warning() guards to catch data-entry errors before computing stand metrics.",
    code: `# SECTION 5: Defensive Functions
calculate_basal_area <- function(dbh_cm) {
  # Guard 1: Type check
  if (!is.numeric(dbh_cm)) {
    stop("Error: DBH must be numeric (measured in cm)!")
  }
  # Guard 2: Biologically impossible negative or zero values
  if (any(dbh_cm <= 0, na.rm = TRUE)) {
    stop("Error: DBH must be strictly greater than 0!")
  }
  # Guard 3: Warn on possible unit errors (e.g. mm recorded instead of cm)
  if (any(dbh_cm > 150, na.rm = TRUE)) {
    warning("Warning: DBH > 150 cm detected. Did you record in mm?")
  }
  
  ba_m2 <- pi * (dbh_cm^2) / 40000
  return(ba_m2)
}

# Test valid input:
calculate_basal_area(28.4)

# Test warning guard (run with 999 cm):
calculate_basal_area(c(28.4, 999))

# Coefficient of Variation function (CV%)
calc_cv <- function(x) {
  cv <- (sd(x, na.rm = TRUE) / mean(x, na.rm = TRUE)) * 100
  return(round(cv, 2))
}
calc_cv(c(28.4, 35.1, 17.8, 42.0, 22.4))`,
  },
  {
    id: "sec-6",
    num: "06",
    title: "Importing Inventory CSV & Data Frame Inspection",
    desc: "Read the pre-mounted unit2_starter_trees.csv file from WebR's virtual filesystem and inspect table dimensions, headers, and column vectors.",
    code: `# SECTION 6: CSV Import & Inspection
# File is pre-mounted into WebR virtual disk at ./DATA/RAW/
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

# Inspect the dataset
head(trees)
nrow(trees)       # Total tree stems
ncol(trees)       # Number of attributes
names(trees)      # Column names
str(trees)        # Column types

# Apply our custom basal area function directly to the inventory column:
trees$ba_m2 <- calculate_basal_area(trees$dbh_cm)
head(trees)`,
  },
  {
    id: "sec-7",
    num: "07",
    title: "Querying, Subsetting, & Stand Categorisation",
    desc: "Extract specific subsets using boolean masks, identify champion trees with which.max(), and bin continuous diameters into factor classes using cut().",
    code: `# SECTION 7: Subsetting & Categorisation
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

# 1. Logical Subsetting
# Species with DBH > 30 cm
trees$species[trees$dbh_cm > 30]

# Champion tree (largest diameter in sample)
champion_idx <- which.max(trees$dbh_cm)
trees[champion_idx, ]

# 2. Categorise into diameter classes using cut()
trees$size_class <- cut(
  trees$dbh_cm,
  breaks = c(0, 10, 30, Inf),
  labels = c("Sapling", "Pole", "Sawtimber")
)

# Stand structure frequency table
table(trees$size_class)`,
  },
  {
    id: "sec-8a",
    num: "08A",
    title: "Exploratory Graphics: Stand Diameter Distribution Histogram",
    desc: "Render a publication-ready histogram with custom 5 cm bin widths, frequency counts, and vertical reference lines for mean and median.",
    code: `# SECTION 8A: Stand Diameter Distribution Histogram
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

hist(
  trees$dbh_cm,
  breaks = seq(10, 50, by = 5),
  freq   = TRUE,
  main   = "Stand Diameter Distribution with Mean & Median",
  sub    = "Bagmati Starter Inventory (n = 10 trees)",
  xlab   = "Diameter at Breast Height, DBH (cm)",
  ylab   = "Number of Stems (Frequency)",
  col    = "#2e8b57",
  border = "white",
  xlim   = c(10, 50),
  ylim   = c(0, 5),
  labels = TRUE,
  las    = 1
)

abline(v = mean(trees$dbh_cm, na.rm = TRUE),   col = "red",  lwd = 2, lty = 2)
abline(v = median(trees$dbh_cm, na.rm = TRUE), col = "blue", lwd = 2, lty = 3)
legend("topright", legend = c("Mean DBH", "Median DBH"), col = c("red", "blue"), lwd = 2, lty = c(2, 3), bty = "n")`,
  },
  {
    id: "sec-8b",
    num: "08B",
    title: "Exploratory Graphics: Boxplot with Jittered Stripchart",
    desc: "Compare species diameter spread with horizontal boxplots and overlay actual jittered tree measurements so sample size is visible.",
    code: `# SECTION 8B: Horizontal Boxplot + Jittered Stripchart Overlay
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

par(mar = c(5, 10, 4, 2))
boxplot(
  dbh_cm ~ species,
  data       = trees,
  horizontal = TRUE,
  main       = "DBH Spread by Species (with Individual Stems)",
  xlab       = "Diameter at Breast Height, DBH (cm)",
  ylab       = "",
  col        = c("#a6cee3", "#b2df8a", "#fb9a99", "#fdbf6f"),
  border     = "grey20",
  boxwex     = 0.6,
  las        = 1
)

# Overlay exact stems using stripchart
stripchart(
  dbh_cm ~ species,
  data   = trees,
  method = "jitter",
  jitter = 0.15,
  pch    = 19,
  col    = "black",
  add    = TRUE
)
par(mar = c(5, 4, 4, 2) + 0.1)`,
  },
  {
    id: "sec-8c",
    num: "08C",
    title: "Exploratory Graphics: Height-Diameter Allometry Bubble Plot",
    desc: "Plot height against diameter with point sizes proportional to DBH, fitted regression trendlines, and individual stem ID labels.",
    code: `# SECTION 8C: Height-Diameter Allometric Relationship
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")
sp_factor <- as.factor(trees$species)

plot(
  x    = trees$dbh_cm,
  y    = trees$height_m,
  main = "Height-Diameter (H-D) Allometric Relationship",
  xlab = "Diameter at Breast Height, DBH (cm)",
  ylab = "Total Tree Height (m)",
  pch  = c(15, 16, 17, 18)[sp_factor],
  col  = c("darkgreen", "darkorange", "purple", "steelblue")[sp_factor],
  cex  = trees$dbh_cm / 15,
  xlim = c(10, 50),
  ylim = c(10, 30),
  las  = 1,
  bty  = "L"
)

grid(col = "grey85", lty = "dotted")
abline(lm(height_m ~ dbh_cm, data = trees), col = "firebrick", lwd = 2, lty = 2)
lines(lowess(trees$dbh_cm, trees$height_m), col = "navy", lwd = 2)

text(x = trees$dbh_cm, y = trees$height_m, labels = trees$tree_id, pos = 3, cex = 0.75, col = "grey30")
legend("topleft", legend = levels(sp_factor), col = c("darkgreen", "darkorange", "purple", "steelblue"), pch = c(15, 16, 17, 18), title = "Species", bty = "n")`,
  },
  {
    id: "sec-8d",
    num: "08D",
    title: "Exploratory Graphics: Stem Abundance Barplot",
    desc: "Calculate species frequency counts and plot clear categorical bars with exact stem tallies printed above each bar.",
    code: `# SECTION 8D: Stem Abundance Barplot
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")
species_counts <- table(trees$species)

bp <- barplot(
  species_counts,
  main   = "Stem Abundance by Species",
  ylab   = "Number of Trees",
  col    = terrain.colors(length(species_counts)),
  border = "black",
  ylim   = c(0, max(species_counts) + 1.5),
  las    = 1,
  cex.names = 0.85
)

# Print exact counts on top of bars
text(x = bp, y = species_counts, labels = species_counts, pos = 3, font = 2)`,
  },
  {
    id: "sec-8e",
    num: "08E",
    title: "Exploratory Graphics: Multivariate Pairs Matrix",
    desc: "Inspect all continuous pairwise relationships at once (DBH, Height, Basal Area) with species-colored points and smooth LOESS curves.",
    code: `# SECTION 8E: Multivariate Forestry Metric Matrix
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")
trees$ba_m2 <- pi * (trees$dbh_cm^2) / 40000
sp_factor <- as.factor(trees$species)

pairs(
  trees[, c("dbh_cm", "height_m", "ba_m2")],
  main  = "Multivariate Forestry Metric Matrix",
  pch   = 19,
  col   = c("forestgreen", "darkorange", "purple", "steelblue")[sp_factor],
  panel = panel.smooth
)`,
  },
  {
    id: "sec-8f",
    num: "08F",
    title: "Exploratory Graphics: 2x2 Multi-Panel Diagnostic Dashboard",
    desc: "Split the graphics device into a 2x2 grid using par(mfrow = c(2, 2)) to synthesize distributions, plot differences, and allometry in one figure.",
    code: `# SECTION 8F: 2x2 Multi-Panel Diagnostic Dashboard
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

par(mfrow = c(2, 2))

# Panel 1: Histogram of DBH
hist(trees$dbh_cm, main = "A. DBH Distribution", xlab = "DBH (cm)", col = "forestgreen", border = "white")

# Panel 2: Histogram of Height
hist(trees$height_m, main = "B. Height Distribution", xlab = "Height (m)", col = "steelblue", border = "white")

# Panel 3: Boxplot of DBH by Plot
boxplot(dbh_cm ~ plot_id, data = trees, main = "C. DBH by Plot", xlab = "Plot ID", ylab = "DBH (cm)", col = "gold")

# Panel 4: Scatterplot of Height vs DBH
plot(trees$dbh_cm, trees$height_m, main = "D. Height vs. DBH", xlab = "DBH (cm)", ylab = "Height (m)", pch = 19, col = "darkgreen")
abline(lm(height_m ~ dbh_cm, data = trees), col = "red", lwd = 2)

par(mfrow = c(1, 1)) # Reset to default`,
  },
  {
    id: "sec-9",
    num: "09",
    title: "Modern Tidyverse Workflow: Filter, Mutate, & Summarise",
    desc: "Use the modern native pipe (|>) to filter species, derive tree metrics (BA, volume, slenderness ratio), and aggregate stand summaries by plot.",
    code: `# SECTION 9: Tidyverse Workflow
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

# Base R pipeline equivalent for standalone execution
target_species <- c("Shorea robusta", "Schima wallichii")

# Filter target species
target_trees <- subset(trees, species %in% target_species)
print(target_trees)

# Derive metrics: Basal Area (m2), Volume approximation (m3), and Slenderness Ratio (m/cm)
trees$ba_m2    <- round(pi * (trees$dbh_cm^2) / 40000, 6)
trees$vol_m3   <- round(pi * (trees$dbh_cm / 200)^2 * trees$height_m, 4)
trees$hd_ratio <- round(trees$height_m / trees$dbh_cm, 3)

head(trees[, c("tree_id", "species", "ba_m2", "vol_m3", "hd_ratio")])

# Aggregate by plot
plot_summary <- aggregate(
  cbind(ba_m2, vol_m3) ~ plot_id,
  data = trees,
  FUN  = sum
)
print(plot_summary)`,
  },
  {
    id: "sec-10",
    num: "10",
    title: "Scaling from Plot Totals to Per-Hectare Stand Metrics",
    desc: "Convert raw sample plot counts and basal areas to per-hectare stand metrics (Trees Per Hectare, BA/ha, Volume/ha) based on plot radius area.",
    code: `# SECTION 10: Per-Hectare Stand Metrics
# Suppose each sample plot is a 0.05-hectare circular plot
plot_area_ha <- 0.05
expansion_factor <- 1 / plot_area_ha # Each tree in plot represents 20 trees/ha!

trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")
trees$ba_m2 <- pi * (trees$dbh_cm^2) / 40000
trees$vol_m3 <- pi * (trees$dbh_cm / 200)^2 * trees$height_m

# Plot-level totals
plot_counts <- table(trees$plot_id)
plot_ba     <- tapply(trees$ba_m2, trees$plot_id, sum)
plot_vol    <- tapply(trees$vol_m3, trees$plot_id, sum)

# Per-hectare expansion:
tph_ha   <- as.numeric(plot_counts) * expansion_factor
ba_ha    <- round(as.numeric(plot_ba) * expansion_factor, 2)
vol_ha   <- round(as.numeric(plot_vol) * expansion_factor, 2)

stand_metrics <- data.frame(
  plot_id      = names(plot_counts),
  stem_count   = as.numeric(plot_counts),
  trees_per_ha = tph_ha,
  ba_m2_ha     = ba_ha,
  vol_m3_ha    = vol_ha
)

print(stand_metrics)`,
  },
  {
    id: "sec-11",
    num: "11",
    title: "Loops (for & while) vs. Vectorisation",
    desc: "Compare iterative for-loops against vectorised formulas, and use while-loops to simulate sequential tree growth over time.",
    code: `# SECTION 11: Loops vs. Vectorisation
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

# 1. 'for' Loop: Step through trees one-by-one
loop_ba <- numeric(nrow(trees))
for (i in 1:nrow(trees)) {
  loop_ba[i] <- pi * (trees$dbh_cm[i]^2) / 40000
  if (i <= 3) {
    cat("Tree", trees$tree_id[i], "(", trees$species[i], ") -> BA =", round(loop_ba[i], 4), "m2\\n")
  }
}

# 2. 'while' Loop: Sequential growth simulation
# How many years until a 20 cm Shorea robusta growing 0.8 cm/yr reaches sawtimber (>= 30 cm)?
current_dbh <- 20.0
years <- 0

while (current_dbh < 30.0) {
  current_dbh <- current_dbh + 0.8
  years <- years + 1
}

cat("Years to reach >= 30 cm DBH:", years, "years (Final DBH:", current_dbh, "cm)\\n")`,
  },
  {
    id: "sec-12",
    num: "12",
    title: "The Scalar 'if' vs. Vector Logic Trap",
    desc: "Understand why standard if() fails on data columns, and how to fix it using any(), all(), or vectorised ifelse().",
    code: `# SECTION 12: Scalar 'if' vs Vector Logic
sample_dbh <- c(28.4, -5.0, 31.2)

# FIX 1: Use any() to collapse vector into 1 TRUE/FALSE guard
if (any(sample_dbh <= 0, na.rm = TRUE)) {
  cat("Guard triggered: At least one tree in the vector has DBH <= 0!\\n")
}

# FIX 2: Use vectorised ifelse() for column-wide classification
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")
trees$audit_status <- ifelse(trees$dbh_cm > 0 & trees$dbh_cm <= 150, "Valid", "Check")
table(trees$audit_status)`,
  },
  {
    id: "sec-13",
    num: "13",
    title: "Tree Volume Function & Domain of Applicability",
    desc: "Build a volume function with biological domain guards that stops on invalid values and warns against dangerous model extrapolation.",
    code: `# SECTION 13: Volume & Domain of Applicability
calculate_volume_example <- function(dbh_cm, height_m) {
  # 1. Type Guard
  if (!is.numeric(dbh_cm) || !is.numeric(height_m)) {
    stop("Error: Both DBH (cm) and Height (m) must be numeric.")
  }
  # 2. Physical Guard
  if (any(dbh_cm <= 0, na.rm = TRUE) || any(height_m <= 0, na.rm = TRUE)) {
    stop("Error: DBH and Height must be strictly greater than zero.")
  }
  # 3. Domain Guard (Calibrated range: DBH [10, 80 cm], Height [5, 40 m])
  if (any(dbh_cm < 10 | dbh_cm > 80, na.rm = TRUE) ||
      any(height_m < 5 | height_m > 40, na.rm = TRUE)) {
    warning("Domain Warning: Tree falls outside calibrated range (DBH 10-80cm, Ht 5-40m). Extrapolating!")
  }
  
  vol_m3 <- pi * (dbh_cm / 200)^2 * height_m
  return(round(vol_m3, 4))
}

# Valid domain execution:
calculate_volume_example(dbh_cm = 28.4, height_m = 19.2)

# Outside calibrated domain (4 cm sapling triggers domain warning):
calculate_volume_example(dbh_cm = 4.0, height_m = 3.2)`,
  },
  {
    id: "sec-14",
    num: "14",
    title: "R Lists: Storing Mixed Data Types & Objects Together",
    desc: "Bundle plot metadata, GPS coordinates, flags, and entire tree inventory subsets into a single flexible hierarchical R list object.",
    code: `# SECTION 14: R Lists
trees <- read.csv("./DATA/RAW/unit2_starter_trees.csv")

# Create a metadata + data bundle for Plot P01
p01_bundle <- list(
  plot_id        = "P01",
  forest_name    = "Bagmati Community Forest",
  plot_area_ha   = 0.05,
  is_permanent   = TRUE,
  measured_trees = trees[trees$plot_id == "P01", ]
)

# Inspect structure
str(p01_bundle)

# Access elements using '$' or '[[]]'
p01_bundle$forest_name
p01_bundle[["measured_trees"]]`,
  },
]

const Unit2RLabPage = ({ location }) => {
  const [engineState, setEngineState] = React.useState("uninitialized") // 'uninitialized' | 'loading' | 'ready' | 'error'
  const [statusMessage, setStatusMessage] = React.useState("Click 'Activate R Engine' or run any block to start.")
  const [activeRunningId, setActiveRunningId] = React.useState(null)
  const [sectionCodes, setSectionCodes] = React.useState(() => {
    const map = {}
    initialSections.forEach(s => {
      map[s.id] = s.code
    })
    return map
  })
  const [sectionOutputs, setSectionOutputs] = React.useState({})
  const webrRef = React.useRef(null)
  const initPromiseRef = React.useRef(null)

  // Initialize WebR on demand
  const initWebR = React.useCallback(async () => {
    if (webrRef.current) return webrRef.current
    if (initPromiseRef.current) return initPromiseRef.current

    if (typeof window === "undefined") return null

    initPromiseRef.current = (async () => {
      try {
        setEngineState("loading")
        setStatusMessage("Downloading WebAssembly R binary (~18MB from official CDN)...")

        // Dynamic native import bypassing Webpack bundling
        const dynamicImporter = new Function(
          "url",
          "return import(/* webpackIgnore: true */ url)"
        )
        const { WebR } = await dynamicImporter(
          "https://webr.r-wasm.org/latest/webr.mjs"
        )

        setStatusMessage("Initializing background R WebAssembly worker...")
        const instance = new WebR()
        await instance.init()

        setStatusMessage("Mounting virtual datasets (unit2_starter_trees.csv)...")
        try {
          await instance.FS.mkdir("/DATA", { recursive: true })
          await instance.FS.mkdir("/DATA/RAW", { recursive: true })
          await instance.FS.mkdir("/DATA/CALCULATED", { recursive: true })
          await instance.FS.mkdir("/home/web_user/DATA", { recursive: true })
          await instance.FS.mkdir("/home/web_user/DATA/RAW", { recursive: true })
          await instance.FS.mkdir("/home/web_user/DATA/CALCULATED", { recursive: true })

          const resStarter = await fetch(
            "/course/Computational_Methods_for_Forestry_Research/Unit-II/unit2_starter_trees.csv"
          )
          if (resStarter.ok) {
            const csvText = await resStarter.text()
            await instance.FS.writeFile("/DATA/RAW/unit2_starter_trees.csv", csvText)
            await instance.FS.writeFile("/home/web_user/DATA/RAW/unit2_starter_trees.csv", csvText)
            await instance.FS.writeFile("/unit2_starter_trees.csv", csvText)
            await instance.FS.writeFile("/home/web_user/unit2_starter_trees.csv", csvText)
          }

          const resBagmati = await fetch(
            "/course/Computational_Methods_for_Forestry_Research/Unit-II/bagmati_raw_inventory.csv"
          )
          if (resBagmati.ok) {
            const bagmatiText = await resBagmati.text()
            await instance.FS.writeFile("/DATA/RAW/bagmati_raw_inventory.csv", bagmatiText)
            await instance.FS.writeFile("/home/web_user/DATA/RAW/bagmati_raw_inventory.csv", bagmatiText)
            await instance.FS.writeFile("/bagmati_raw_inventory.csv", bagmatiText)
            await instance.FS.writeFile("/home/web_user/bagmati_raw_inventory.csv", bagmatiText)
          }

          await instance.evalRVoid('setwd("/")')
        } catch (fsErr) {
          console.warn("Virtual FS setup notice:", fsErr)
        }

        webrRef.current = instance
        setEngineState("ready")
        setStatusMessage("R 4.3 WebAssembly Engine Ready · Virtual Filesystem Mounted (/DATA/RAW/)")
        return instance
      } catch (err) {
        console.error("WebR init error:", err)
        setEngineState("error")
        setStatusMessage(`Engine Error: ${err.message || String(err)}`)
        throw err
      } finally {
        initPromiseRef.current = null
      }
    })()

    return initPromiseRef.current
  }, [])

  const handleRunCode = async (sectionId) => {
    setActiveRunningId(sectionId)
    const startTime = Date.now()

    try {
      let webr = webrRef.current
      if (!webr) {
        webr = await initWebR()
      }

      const code = sectionCodes[sectionId]
      const shelter = await new webr.Shelter()

      try {
        const capture = await shelter.captureR(code, {
          withAutoprint: true,
          captureStreams: true,
          captureConditions: true,
        })

        const elapsed = Date.now() - startTime
        let textOutput = ""
        if (capture.output && capture.output.length > 0) {
          textOutput = capture.output.map(item => item.data).join("\n")
        } else {
          textOutput = "(Executed successfully with no console output)"
        }

        const images = []
        if (capture.images && capture.images.length > 0) {
          for (const img of capture.images) {
            const canvas = document.createElement("canvas")
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext("2d")
            ctx.drawImage(img, 0, 0)
            images.push(canvas.toDataURL("image/png"))
          }
        }

        setSectionOutputs(prev => ({
          ...prev,
          [sectionId]: {
            output: textOutput,
            images,
            error: null,
            time: elapsed,
          },
        }))
      } catch (runErr) {
        setSectionOutputs(prev => ({
          ...prev,
          [sectionId]: {
            output: null,
            images: [],
            error: runErr.message || String(runErr),
            time: Date.now() - startTime,
          },
        }))
      } finally {
        await shelter.purge()
      }
    } catch (err) {
      setSectionOutputs(prev => ({
        ...prev,
        [sectionId]: {
          output: null,
          images: [],
          error: `Engine execution failed: ${err.message || String(err)}`,
          time: Date.now() - startTime,
        },
      }))
    } finally {
      setActiveRunningId(null)
    }
  }

  const handleResetCode = (sectionId, originalCode) => {
    setSectionCodes(prev => ({ ...prev, [sectionId]: originalCode }))
  }

  const handleResetSession = async () => {
    if (!webrRef.current) return
    try {
      await webrRef.current.evalRVoid("rm(list = ls(all.names = TRUE))")
      setStatusMessage("R session environment cleared (.GlobalEnv reset).")
    } catch (err) {
      console.warn("Reset session notice:", err)
    }
  }

  return (
    <Layout location={location} title="Unit II: R Interactive Coding Lab">
      <Seo
        title="Unit II Interactive R Coding Lab · Computational Methods for Forestry Research"
        description="Run live R code directly in your browser without installation. Practice single-tree basal area math, data structures, defensive guards, starter inventory queries, and publication-ready forestry plots."
      />

      <div className="forestry-lab-container">
        <div className="forestry-lab-nav">
          <Link
            to="/course/Computational_Methods_for_Forestry_Research/"
            className="forestry-lab-back-link"
          >
            ← Back to Course Syllabus
          </Link>
          <span className="forestry-lab-meta-tag">
            Tribhuvan University · M.Sc. Forestry
          </span>
        </div>

        <header className="forestry-lab-header">
          <div className="forestry-lab-meta">Interactive Computational Lab</div>
          <h1 className="forestry-lab-title">
            Unit II: In-Browser R Coding Lab &amp; Sandbox
          </h1>
          <p className="forestry-lab-subtitle">
            Execute real R code directly in your browser powered by WebAssembly (WebR).
            Experiment with tree-level calculations, data type audits, defensive functions,
            live inventory queries, and publication plots without local setup.
          </p>
        </header>

        {/* Engine Status Banner */}
        <div className="forestry-lab-status-card">
          <div className="forestry-lab-status-left">
            <span
              className={`forestry-lab-status-dot is-${engineState}`}
              aria-hidden="true"
            />
            <div>
              <p className="forestry-lab-status-title">
                {engineState === "ready" && "WebAssembly R Engine Active"}
                {engineState === "loading" && "Initializing WebAssembly R Engine..."}
                {engineState === "uninitialized" && "WebAssembly R Engine Standby"}
                {engineState === "error" && "WebAssembly R Engine Error"}
              </p>
              <p className="forestry-lab-status-desc">{statusMessage}</p>
            </div>
          </div>

          <div className="forestry-lab-status-actions">
            {engineState === "uninitialized" && (
              <button
                type="button"
                className="forestry-lab-btn-primary"
                onClick={initWebR}
              >
                ⚡ Activate R Engine
              </button>
            )}
            {engineState === "ready" && (
              <button
                type="button"
                className="forestry-lab-btn-secondary"
                onClick={handleResetSession}
                title="Clears all user objects from R .GlobalEnv"
              >
                ⟲ Clear .GlobalEnv
              </button>
            )}
          </div>
        </div>

        {/* Quick Navigation Pills */}
        <div className="forestry-lab-toc-bar">
          <div className="forestry-lab-toc-label">Quick Jump to Module</div>
          <div className="forestry-lab-toc-pills">
            {initialSections.map(sec => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="forestry-lab-toc-pill"
              >
                {sec.num}. {sec.title.split(":")[0]}
              </a>
            ))}
          </div>
        </div>

        {/* 14 Interactive Sandbox Modules */}
        <div className="forestry-lab-modules">
          {initialSections.map(sec => {
            const isRunning = activeRunningId === sec.id
            const result = sectionOutputs[sec.id]
            const currentCode = sectionCodes[sec.id]

            return (
              <section key={sec.id} id={sec.id} className="forestry-lab-section">
                <div className="forestry-lab-section-header">
                  <span className="forestry-lab-section-badge">
                    Module {sec.num}
                  </span>
                  <h3 className="forestry-lab-section-title">{sec.title}</h3>
                  <p className="forestry-lab-section-desc">{sec.desc}</p>
                </div>

                <div className="forestry-lab-editor-box">
                  <div className="forestry-lab-editor-bar">
                    <span className="forestry-lab-editor-lang">R 4.3 Script</span>
                    <span className="forestry-lab-editor-hint">
                      Edit code freely · Press Cmd+Enter to Run
                    </span>
                  </div>
                  <textarea
                    className="forestry-lab-textarea"
                    value={currentCode}
                    onChange={e => {
                      const val = e.target.value
                      setSectionCodes(prev => ({ ...prev, [sec.id]: val }))
                    }}
                    onKeyDown={e => {
                      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                        e.preventDefault()
                        handleRunCode(sec.id)
                      }
                    }}
                    rows={Math.max(6, currentCode.split("\n").length + 1)}
                    spellCheck="false"
                  />
                </div>

                <div className="forestry-lab-controls">
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button
                      type="button"
                      className="forestry-lab-run-btn"
                      onClick={() => handleRunCode(sec.id)}
                      disabled={isRunning}
                    >
                      {isRunning ? "⏳ Running..." : "▶ Run Code (Cmd+Enter)"}
                    </button>
                    <button
                      type="button"
                      className="forestry-lab-reset-btn"
                      onClick={() => handleResetCode(sec.id, sec.code)}
                      title="Reset snippet to original lecture code"
                    >
                      ⟲ Reset Snippet
                    </button>
                  </div>

                  {result?.time && (
                    <span className="forestry-lab-meta-tag">
                      Completed in {result.time} ms
                    </span>
                  )}
                </div>

                {/* Console Output Drawer */}
                {result && (
                  <div className="forestry-lab-output">
                    <div className="forestry-lab-output-header">
                      <span className="forestry-lab-output-title">
                        R Console Output
                      </span>
                      <button
                        type="button"
                        className="forestry-lab-reset-btn"
                        style={{ fontSize: "0.68rem", padding: "2px 8px" }}
                        onClick={() =>
                          setSectionOutputs(prev => ({ ...prev, [sec.id]: null }))
                        }
                      >
                        Clear
                      </button>
                    </div>

                    {result.output && (
                      <pre className="forestry-lab-output-pre">
                        <code>{result.output}</code>
                      </pre>
                    )}

                    {result.error && (
                      <pre className="forestry-lab-output-pre forestry-lab-output-error">
                        <code>{result.error}</code>
                      </pre>
                    )}

                    {/* Plots Canvas */}
                    {result.images && result.images.length > 0 && (
                      <div className="forestry-lab-plot-card">
                        {result.images.map((dataUrl, idx) => (
                          <div key={idx} style={{ marginBottom: "16px" }}>
                            <img
                              src={dataUrl}
                              alt={`R Plot Generated by Module ${sec.num}`}
                              className="forestry-lab-plot-img"
                            />
                            <p className="forestry-lab-plot-caption">
                              Graphics Device Output {idx + 1} of {result.images.length} · Right-click or drag to save
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Unit2RLabPage
