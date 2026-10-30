# Homework Assignment: Unit II — Forensic Data Screening & Exploratory Analysis in Base R

* **Course:** Computational Methods for Forestry Research (M.Sc. Forestry, Tribhuvan University - IOF)
* **Dataset:** `data/raw/bagmati_raw_inventory.csv`
* **Deadline:** **Sunday, November 1, 2026, before 10:00 AM sharp**
* **Submission Format:** GitHub Pull Request link sent to the class WhatsApp group.

---

### Academic Integrity & Scope Policy
* **Strict Base R Only:** This course focuses on mastering core computational fundamentals. The use of `dplyr`, `tidyverse`, `tibble`, or pipe operators (`%>%`, `|>`) is **strictly prohibited**. Submissions containing these packages will automatically receive **0%** for Base R Logic.
* **Console Verification:** Generic AI language models do not have access to your local survey data, frequently hallucinate column names, miss case-sensitive indexing, and fail forensic data checks. All metrics, counts, and diagnostic values must be derived and verified directly in your R console using the raw CSV dataset.
* **Exact Console Verification:** You must use `cat()` or `print()` to output the exact numeric values requested in each task.

---

### Submission Protocol (Follow Strictly)
Do **NOT** commit directly to the `main` branch. Follow these steps:
1. Open your terminal / Git Bash inside your project directory.
2. Create and switch to a new branch named with your **Firstname_Lastname_Date**:
   ```bash
   git checkout -b firstname_lastname_2026_11_01
   ```
   *(Example: `git checkout -b ram_shrestha_2026_11_01`)*
3. Create your script in the `scripts/` folder named `homework_unit2_firstname_lastname.R`.
4. Solve all tasks below with clear comments and exact output messages using `cat()` or `print()`.
5. Stage and commit your script:
   ```bash
   git add scripts/homework_unit2_firstname_lastname.R
   git commit -m "feat: complete unit 2 forensic data analysis and visualization homework"
   ```
6. Push your branch to your GitHub repository:
   ```bash
   git push -u origin firstname_lastname_2026_11_01
   ```
7. Go to your repository on GitHub in your web browser:
   * Click **Compare & pull request** (target: `main` branch).
   * Title your PR: `[Homework Submission] Unit II - Firstname Lastname`.
   * Submit the Pull Request.
8. **Copy the link/URL of that open Pull Request** and paste it into the class WhatsApp group before Sunday 10:00 AM.

---

## Assignment Tasks

### Part 1: Data Ingestion & Structural Inspection
1. Load `data/raw/bagmati_raw_inventory.csv` into an object named `inv` using `read.csv()`.
2. Inspect the dataset:
   * How many total tree rows and how many columns are there? Print exact counts with `nrow()` and `ncol()`.
   * Print all column names with `names()`. Note the exact case-sensitivity of each column.
   * Inspect the internal structure and storage types of each column using `str()`.
3. Check the specific data type and storage mode of `DBH_cm` and `Species` using `class()` and `typeof()`.

---

### Part 2: Forensic Data Auditing & Missing Values
Raw forestry survey sheets frequently contain transcription errors and protocol sentinel codes. Write Base R code to audit the following:
1. **Missing Data (`NA`):** 
   * How many explicit `NA` values exist in `DBH_cm`? How many in `Height_m`? Print exact counts using `is.na()` and `sum()`.
2. **Protocol Missing Codes (`-99` and `999`):**
   * Field crews often record `-99` or `999` when a measurement cannot be taken. How many trees have `DBH_cm == -99`? How many have `DBH_cm == 999`?
   * How many trees have `Height_m == -99`?
3. **Biological Boundary Violations:**
   * Are there any trees with non-positive diameters ($DBH \le 0$)? Use logical comparison and `sum(..., na.rm = TRUE)` to report the exact count.
4. **The Plot P17 Field Sheet Transcription Case:**
   * Query tree `Tree_ID == "T203"` in Plot `"P17"` using bracket row indexing:
     ```r
     inv[inv$Plot_ID == "P17" & inv$Tree_ID == "T203", ]
     ```
   * Its recorded DBH is `999 cm`, despite a measured tree height of `21.3 m`. Is a 10-metre diameter tree biologically possible in this forest stand?
   * The physical field note confirms the scribe recorded `999` as a transcription error instead of the measured value. The audit log confirms the true measured diameter was **`29.9 cm`**. Assign this corrected DBH value to tree T203 in your dataset.
