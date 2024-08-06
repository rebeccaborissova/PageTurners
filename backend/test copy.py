from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import logging
import time

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class Book:
    def __init__(self, id, subjects, title, authors):
        self.id = id
        self.subjects = subjects.split(', ') if isinstance(subjects, str) else []
        self.title = title
        self.authors = authors
        self.similar_books = []  # List of tuples (Book, similarity_score)
        self.tfidf_vector = None

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "authors": self.authors,
            "subjects": self.subjects
        }

class BookGraph:
    def __init__(self):
        self.books = {}  # Dictionary of Book objects, keyed by book_id
        self.vectorizer = None
        self.tfidf_matrix = None

    def add_book(self, book):
        self.books[book.id] = book
        logger.debug(f"Added book to graph: {book.title}")

    def prepare_tfidf_vectors(self):
        logger.info("Preparing TF-IDF vectors for all books")
        start_time = time.time()

        all_subjects = [' '.join(book.subjects) for book in self.books.values()]
        self.vectorizer = TfidfVectorizer()
        self.tfidf_matrix = self.vectorizer.fit_transform(all_subjects)

        for i, book in enumerate(self.books.values()):
            book.tfidf_vector = self.tfidf_matrix[i]
            print(book.tfidf_vector)

        end_time = time.time()
        logger.info(f"Finished preparing TF-IDF vectors. Time taken: {end_time - start_time:.2f} seconds")

    def calculate_similarities(self):
        logger.info("Starting similarity calculations for all books")
        start_time = time.time()
        book_list = list(self.books.values())
        total_books = len(book_list)

        for i, book1 in enumerate(book_list):
            logger.debug(f"Calculating similarities for book {i+1}/{total_books}: {book1.title}")
            similarities = cosine_similarity(book1.tfidf_vector, self.tfidf_matrix).flatten()
            
            # Exclude self-similarity and sort
            similar_indices = np.argsort(similarities)[::-1][1:6]  # Top 5 excluding self
            book1.similar_books = [(book_list[idx], similarities[idx]) for idx in similar_indices]

            if i % 100 == 0:
                logger.info(f"Processed {i+1}/{total_books} books")

        end_time = time.time()
        logger.info(f"Finished calculating similarities. Total time: {end_time - start_time:.2f} seconds")

    def get_similar_books(self, book_id, top_n=5):
        book = self.books.get(book_id)
        if not book:
            logger.warning(f"Book not found: {book_id}")
            return None, []

        logger.debug(f"Getting top {top_n} similar books for: {book.title}")
        return book, book.similar_books[:top_n]

# Initialize the graph
book_graph = BookGraph()

# Load the books data
try:
    logger.info("Loading books from CSV")
    df = pd.read_csv('../books.csv')
    for _, row in df.iterrows():
        book = Book(id=str(row['id']), subjects=row['subjects'], title=row['title'], authors=row['authors'])
        book_graph.add_book(book)
    logger.info(f"Loaded {len(book_graph.books)} books from CSV")
except Exception as e:
    logger.error(f"Error loading books data: {e}")

# Prepare TF-IDF vectors
book_graph.prepare_tfidf_vectors()

# Calculate similarities
book_graph.calculate_similarities()

@app.route('/similar-books/<book_id>', methods=['GET'])
def get_similar_books(book_id):
    start_time = time.time()
    logger.debug(f"Received request for book_id: {book_id}")

    input_book, similar_books = book_graph.get_similar_books(book_id)
    
    if not input_book:
        return jsonify({"error": "Book not found"}), 404

    logger.debug(f"Found input book: {input_book.title}")
    logger.debug(f"Input book subjects: {input_book.subjects}")

    top_5_similar = [
        {
            "book": book.to_dict(),
            "similarity_score": score
        } for book, score in similar_books
    ]

    end_time = time.time()
    logger.info(f"Returning 5 similar books for book_id: {book_id}. Process took {end_time - start_time:.2f} seconds")
    logger.debug(f"Top 5 similar books: {[book['book']['title'] for book in top_5_similar]}")
    return jsonify({
        "input_book": input_book.to_dict(),
        "similar_books": top_5_similar
    })

@app.route('/test', methods=['GET'])
def test():
    return "Hello world"

if __name__ == '__main__':
    app.run(debug=True, port=3002)