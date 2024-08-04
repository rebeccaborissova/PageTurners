import testing
import dataCleaning
import requests
import pandas as pd

def findTargetBook(bookObjList, targetName):
    for book in bookObjList:
        if book.Name == targetName:
            return book

def main():
    print("Welcome to PageTurners!")
    print("If you wish to exit your search, when prompted to enter your book title, type 'No'")

    while True:
        userInputBook = input("Enter book title: ")
        if userInputBook.lower() == "no":
            break
            
        targetBook = findTargetBook(bookObjList, userInputBook)
        print(targetBook.subjects)
        
        finalist = testing.createSimList(targetBook, bookObjList)

    print("Thank you for using PageTurners!")
    # similarity_score = testing.calc_sim(desc1, desc2)
    # print(f"Similarity Score: {similarity_score}")

if __name__ == "__main__":
    main()
