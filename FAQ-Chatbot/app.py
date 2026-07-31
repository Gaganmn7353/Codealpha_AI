from flask import Flask, render_template, request, jsonify
import json
import nltk
import string

from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

with open("faq.json","r") as file:
    faq = json.load(file)

questions = [item["question"] for item in faq]
answers = [item["answer"] for item in faq]

def preprocess(text):
    text = text.lower()
    tokens = word_tokenize(text)

    tokens = [
        word for word in tokens
        if word not in string.punctuation
    ]

    return " ".join(tokens)

processed = [preprocess(q) for q in questions]

vectorizer = TfidfVectorizer()
vectors = vectorizer.fit_transform(processed)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    user = request.json["message"]

    clean = preprocess(user)

    user_vector = vectorizer.transform([clean])

    similarity = cosine_similarity(user_vector, vectors)

    index = similarity.argmax()

    score = similarity[0][index]

    if score < 0.20:
        reply = "Sorry, I couldn't understand your question."
    else:
        reply = answers[index]

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)