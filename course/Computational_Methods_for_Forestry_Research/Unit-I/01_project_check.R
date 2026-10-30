
folders <- c(
  "data/raw",
  "data/processed",
  "scripts",
  "figures",
  "outputs",
  "reports",
  "notebooks"
)

cat("=== Checking Bagmati Observatory Project Structure ===\n")
for (folder in folders) {
  exists_flag <- file.exists(folder)
  cat(sprintf("Directory %-18s : %s\n", folder, ifelse(exists_flag, "OK (TRUE)", "MISSING (FALSE)")))
}
