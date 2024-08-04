import testing
import dataCleaning
import requests
import pandas as pd

class Book:
    def __init__(self, isbn, title, subjects, author):
        self.isbn = id
        self.title = title
        self.subjects = subjects
        self.author = author

def csvDictToObj(filePath):
    df = pd.read_csv(filePath, low_memory=False)
    books = []
    for _, row in df.iterrows():
        book = Book(
            isbn=row['isbn'],
            title=row['title'],
            subjects=row['subjects'],
            author=row['author']
        )
        books.append(book)
    return books
    
def findTargetBook(bookObjList, targetName):
    for book in bookObjList:
        if book.Name == targetName:
            return book

def main():
    bookObjList = csvDictToObj('books_data.csv')
    
    print("Welcome to PageTurners!")
    print("If you wish to exit your search, when prompted to enter your book title, type 'No'")

    while True:
        userInputBook = input("Enter book title: ")
        if userInputBook.lower() == "no":
            break
            
        targetBook = findTargetBook(bookObjList, userInputBook)
        # print(targetBook.subjects)
        finalist = testing.createSimList(targetBook, bookObjList)
        # for item in finalList: print(item)

    print("Thank you for using PageTurners!")

if __name__ == "__main__":
    main()
