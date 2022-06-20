import streamlit as st
import pandas as pd
import numpy as np

from PIL import Image
image = Image.open('TestChaise/app.png')

st.title('Le test du Lever de Chaise')
st.image(image, width=50)
