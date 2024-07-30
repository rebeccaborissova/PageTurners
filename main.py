import testing
import dataCleaning
import requests
import pandas as pd

# must find the user input book & create a book obj
def find_target_book(title):
    file_path = 'books.csv'
    df = pd.read_csv(file_path, low_memory=False)

    # Initialize targetBook to None
    targetBook = None

    # Search for the book by title
    for index, row in df.iterrows():
        if row['Name'].lower() == title.lower():
            targetBook = dataCleaning.Book(
                Name=row['Name'],
                PublishYear=row['PublishYear'],
                Rating=row['Rating'],
                ISBN=row['ISBN']
            )
            break

    return targetBook

# adding subj to user input book via API call post-book finding
def addSubject(targetBook):
    if targetBook.ISBN:
        url = f"http://openlibrary.org/api/volumes/brief/isbn/{targetBook.ISBN}.json"
        headers = {
            "User-Agent": "PageTurner/1.0 (rebeccaborissov@gmail.com)"
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            if 'records' in data:
                for record_id, record_data in data['records'].items():
                    # Get cover URL (if present)
                    data_section = record_data.get('data', {})
                    if data_section:
                        cover = data_section.get('cover', {})
                        targetBook.cover_url = cover.get('large', "")

                        # Get subjects from data section (if present)
                        subjects = data_section.get('subjects', [])
                        targetBook.subjects.extend([subject['name'] for subject in subjects if
                                              isinstance(subject, dict) and 'name' in subject])

                    # Get subjects from details section (if present)
                    details_section = record_data.get('details', {}).get('details', {})
                    if details_section:
                        subjects = details_section.get('subjects', [])
                        targetBook.subjects.extend([subject for subject in subjects if isinstance(subject, str)])

                    break  # Get data from the first record only

def main():
    print("Welcome to PageTurners!")
    print("If you wish to exit your search, when prompted to enter your book title, type 'No'")

    while True:
        userInputBook = input("Enter book title: ")
        if userInputBook.lower() == "no":
            break
        targetBook = find_target_book(userInputBook)

        if not targetBook:
            print("Book not found")
            continue
        else:
            print("Success!")

        # If found --> calculate similarity score & insert its edge weight if above the avg threshold (otherwise ignore)
        addSubject(targetBook)

        # need to gather subjects
        descriptions = [book['description'] for book in books]
        testing.calcCosineSimMatrix(targetBook.subjects, descriptions)

        cosine_sim_matrix = calculate_similarity_matrix(descriptions)

    print("Thank you for using PageTurners!")
    # similarity_score = testing.calc_sim(desc1, desc2)
    # print(f"Similarity Score: {similarity_score}")

if __name__ == "__main__":
    main()
