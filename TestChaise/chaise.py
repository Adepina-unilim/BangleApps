import streamlit as st
import pandas as pd
from PIL import Image
import numpy as np

###################################

print("HELLO")

def _max_width_():
    max_width_str = f"max-width: 1800px;"
    st.markdown(
        f"""
    <style>
    .reportview-container .main .block-container{{
        {max_width_str}
    }}
    </style>    
    """,
        unsafe_allow_html=True,
    )

st.set_page_config(page_icon="'TestChaise/app.png'", page_title="Le test du Lever de Chaise")

st.image(
    'TestChaise/app.png',
    width=100,
)

st.title("Le test du Lever de Chaise")


c29, c30, c31 = st.columns([1, 6, 1])

with c30:

    uploaded_file = st.file_uploader(
        label = "Choisir un fichier .csv",
        key="1",
        help="Pour activer le 'mode étendu', aller dans le menu latéral > Settings > turn on 'wide mode'",
        
    )

    if uploaded_file is not None:
        file_container = st.expander("Vérifier le document déposé")
        shows = pd.read_csv(uploaded_file)
        AX = shows['AX'].tolist()
        uploaded_file.seek(0)
        file_container.write(shows)

    else:
        st.info(
            f"""
                👆 Importer ici les données brutes issues de l'accéléromètre et du magnétomètre
                """
        )

        st.stop()
    

print(AX)


