# Unit 7 Practice Starter: Spatial Data, 3D LiDAR & Machine Learning
# Practice script for lab exercises. Fill in the commented sections.

from pathlib import Path
import numpy as np
import pandas as pd
import geopandas as gpd
import rasterio
import laspy
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, accuracy_score

spatial_dir = Path(".")
if not (spatial_dir / "bagmati_plots.geojson").exists():
    spatial_dir = Path("data/spatial")

# 1. Reproject plots from WGS84 (EPSG:4326) to UTM Zone 45N (EPSG:32645)
# plots_wgs84 = gpd.read_file(spatial_dir / "bagmati_plots.geojson")
# plots_utm = plots_wgs84.to_crs("EPSG:32645")

# 2. Buffer plots by 15 m radius and sample DEM elevation
# plots_utm["buffer_15m"] = plots_utm.geometry.buffer(15.0)
# with rasterio.open(spatial_dir / "bagmati_dem.tif") as dem_src:
#     coords = [(geom.x, geom.y) for geom in plots_utm.geometry]
#     plots_utm["Elevation_DEM_m"] = [round(float(val[0]), 1) for val in dem_src.sample(coords)]

# 3. Read LiDAR point cloud (.las) and compute Canopy Height Model (CHM = DSM - DTM)
# las = laspy.read(spatial_dir / "bagmati_sample.las")
# las_df = pd.DataFrame({
#     "x": np.array(las.x),
#     "y": np.array(las.y),
#     "z": np.array(las.z),
#     "classification": np.array(las.classification)
# })
# Class 2 = Ground, Class 5 = High vegetation

# 4. Train Random Forest on Sentinel-2 ground truth points using spatial block split
# gt = gpd.read_file(spatial_dir / "bagmati_ground_truth.geojson")
# predictors = ["Blue", "Green", "Red", "NIR", "SWIR", "NDVI"]
# train_df = gt[gt["Spatial_Block"] == "South_Train"]
# val_df   = gt[gt["Spatial_Block"] == "North_Val"]
#
# rf = RandomForestClassifier(n_estimators=100, random_state=2026)
# rf.fit(train_df[predictors], train_df["Class_Name"])
# val_preds = rf.predict(val_df[predictors])

# 5. Evaluate confusion matrix, overall accuracy, and producer/user accuracy
# classes = ["Forest", "Degraded Forest", "Agriculture", "Water", "Built-up"]
# cm = confusion_matrix(val_df["Class_Name"], val_preds, labels=classes)
# oa = accuracy_score(val_df["Class_Name"], val_preds)

