import streamlit as st
import json
import random

# --- Load Questions ---
def load_questions(file_path="questions.json"):
    with open(file_path, "r") as f:
        return json.load(f)

# --- Initialize session state ---
if "question_index" not in st.session_state:
    st.session_state.question_index = 0
if "show_answer" not in st.session_state:
    st.session_state.show_answer = False

# --- Load and shuffle questions ---
questions = load_questions()

# --- Get current question ---
current = questions[st.session_state.question_index]

st.title("🧠 Flashcard Quiz")

st.subheader(current["question"])
on = st.toggle("Show Code Reference", False)
if on:
    st.write(f"Code Reference: {current["code_reference"]}")

# --- User selects an answer ---
selected = st.radio("Answer", current["choices"], key=f"q{st.session_state.question_index}")

# --- Check answer ---
if st.button("Submit"):
    st.session_state.show_answer = True

if st.session_state.show_answer:
    if selected == current["correct_answer"]:
        st.success("Correct!")
    else:
        st.error(f"Incorrect. The correct answer is **{current['correct_answer']}**.")

    if st.button("Next Question ➡️"):
        st.session_state.question_index = (st.session_state.question_index + 1) % len(questions)
        st.session_state.show_answer = False
        st.rerun()
