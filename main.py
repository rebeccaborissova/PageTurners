import testing
import dataCleaning
import requests
import pandas as pd

def loadCsvBooks(filePath):
    df = pd.read_csv(filepath, low_memory = False)
    books = df.to_dict(orient='records') 
    return books
    
def findTargetBook(bookList, targetName):
    for book in bookObjList:
        if book['title'].lower() == targetName.lower():
            return book

def main():
    bookList = loadCsvBooks('books_data.csv')
    
    print("Welcome to PageTurners!")
    print("If you wish to exit your search, when prompted to enter your book title, type 'No'")

    while True:
        userInputBook = input("Enter book title: ")
        if userInputBook.lower() == "no":
            break
            
        targetBook = findTargetBook(bookList, userInputBook)

        if targetBook:
            finalist = testing.createSimList(targetBook, bookList)
        else:
            print("Book could not be found.")

    print("Thank you for using PageTurners!")

if __name__ == "__main__":
    main()
