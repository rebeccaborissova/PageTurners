# PageTurners
This application provides customized book recommendations for a user based on their input.

Note: While using the application, when prompted to enter a book, please be sure to enter a book that we have in our dataset (books.csv). Otherwise, the application will not provide you with relevant recommendations!

## Demo<br>
[![PageTurners - DSA Summer '24 | Expo Go, Python, Flask, React Native](https://img.youtube.com/vi/ARF130incFA/0.jpg)](https://www.youtube.com/watch?v=ARF130incFA)

## To run this application

1. Ensure you have the following dependencies installed:
   - Git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
   - Node.js: https://nodejs.org/en
   - Python: https://www.python.org/downloads/
   - Pip: https://pip.pypa.io/en/stable/installation/
2. Clone the repository.
3. Download the Expo Go app on your phone.
4. Open 2 terminal tabs in this folder - one for the frontend and one for the backend.
   - If you are on Windows, please use Powershell with administrator privileges
5. In the backend tab run:
   ```
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
   - If you are on MacOS, you may need to disable AirPlay reciever in your settings app in order for this to run
6. In the frontend tab run:
   ```
   cd page-turner
   npm install
   npm start
   ```
   You should then see a QR code in your terminal<br>
   - If you have an iPhone, click "i" in the terminal, then go to your Camera app and scan the QR code.
   - If you have an android, go to the Expo Go app and select the option to scan a QR code in the app.
7. Run the application in Expo Go on your mobile device!
