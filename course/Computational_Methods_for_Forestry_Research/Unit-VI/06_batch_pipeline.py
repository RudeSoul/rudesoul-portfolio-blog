# Unit 6: Batch Automation & Quality-Control Logging with Python
# Iterating over 100 forest inventory plot CSVs using pathlib and pandas

from pathlib import Path
import numpy as np
import pandas as pd

REQUIRED_COLS = {"Plot_ID", "Tree_ID", "Species", "DBH_cm", "Height_m"}


def process_plot(file_path: Path):
    """
    Validate a single plot CSV, calculate basal area, and return summary + QC issues.
    Returns (summary_dict, qc_issues_list).
    """
    qc_issues = []
    file_name = file_path.name

    try:
        data = pd.read_csv(file_path)
    except Exception as err:
        qc_issues.append({
            "file_name": file_name,
            "issue_type": "Unreadable file",
            "record_count": 0,
            "description": str(err)
        })
        return None, qc_issues

    # Verify column schema (e.g. plot_004.csv has missing Species column)
    missing_cols = REQUIRED_COLS - set(data.columns)
    if missing_cols:
        qc_issues.append({
            "file_name": file_name,
            "issue_type": "Missing required column",
            "record_count": len(data),
            "description": f"Missing: {', '.join(sorted(missing_cols))}"
        })
        return None, qc_issues

    # Screen data anomalies without dropping rows silently
    n_missing_dbh = int(data["DBH_cm"].isna().sum())
    if n_missing_dbh > 0:
        qc_issues.append({
            "file_name": file_name,
            "issue_type": "Missing DBH",
            "record_count": n_missing_dbh,
            "description": "DBH_cm is NA"
        })

    n_missing_sp = int(data["Species"].isna().sum())
    if n_missing_sp > 0:
        qc_issues.append({
            "file_name": file_name,
            "issue_type": "Missing Species",
            "record_count": n_missing_sp,
            "description": "Species is NA"
        })

    n_nonpos_dbh = int((data["DBH_cm"] <= 0).sum())
    if n_nonpos_dbh > 0:
        qc_issues.append({
            "file_name": file_name,
            "issue_type": "Non-positive DBH",
            "record_count": n_nonpos_dbh,
            "description": "DBH_cm <= 0 cm"
        })

    n_tall_trees = int((data["Height_m"] > 50).sum())
    if n_tall_trees > 0:
        qc_issues.append({
            "file_name": file_name,
            "issue_type": "Extreme Height (>50 m)",
            "record_count": n_tall_trees,
            "description": "Height exceeds 50 m screening threshold"
        })

    # Basal area in square metres on valid positive measurements
    valid_dbh = data["DBH_cm"].where(data["DBH_cm"] > 0, np.nan)
    data["BA_m2"] = np.pi * (valid_dbh ** 2) / 40000.0

    flagged_trees = n_missing_dbh + n_missing_sp + n_nonpos_dbh + n_tall_trees
    summary = {
        "file_name": file_name,
        "Plot_ID": str(data["Plot_ID"].iloc[0]),
        "Tree_Count": int(len(data)),
        "Mean_DBH_cm": round(float(valid_dbh.mean()), 2),
        "Mean_Height_m": round(float(data["Height_m"].mean()), 2),
        "Basal_Area_m2": round(float(data["BA_m2"].sum()), 4),
        "Flagged_Trees": int(flagged_trees)
    }
    return summary, qc_issues


def main():
    raw_dir = Path("plots_batch")
    if not raw_dir.exists():
        raw_dir = Path("data/plots_batch")

    files = sorted(list(raw_dir.glob("*.csv")))
    print(f"Discovered {len(files)} plot files in {raw_dir}")

    summaries = []
    all_qc_issues = []

    for f in files:
        summary, qc_list = process_plot(f)
        if summary is not None:
            summaries.append(summary)
        all_qc_issues.extend(qc_list)

    master_df = pd.DataFrame(summaries)
    qc_df = pd.DataFrame(all_qc_issues)

    master_df.to_csv("bagmati_plot_summary.csv", index=False)
    qc_df.to_csv("bagmati_quality_control.csv", index=False)

    print(f"Processed {len(master_df)} valid plot files out of {len(files)} total files.")
    print("\n--- Quality-Control Summary Log ---")
    print(qc_df.to_string(index=False))


if __name__ == "__main__":
    main()

