from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging
import time

app = Flask(__name__)

class Book:
    def __init__(self, id, subjects, title, authors):
        self.id = id
        self.subjects = subjects.split(', ') if isinstance(subjects, str) else []
        self.title = title
        self.authors = authors

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "authors": self.authors,
            "subjects": self.subjects
        }

def calculate_similarity(book1, book2):
    if not book1.subjects or not book2.subjects:
        return 0.0

    try:
        vectorizer = TfidfVectorizer().fit_transform([' '.join(book1.subjects), ' '.join(book2.subjects)])
        vectors = vectorizer.toarray()
        cosine_sim = cosine_similarity(vectors)
        return cosine_sim[0, 1]
    except ValueError as e:
        return 0.0

# Load the books data
try:
    df = pd.read_csv('../books.csv')
    books = [Book(id=str(row['id']), subjects=row['subjects'], title=row['title'], authors=row['authors']) 
             for _, row in df.iterrows()]
except Exception as e:
    books = []

@app.route('/similar-books/<book_id>', methods=['GET'])
def get_similar_books(book_id):
    start_time = time.time()
    
    input_book = next((book for book in books if book.id == book_id), None)
    
    if not input_book:
        return jsonify({"error": "Book not found"}), 404

    similarity_scores = []
    for i, book in enumerate(books):
        if book.id != book_id:
            similarity = calculate_similarity(input_book, book)
            similarity_scores.append((book, similarity))

    similarity_scores.sort(key=lambda x: x[1], reverse=True)

    top_5_similar = [
        {
            "book": book.to_dict(),
            "similarity_score": score
        } for book, score in similarity_scores[:5]
    ]

    end_time = time.time()
    return jsonify({
        "input_book": input_book.to_dict(),
        "similar_books": top_5_similar
    })

@app.route('/test', methods=['GET'])
def test():
    return "Hello world"

if __name__ == '__main__':
    app.run(debug=True, port=3001, host='0.0.0.0')