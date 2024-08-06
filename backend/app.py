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
    def __init__(self, id, subjects, title, authors, similarity_score=0):
        self.id = id
        self.subjects = subjects if isinstance(subjects, list) else subjects.split(', ') if subjects else []
        self.title = title
        self.authors = authors
        self.similarity_score = similarity_score

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

def radix_sort(book_list):
    RADIX = 10
    max_length = False
    placement = 1
    max_digit = max(int(book.similarity_score * 1e9) for book in book_list)

    while not max_length:
        buckets = [[] for _ in range(RADIX)]
        for book in book_list:
            tmp = int(book.similarity_score * 1e9)
            bucket_index = (tmp // placement) % RADIX
            buckets[bucket_index].append(book)

        a = 0
        for bucket in buckets:
            for book in bucket:
                book_list[a] = book
                a += 1

        placement *= RADIX
        if max_digit < placement:
            max_length = True

    # Reverse the list to get descending order
    book_list.reverse()
    return book_list

def tim_sort(book_list):
    # Python's built-in sort uses Timsort
    return sorted(book_list, key=lambda x: x.similarity_score, reverse=True)

@app.route('/similar-books/<book_id>', methods=['GET'])
def get_similar_books(book_id):
    start_time = time.time()

    logger.debug(f"Received request for book ID: {book_id}")
    
    input_book = next((book for book in books if book.id == book_id), None)
    
    if not input_book:
        logger.warning(f"Book not found: {book_id}")
        return jsonify({"error": "Book not found"}), 404

    logger.debug(f"Found input book: {input_book.title}")
    logger.debug(f"Input book subjects: {input_book.subjects}")

    similarity_scores = []
    logger.debug("Starting similarity calculations")
    for i, book in enumerate(books):
        if book.id != input_book.id:
            similarity = calculate_similarity(input_book, book)
            similarity_scores.append(Book(id=book.id, subjects=book.subjects, title=book.title, authors=book.authors, similarity_score=similarity))
        if i % 1000 == 0:
            logger.debug(f"Processed {i} books")

    logger.debug("Sorting similarity scores")
    
    # Radix Sort
    radix_start = time.time()
    radix_sorted = radix_sort(similarity_scores.copy())
    radix_end = time.time()
    radix_sort_time = radix_end - radix_start

    # Tim Sort
    tim_start = time.time()
    tim_sorted = tim_sort(similarity_scores.copy())
    tim_end = time.time()
    tim_sort_time = tim_end - tim_start

    logger.debug("Preparing top 5 similar books")
    top_5_similar = [
        {
            "book": book.to_dict(),
            "similarity_score": book.similarity_score,
        } for book in radix_sorted[:5]  # Using Radix Sort result for top 5
    ]

    end_time = time.time()
    logger.info(f"Returning 5 similar books for book ID: {book_id}. Process took {end_time - start_time:.2f} seconds")
    logger.debug(f"Top 5 similar books: {[book['book']['title'] for book in top_5_similar]}")
    
    return jsonify({
        "input_book": input_book.to_dict(),
        "similar_books": top_5_similar,
        "radix_sort_time": radix_sort_time,
        "tim_sort_time": tim_sort_time
    })

@app.route('/get-book-id', methods=['POST'])
def get_book_id():
    start_time = time.time()
    data = request.json
    if not data or 'title' not in data:
        return jsonify({"error": "Book title is required"}), 400

    title = data['title']
    logger.debug(f"Received request to find ID for book title: {title}")

    threshold = 95
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
                      for book, _ in matching_books[:20]]
        })

    matching_book, ratio = matching_books[0]
    end_time = time.time()
    logger.info(f"Found book ID for title '{title}'. Process took {end_time - start_time:.2f} seconds")
    return jsonify({
        "id": matching_book.id,
        "title": matching_book.title
    })

if __name__ == '__main__':
    app.run(debug=True, port=3001)