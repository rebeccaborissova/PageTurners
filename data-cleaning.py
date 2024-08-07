import re
import json
import csv
import unicodedata
from langdetect import detect, LangDetectException

#checks that the title contains normal unicode characters
def is_valid_text(text):
    normalized = unicodedata.normalize('NFKD', text).encode('ASCII', 'ignore').decode()
    return bool(re.match(r'^[A-Za-z0-9\s\-_.,;:!?()\'\"]+$', normalized))

#check that the title and subjects are english
def is_english(text):
    try:
        return detect(text) == 'en'
    except LangDetectException:
        return False

def parse_book_data(data):
    books = []
    entries = re.findall(r'/type/work\t(/works/OL\d+W)\t\d+\t[^\t]+\t(.+)', data)

    for id, json_data in entries:
        try:
            book_data = json.loads(json_data)
            title = book_data.get('title', '')
            subjects = book_data.get('subjects', [])

            #check that title is in english and is valid text
            if not is_valid_text(title) or not is_english(title):
                continue

            #check that subjects are in english and is valid text
            valid_subjects = [subj for subj in subjects if is_valid_text(subj) and is_english(subj)]

            if not valid_subjects:
                continue

            #gets authors, accounting for multiple authors in the dump
            authors = []
            for author_data in book_data.get('authors', []):
                if isinstance(author_data, dict):
                    author_key = author_data.get('author', {}).get('key', '')
                    if author_key:
                        authors.append(author_key.split('/')[-1])

            #adds another book to the list
            books.append({
                'id': id,
                'title': title,
                'subjects': '; '.join(valid_subjects),
                'authors': '; '.join(authors) or ' ',
            })
        except json.JSONDecodeError:
            continue

    return books

def write_to_csv(books, filename):
    fieldnames = ['id', 'title', 'subjects', 'authors']
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for book in books:
            writer.writerow(book)


def main():
    #reads in file
    with open('x00.txt', 'r', encoding='utf-8') as file:
        data = file.read()

    parsed_books = parse_book_data(data)

    #writes out file
    write_to_csv(parsed_books, 'books_data.csv')


if __name__ == "__main__":
    main()
