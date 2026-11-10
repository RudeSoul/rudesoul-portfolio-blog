# Unit VIII Capstone Project Briefs & Disclosure Protocol
Institute of Forestry (IOF), Tribhuvan University

This capstone integrates field inventory, allometric modeling, remote sensing, and research packaging into a cohesive research deliverable.

---

## 1. Capstone Research Briefs

### Brief A: Allometric Carbon Stocks & Correction Bias
* **Core Research Question**: How does above-ground biomass vary between Shivapuri (`S01`) and Phulchowki (`S02`) stands, and what magnitude of systematic underestimation occurs if Baskerville logarithmic back-transformation bias is ignored?
* **Required Deliverables**:
  - Species-specific height-diameter curves for dominant species (*Schima wallichii*, *Castanopsis indica*).
  - Comparison of naive vs. bias-corrected plot-level carbon stock estimates (Mg C / ha).
  - Stand-level summary tables formatted for peer-reviewed publication.
* **Key Datasets**: `bagmati_clean_inventory.csv`, `plot_information.csv`

---

### Brief B: Elevational Turnover & Community Ecology
* **Core Research Question**: How do species richness ($S$), diversity ($H'$, $1-D$), and community turnover (Bray–Curtis dissimilarity) shift across the low-, mid-, and high-elevation zones of Bagmati Province?
* **Required Deliverables**:
  - Species-by-plot abundance matrix.
  - 2D NMDS ordination with environmental vector overlays (elevation, slope).
  - Ecological interpretation of dominant species transitions along the valley rim.
* **Key Datasets**: `bagmati_species_by_plot_matrix.csv`, `05_plot_diversity_metrics.csv`

---

### Brief C: Multi-Sensor Forest Structure Integration
* **Core Research Question**: How strongly does field-measured basal area (`BA_m2_ha`) correlate with airborne LiDAR canopy height (`Mean_CHM_m`) and satellite optical greenness (Sentinel-2 `NDVI`)?
* **Required Deliverables**:
  - Metric buffer GIS workflow (UTM Zone 45N).
  - Scatter plots and regression models evaluating LiDAR CHM vs. field basal area.
  - Multi-sensor summary table and discussion of saturation limits in dense subtropical canopies.
* **Key Datasets**: `bagmati_landscape_master.csv`, `bagmati_dem.tif`, `bagmati_sample.las`

---

## 2. Research Disclosure & Verification Log

When using AI tools (e.g. Gemini, ChatGPT, Claude) during your coding or analysis, record prompts and validations in your project README:

| Date | Tool | Purpose | Key Prompt | Output Summary | Modifications Made | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-11-10 | Gemini | Function syntax | "R vectorised basal area formula" | Standard base R function | Adapted for cm units and NA handling | Compared output with manual calculation on 3 trees |

