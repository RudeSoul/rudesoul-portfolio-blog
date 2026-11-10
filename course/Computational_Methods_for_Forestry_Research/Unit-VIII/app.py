# Unit 8: Python Streamlit Biomass Estimator
# Interactive decision tool with empirical domain boundary safeguards
# Run in terminal: streamlit run app.py

import streamlit as st

st.set_page_config(page_title="Bagmati Biomass Tool", layout="centered")

st.title("Bagmati Forest Observatory — Biomass Decision Tool")
st.write("Interactive allometric decision tool with active domain safeguards.")

species_list = ["Shorea robusta", "Schima wallichii", "Castanopsis indica", "Alnus nepalensis"]
species = st.selectbox("Select Tree Species:", species_list)
dbh = st.number_input("Diameter at Breast Height, DBH (cm):", min_value=0.1, max_value=300.0, value=28.4, step=0.5)

# Active domain boundary safeguard: calibrated model domain is 10.0 to 80.0 cm DBH
if dbh < 10.0 or dbh > 80.0:
    st.warning(
        f"Scientific Domain Alert: DBH ({dbh:.1f} cm) is outside the calibrated range (10–80 cm). "
        "Extrapolated estimates carry high uncertainty and should not be used for official carbon accounting."
    )
else:
    st.success("Input is within the validated empirical domain (10–80 cm).")

# Calibrated power law: AGB (kg) = 0.085 * (dbh ** 2.42) * 1.0072
agb_kg = 0.085 * (dbh ** 2.42) * 1.0072
st.metric(label=f"Predicted Biomass ({species})", value=f"{agb_kg:.2f} kg")

st.caption("Institute of Forestry (IOF), Tribhuvan University · Bagmati Forest Observatory")

