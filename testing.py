import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import time
import csv
import logging
from sorting_algorithms import quick_sort, tim_sort

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Book:
    def __init__(self, id, subjects, title):
        self.id = id
        self.subjects = subjects.split(', ') if isinstance(subjects, str) else []
        self.title = title
        self.similar_books = []

def calculate_similarity(book1, book2):
    if not book1.subjects or not book2.subjects:
        return 0.0
    try:
        vectorizer = TfidfVectorizer().fit_transform([' '.join(book1.subjects), ' '.join(book2.subjects)])
        return cosine_similarity(vectorizer)[0, 1]
    except ValueError:
        return 0.0

# Load the data
logging.info("Loading books data from books.csv")
df = pd.read_csv('books.csv')
books = [Book(id=str(row['id']), subjects=row['subjects'], title=row['title']) for _, row in df.iterrows()]
logging.info(f"Loaded {len(books)} books")

# Compute similarities and sort
output_data = []
for i, book in enumerate(books):
    logging.info(f"Processing book {i+1}/{len(books)}: {book.title}")
    
    similarities = [(other_book.id, calculate_similarity(book, other_book)) 
                    for other_book in books if other_book.id != book.id]
    
    logging.info(f"Calculating quicksort for book {book.id}")
    quicksort_start = time.time()
    quicksort_result = quick_sort(similarities)[:5]
    quicksort_time = time.time() - quicksort_start
    logging.info(f"Quicksort for book {book.id} completed in {quicksort_time:.4f} seconds")

    logging.info(f"Calculating timsort for book {book.id}")
    mergesort_start = time.time()
    mergesort_result = tim_sort(similarities)[:5]
    mergesort_time = time.time() - mergesort_start
    logging.info(f"Mergesort for book {book.id} completed in {mergesort_time:.4f} seconds")

    output_data.append({
        'book_id': book.id,
        'book_title': book.title,
        'similar_books_quicksort': ';'.join([f"{b[0]}:{b[1]:.4f}" for b in quicksort_result]),
        'quicksort_time': quicksort_time,
        'similar_books_mergesort': ';'.join([f"{b[0]}:{b[1]:.4f}" for b in mergesort_result]),
        'mergesort_time': mergesort_time
    })

logging.info("All books processed. Writing results to book_similarities.csv")

# Write to CSV
with open('book_similarities.csv', 'w', newline='') as csvfile:
    fieldnames = ['book_id', 'book_title', 'similar_books_quicksort', 'quicksort_time', 
                  'similar_books_mergesort', 'mergesort_time']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for row in output_data:
        writer.writerow(row)

logging.info("Processing complete. Results written to book_similarities.csv")
