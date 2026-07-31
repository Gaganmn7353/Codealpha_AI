import nltk

nltk.download("punkt")

from nltk.tokenize import word_tokenize

text = "Hello! How are you?"

print(word_tokenize(text))