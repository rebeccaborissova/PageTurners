# PageTurners
Final project for COP3530 Data Structures &amp; Algorithms.<br>
This application provides customized book recommendations for a user based on their input.

Demo:<br>
[![PageTurners - DSA Summer '24 | Expo Go, Python, Flask, React Native](https://img.youtube.com/vi/ARF130incFA/0.jpg)](https://www.youtube.com/watch?v=ARF130incFA)

To run this application, 

1. Clone the repository.
2. Download the Expo Go app on your phone.
3. Open 2 terminal tabs in this folder - one for the frontend and one for the backend.
4. In the backend tab run:
   ```
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
5. In the frontend tab run:
   ```
   cd page-turner
   npm install
   npm start
   ```
   You should then see a QR code in your terminal<br>
   - If you have an iPhone, click "i" in the terminal, then go to your Camera app and scan the QR code.
   - If you have an android, go to the Expo Go app and select the option to scan a QR code in the app.

Note: While using the application, when prompted to enter a book, please be sure to enter a book that we have in our dataset (books.csv). Otherwise, the application will not provide you with relevant recommendations!
