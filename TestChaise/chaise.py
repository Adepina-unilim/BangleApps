import streamlit as st
import pandas as pd
from PIL import Image
import numpy as np

###################################


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
        key="1",
        help="Pour activer le 'mode étendu', aller dans le menu latéral > Settings > turn on 'wide mode'",
        label = "Glisser-déposer un fichier CSV ici",
    )

    if uploaded_file is not None:
        file_container = st.expander("Vérifier le document déposé")
        shows = pd.read_csv(uploaded_file)
        uploaded_file.seek(0)
        file_container.write(shows)

    else:
        st.info(
            f"""
                👆 Glisser-déposer un .csv avec des accélérations et des champs magnétiques brutes
                """
        )

        st.stop()


