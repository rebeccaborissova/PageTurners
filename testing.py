from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

'''
   TF-IDF = Term Frequency-Inverse Document Frequency --> quantify importance of words in doc.
'''

def calcCosineSimMatrix(subjDescriptions, allBookDescriptions):
   # input = subjDescriptions = txt descriptions want to convert to TF-IDF features

   # vectorizer = instance of TfidfVectorizer from sklearn.feature_extraction.text
   # TfidfVectorizer() = converts text -> matrix
   vectorizer = TfidfVectorizer()
   all_descriptions = [' '.join(subjDescriptions)] + descriptions

   # fit = learns vocab + inverse doc freq stat from subjDescriptions
   # transform = converts subjDescriptions -> matrix of TF-IDF features
   # tfidf_matrix = row = doc; col = term's TF-IDF score in doc
   tfidf_matrix = vectorizer.fit_transform(all_descriptions)

   # calc cosine sim btwn vector pairs in tfidf_matrix
   # cosine_sim_matrix = matrix (i, j) -> rep. cosine sim btwn ith & jth doc; 0-1 values
   cosine_sim_matrix = cosine_similarity(tfidf_matrix)

   return cosine_sim_matrix

def buildWeightedGraph():
   '''
   overall idea: use the cosine_sim_matrix && create a graph based on an avg threshold calculated from np.mean(cosine_sim_matrix) in main.py
   '''
   pass

