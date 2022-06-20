import streamlit as st
import pandas as pd
from PIL import Image
import numpy as np


###################################
from st_aggrid import AgGrid
from st_aggrid.grid_options_builder import GridOptionsBuilder
from st_aggrid.shared import JsCode

###################################

from functionforDownloadButtons import download_button

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

