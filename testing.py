from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

'''
   TF-IDF = Term Frequency-Inverse Document Frequency --> quantify importance of words in doc.
'''

def calcSim(targetBookSubj, singleBookSubj):
   descriptions = [targetBookSubj, singleBookSubj]
   vectorizer = TfidfVectorizer().fit_transform(descriptions)
   vectors = vectorizer.toarray()
   cosine_sim = cosine_similarity(vectors)
   similarity_score = cosine_sim[0, 1]
   return similarity_score

def createSimList(targetBook, bookObjList):
   finalSim = []
   for book in bookObjList:
      if book.Name != targetBook.Name and book.subjects != []:
         simScore = calcSim(targetBook.subjects, book.subjects)
         finalSim.append((book.Name, simScore))

   return finalSim
