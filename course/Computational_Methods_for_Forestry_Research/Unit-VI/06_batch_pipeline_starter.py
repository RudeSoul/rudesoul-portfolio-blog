# Unit 6 Practice Starter: Python Batch Automation & QC Logging
# Practice script for lab exercises. Fill in the commented sections.

from pathlib import Path
import numpy as np
import pandas as pd

REQUIRED_COLS = {"Plot_ID", "Tree_ID", "Species", "DBH_cm", "Height_m"}


def process_plot(file_path: Path):
    """
    Validate a single plot CSV, compute basal area, and return summary + QC logs.
    Returns: (summary_dict, qc_issues_list)
    """
    qc_issues = []
    file_name = file_path.name

    # 1. Fault-tolerant read with try / except
    # try:
    #     data = pd.read_csv(file_path)
    # except Exception as err:
    #     qc_issues.append({
    #         "file_name": file_name,
    #         "issue_type": "Unreadable file",
    #         "record_count": 0,
    #         "description": str(err)
    #     })
    #     return None, qc_issues

    # 2. Schema check: ensure all REQUIRED_COLS are present
    # missing_cols = REQUIRED_COLS - set(data.columns)
    # if missing_cols:
    #     qc_issues.append({
    #         "file_name": file_name,
    #         "issue_type": "Missing required column",
    #         "record_count": len(data),
    #         "description": f"Missing: {', '.join(sorted(missing_cols))}"
    #     })
    #     return None, qc_issues

    # 3. Screen biological boundaries without silent drops:
    #    - data["DBH_cm"].isna().sum()
    #    - data["Species"].isna().sum()
    #    - (data["DBH_cm"] <= 0).sum()
    #    - (data["Height_m"] > 50).sum()

    # 4. Basal area calculation on valid positive stems
    # valid_dbh = data["DBH_cm"].where(data["DBH_cm"] > 0, np.nan)
    # data["BA_m2"] = np.pi * (valid_dbh ** 2) / 40000.0
    #
    # summary = {
    #     "file_name": file_name,
    #     "Plot_ID": str(data["Plot_ID"].iloc[0]),
    #     "Tree_Count": int(len(data)),
    #     "Mean_DBH_cm": round(float(valid_dbh.mean()), 2),
    #     "Mean_Height_m": round(float(data["Height_m"].mean()), 2),
    #     "Basal_Area_m2": round(float(data["BA_m2"].sum()), 4),
    #     "Flagged_Trees": ...
    # }
    # return summary, qc_issues
    pass


def main():
    # 5. Batch processing loop with pathlib
    raw_dir = Path("plots_batch")
    if not raw_dir.exists():
        raw_dir = Path("data/plots_batch")

    files = sorted(list(raw_dir.glob("*.csv")))
    print(f"Discovered {len(files)} plot files in {raw_dir}")

    # Loop over all files, accumulate summaries and QC logs, then export:
    # master_df = pd.DataFrame(summaries)
    # qc_df = pd.DataFrame(all_qc_issues)
    # master_df.to_csv("bagmati_plot_summary.csv", index=False)
    # qc_df.to_csv("bagmati_quality_control.csv", index=False)


if __name__ == "__main__":
    main()

