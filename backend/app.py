from flask import Flask, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
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

def calculate_similarity(subjects1, subjects2):
    if not subjects1 or not subjects2:
        return 0.0

    try:
        vectorizer = TfidfVectorizer().fit_transform([' '.join(subjects1), ' '.join(subjects2)])
        vectors = vectorizer.toarray()
        cosine_sim = cosine_similarity(vectors)
        return cosine_sim[0, 1]
    except ValueError:
        return 0.0

class BookGraph:
    def __init__(self):
        self.nodes = {}
        self.edges = {}

    def add_book(self, book):
        self.nodes[book.id] = book

    def add_edge(self, book_id1, book_id2, similarity_score):
        if book_id1 not in self.edges:
            self.edges[book_id1] = {}
        self.edges[book_id1][book_id2] = similarity_score

    def get_similar_books(self, book_id, top_n=5):
        if book_id not in self.edges:
            return []
        
        similar_books = sorted(self.edges[book_id].items(), key=lambda item: item[1], reverse=True)[:top_n]
        return [(self.nodes[book_id2], score) for book_id2, score in similar_books]

try:
    df = pd.read_csv('../books.csv')
    books = [Book(id=str(row['id']), subjects=row['subjects'], title=row['title'], authors=row['authors']) 
             for _, row in df.iterrows()]
except Exception as e:
    books = []

book_graph = BookGraph()
for book in books:
    book_graph.add_book(book)

for i, book1 in enumerate(books):
    for j, book2 in enumerate(books):
        if i < j:
            similarity = calculate_similarity(book1.subjects, book2.subjects)
            book_graph.add_edge(book1.id, book2.id, similarity)
            book_graph.add_edge(book2.id, book1.id, similarity)

@app.route('/similar-books/<book_id>', methods=['GET'])
def get_similar_books(book_id):
    start_time = time.time()

    input_book = book_graph.nodes.get(book_id)
    if not input_book:
        return jsonify({"error": "Book not found"}), 404

    top_similar_books = book_graph.get_similar_books(book_id)

    top_5_similar = [
        {
            "book": book.to_dict(),
            "similarity_score": score
        } for book, score in top_similar_books
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
