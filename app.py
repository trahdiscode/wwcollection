import os
import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="WW MOVIE COLLECTION — Worldwide Movie Box Office Intelligence",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Hide default Streamlit chrome, paddings, and header for full immersive view
st.markdown(
    """
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    [data-testid="stHeader"] {display: none;}
    .block-container {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
        max-width: 100% !important;
    }
    iframe {
        width: 100% !important;
        min-height: 100vh !important;
        border: none !important;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# Load the self-contained single-file production build
html_file_path = os.path.join(os.path.dirname(__file__), "dist", "index.html")

if os.path.exists(html_file_path):
    with open(html_file_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    components.html(html_content, height=1400, scrolling=True)
else:
    st.error("Build artifact not found: dist/index.html. Ensure the repository includes the pre-built distribution.")