5. **Millimetre Entry Errors:**
   * A common field crew error in Nepal forestry is recording caliper measurements in millimetres instead of centimetres. Identify trees with $DBH > 150\text{ cm}$ and $DBH < 900\text{ cm}$.
   * Write a relational query to report the exact number of stems affected by this error.
   * Correct these rows by dividing their DBH values by 10. *(Caution: ensure missing values in your indexing expression do not trigger runtime assignment errors!)*

---

### Part 3: Logical Subsetting & Ecological Queries
*Create a clean working subset `inv_clean` excluding records where DBH is missing (`NA`), non-positive ($\le 0$), or sentinel codes (-99, 999).*

1. **Size Classes via `cut()`:**
   * Create a new factor column in `inv_clean` named `size_class` categorizing tree diameters into:
     * **Sapling:** $(0, 10]\text{ cm}$
     * **Pole:** $(10, 30]\text{ cm}$
     * **Sawtimber:** $> 30\text{ cm}$
   * Generate a frequency table using `table(inv_clean$size_class)`. Report the exact stem count in each category. Which diameter class dominates the stand?
2. **Finding the Champion Tree (`which.max`):**
   * Which row number in your clean dataset holds the true biological champion tree (largest valid diameter)?
   * Print that champion tree's full record (`Plot_ID`, `Tree_ID`, `Species`, `DBH_cm`, `Height_m`).
   * *(Warning: If your output reports a DBH of 999 cm or 343 cm, you failed to screen sentinel codes or correct millimetre entries before searching!)*
3. **Target Species Subsetting:**
   * How many *Shorea robusta* (Sal) trees exist in the clean inventory?
   * What is the mean DBH of *Shorea robusta* trees? *(Remember `na.rm = TRUE`!)*

---

### Part 4: Defensive Functions & Stand Variability
1. **Basal Area Calculation:**
   * Write or reuse your defensive `calculate_basal_area(dbh_cm)` function (ensuring it stops on $DBH \le 0$ and warns on $DBH > 150$).
   * Calculate basal area for all trees in `inv_clean` and store it in a new column `inv_clean$ba_m2`.
   * What is the **total basal area ($\text{m}^2$)** of all valid trees across the inventory? Report to 4 decimal places.
2. **Coefficient of Variation ($CV\%$):**
   * Write your custom `calc_cv()` function:
     $$CV\% = \frac{sd(x, \text{na.rm = TRUE})}{mean(x, \text{na.rm = TRUE})} \times 100$$
   * Calculate the $CV\%$ of `DBH_cm` across all measured trees. Does the stand show low ($<20\%$) or high ($>30\%$) structural variability?
3. **Testing Model Domain Boundaries:**
   * Call `calculate_volume_example(dbh_cm, height_m)` on:
     * **Tree A:** $DBH = 32.4\text{ cm}$, $Height = 22.1\text{ m}$
     * **Tree B:** $DBH = 6.5\text{ cm}$, $Height = 4.2\text{ m}$
   * What happens when you run Tree B? Explain in a code comment what warning was triggered and why domain guards are necessary in allometric forestry equations.

---

### Part 5: Exploratory Visualisation in Base R
Generate and save a 2-by-2 multi-panel diagnostic graph into your `figures/` directory as `figures/homework_unit2_diagnostics.png`:
```r
png("figures/homework_unit2_diagnostics.png", width = 1200, height = 1000, res = 150)
par(mfrow = c(2, 2))

# 1. Histogram of DBH_cm with a dashed red line for the mean
# 2. Histogram of Height_m with a dashed blue line for the median
# 3. Boxplot of DBH_cm comparing the 4 stands (Stand_ID)
# 4. Scatterplot of DBH_cm (X-axis) vs Height_m (Y-axis) with a trendline using abline(lm(...))

par(mfrow = c(1, 1))
dev.off()
```

---

### Grading Rubric (Evaluation Breakdown)
* **40% Base R Logic:** Proper handling of `NA`, `na.rm = TRUE`, bracket indexing `[,]`, and defensive guards. Zero points if external packages (`dplyr`, `tidyverse`) or pipes are used.
* **25% Forensic Cleaning:** Accurately identifying and auditing sentinel codes (-99, 999), resolving the P17/T203 transcription error, and fixing millimetre-to-centimetre caliper records.
* **20% Figure Export:** Successfully generating and exporting the 2x2 multi-panel Base R diagnostic plot to `figures/homework_unit2_diagnostics.png`.
* **15% Git Discipline:** Accurate branch naming format (`firstname_lastname_YYYY_MM_DD`), informative commit messages, and a clean Pull Request submitted to `main`.
