import streamlit as st
import pandas as pd
from PIL import Image
import numpy as np
import statistics as sta

###################################


def _max_width_():
    global Ax
    max_width_str = f"max-width: 1800px"
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
        Ax = shows['AX'].tolist()
        uploaded_file.seek(0)
        file_container.write(shows)

    else:
        st.info(
            f"""
                👆 Importer ici les données brutes issues de l'accéléromètre et du magnétomètre
                """
        )

        st.stop()
    

def calculNbre() :
    global compteur

    #filtrage des données
    st.text(Ax[0])

    axf = filtrage(Ax)

    st.line_chart(Ax)

    st.line_chart(axf)


    #calcul nbre de lever de chaise

    M = 25 #Mediane glissante toutes les deux secondes
    med = 0
    sup = False
    compteur = 0

    for i in range (4, len(axf)):
        if (i < M+1):
            med = sta.median(axf)
        else :
            tab = axf[i-M: i]
            med = sta.median(tab)
        if (sup == False):
            if (axf[i]>med):
                sup = True
                compteur = compteur +1
        if (sup == True):
            if (axf[i]<med):
                sup = False
                compteur = compteur +1
    
    st.text("ax(0)" + str(Ax[0]))
    st.text("axf(2)" + str(axf[2]))

    return compteur/2		




def filtrage(valeurs) :


    sortie = [0.000000000000000000]*len(valeurs)

    B1 = 0.0001832160233696078
    B2 = 0.0007328640934784310
    B3 = 0.0001099296140218
    B4 = 0.0007328640934784310
    B5 = 0.0001832160233696078

    A1 = 1
    A2 = 3.344067837711877
    A3 = 4.238863950884072
    A4 = 2.409342856586324
    A5 = 0.517478199788042 

    sortie[0] = B1 * valeurs[0]

    sortie[1] = B1 * valeurs[1] + B2 * valeurs[0] - A2 * sortie[0]

    sortie[2] = B1 * valeurs[2] + B2 * valeurs[1] + B3 * valeurs[0] - A2 * sortie[1] - A3 * sortie[0]
    
    st.text("sortie[2]" + str(sortie[2])) 

    sortie[3] = B1 * valeurs[3] + B2 * valeurs[2] + B3 * valeurs[1] + B4 * valeurs [0] - A2 * sortie[2] - A3 * sortie[1] - A4 * sortie[0]

    for i in range (4, len(valeurs)):
        sortie[i] = B1 * valeurs[i] + B2 * valeurs[i-1] + B3 * valeurs[i-2] + B4 * valeurs [i-3] +  B5 * valeurs [i-4] - A2 * sortie[i-1] - A3 * sortie[i-2] - A4 * sortie[i-3] - A5 * sortie[i-4]


    return sortie

a = calculNbre()




st.text("le compteur est" + str(compteur))
