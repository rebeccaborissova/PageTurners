from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fuzzywuzzy import fuzz
import logging
import time

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

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
        logger.debug(f"No subjects for comparison: {book1.title} or {book2.title}")
        return 0.0

    try:
        vectorizer = TfidfVectorizer().fit_transform([' '.join(book1.subjects), ' '.join(book2.subjects)])
        vectors = vectorizer.toarray()
        cosine_sim = cosine_similarity(vectors)
        logger.debug(f"Similarity between '{book1.title}' and '{book2.title}': {cosine_sim[0, 1]}")
        return cosine_sim[0, 1]
    except ValueError as e:
        logger.error(f"Error calculating similarity between '{book1.title}' and '{book2.title}': {e}")
        return 0.0

# Load the books data
try:
    df = pd.read_csv('../books.csv')
    books = [Book(id=str(row['id']), subjects=row['subjects'], title=row['title'], authors=row['authors']) 
             for _, row in df.iterrows()]
    logger.info(f"Loaded {len(books)} books from CSV")
except Exception as e:
    logger.error(f"Error loading books data: {e}")
    books = []

@app.route('/similar-books/<book_id>', methods=['GET'])
def get_similar_books(book_id):
    start_time = time.time()
    logger.debug(f"Received request for book_id: {book_id}")
    
    input_book = next((book for book in books if book.id == book_id), None)
    
    if not input_book:
        logger.warning(f"Book not found: {book_id}")
        return jsonify({"error": "Book not found"}), 404

    logger.debug(f"Found input book: {input_book.title}")
    logger.debug(f"Input book subjects: {input_book.subjects}")

    similarity_scores = []
    logger.debug("Starting similarity calculations")
    for i, book in enumerate(books):
        if book.id != book_id:
            similarity = calculate_similarity(input_book, book)
            similarity_scores.append((book, similarity))
        if i % 1000 == 0:
            logger.debug(f"Processed {i} books")

    logger.debug("Sorting similarity scores")
    similarity_scores.sort(key=lambda x: x[1], reverse=True)

    logger.debug("Preparing top 5 similar books")
    top_5_similar = [
        {
            "book": book.to_dict(),
            "similarity_score": score
        } for book, score in similarity_scores[:5]
    ]

    end_time = time.time()
    logger.info(f"Returning 5 similar books for book_id: {book_id}. Process took {end_time - start_time:.2f} seconds")
    logger.debug(f"Top 5 similar books: {[book['book']['title'] for book in top_5_similar]}")
    return jsonify({
        "input_book": input_book.to_dict(),
        "similar_books": top_5_similar
    })

@app.route('/get-book-id', methods=['POST'])
def get_book_id():
    start_time = time.time()
    data = request.json
    if not data or 'title' not in data:
        return jsonify({"error": "Book title is required"}), 400

    title = data['title']
    logger.debug(f"Received request to find ID for book title: {title}")

    # Fuzzy matching
    threshold = 95  # Adjust this value to change the strictness of matching
    matching_books = []
    for book in books:
        ratio = fuzz.ratio(book.title.lower(), title.lower())
        if ratio >= threshold:
            matching_books.append((book, ratio))

    matching_books.sort(key=lambda x: x[1], reverse=True)

    if not matching_books:
        logger.warning(f"No book found with similar title to: {title}")
        return jsonify({"error": "No books found with similar titles"}), 404

    if len(matching_books) > 1:
        logger.warning(f"Multiple books found with similar titles to: {title}")
        return jsonify({
            "warning": "Multiple books found with similar titles",
            "books": [{"id": book.id, "title": book.title} 
                      for book, ratio in matching_books[:5]]  # Return top 5 matches
        })

    matching_book, ratio = matching_books[0]
    end_time = time.time()
    logger.info(f"Found book ID for title '{title}'. Process took {end_time - start_time:.2f} seconds")
    return jsonify({
        "id": matching_book.id,
        "title": matching_book.title
    })

@app.route('/test', methods=['GET'])
def test():
    response_data = {
        "input_book": {
            "authors": "OL92945A",
            "id": "OL1000307W",
            "subjects": [
                "Virtual reality; Fiction; Adventures and adventurers; Adventure and adventurers; Magic",
                "fiction; Fantasy fiction; Children's fiction"
            ],
            "title": "Book of reality"
        },
        "similar_books": [
            {
                "book": {
                    "authors": "OL8268773A",
                    "id": "OL21618595W",
                    "subjects": [
                        "Children's fiction; Fantasy fiction; Adventure and adventurers",
                        "fiction"
                    ],
                    "title": "Eirwen and the Gossamer Rainbow"
                },
                "similarity_score": 0.8595449691332423,
                "quicksort_time": 2.1,
                "timsort_time": 1.5
            },
            {
                "book": {
                    "authors": "OL890140A",
                    "id": "OL4464863W",
                    "subjects": [
                        "Children's fiction; Fantasy fiction; Adventure and adventurers",
                        "fiction"
                    ],
                    "title": "Sorcerers Trap"
                },
                "similarity_score": 0.8595449691332423,
                "quicksort_time": 3,
                "timsort_time": 2
            },
            {
                "book": {
                    "authors": "OL1709245A",
                    "id": "OL6445623W",
                    "subjects": [
                        "Fiction; Adventure and adventurers",
                        "fiction; Children's fiction"
                    ],
                    "title": "In search of the petroglyph"
                },
                "similarity_score": 0.8334793058769957,
                "quicksort_time": 1.4,
                "timsort_time": 0.8
            },
            {
                "book": {
                    "authors": "OL33122A",
                    "id": "OL497775W",
                    "subjects": [
                        "Fiction; Children's fiction; Adventure and adventurers",
                        "fiction"
                    ],
                    "title": "Abduction"
                },
                "similarity_score": 0.8334793058769957,
                "quicksort_time": 1.5,
                "timsort_time": 0.9
            },
            {
                "book": {
                    "authors": "OL7275243A",
                    "id": "OL24159416W",
                    "subjects": [
                        "Adventure and adventurers; Fiction; Children's fiction"
                    ],
                    "title": "The demon's watch"
                },
                "similarity_score": 0.8263747420527221,
                "quicksort_time": 1.7,
                "timsort_time": 1.1
            }
        ]
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=3001)
