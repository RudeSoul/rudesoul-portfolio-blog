# Unit 8 Practice Starter: Python Streamlit Biomass Tool
# Practice script for lab exercises. Fill in the commented sections.
# Run in terminal: streamlit run app_starter.py

import streamlit as st

st.set_page_config(page_title="Bagmati Biomass Tool", layout="centered")

st.title("Bagmati Forest Observatory — Biomass Decision Tool")

# 1. Inputs: species selector and DBH number input
species_list = ["Shorea robusta", "Schima wallichii", "Castanopsis indica", "Alnus nepalensis"]
species = st.selectbox("Select Tree Species:", species_list)
dbh = st.number_input("Diameter at Breast Height, DBH (cm):", min_value=0.1, max_value=300.0, value=28.4, step=0.5)

# 2. Check if DBH is within empirical calibration range (10-80 cm)
if dbh < 10.0 or dbh > 80.0:
    st.warning(f"Domain Alert: DBH ({dbh:.1f} cm) is outside the calibrated range (10–80 cm).")
else:
    st.success("Input is within the validated empirical domain (10–80 cm).")

# 3. Calculate predicted above-ground biomass
agb_kg = 0.085 * (dbh ** 2.42) * 1.0072
st.metric(label=f"Predicted Biomass ({species})", value=f"{agb_kg:.2f} kg")

