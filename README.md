This project demonstrates a working application that uses a React frontend, with a backend build with ExpressJS and MongoDB to run without a physical server. It shows how the client can make client HTTP requests and maintain persistant sessions. 

## Stack
### Front-end: React
### Back-end: NodeJS, Express & Google Cloud Services(Authentication, Storage, Functions, Firestore Database)

## Getting starter
### Steps to run in development mode:~
  1. Forrk the repo and clone it.
  2. Make sure tou have NodeJS and Firebase-JS-SDK installed.
  3. Open two terminal windows (one for running the server and other fot the UI).
  4. In the first terminal go to server folder `cd server/func`.
  5. [Only once] Run (from the root) `npm install`.
  6. Create an empty file called `.env`.
  7. If you don't have it, go to Google console and create a new project.
  8. Get the service account json file, the database and storage urls for your project.
  9. Populate your .env file with the data from service account like the example below:  
  ```json  
  TYPE=              "type"
  PROJECT_ID=        "project_id" 
  PRIVATE_KEY_ID=    "private_key_id"
  PRIVATE_KEY        "private_key"
  CLIENT_ID          "client_id"    
  CLIENT_EMAIL       "client_email"    
  AUTH_URI           "auth_uri"    
  TOKEN_URI          "token_uri"     
  AUTH_CERT_URL      "auth_provider_x509_cert_url"     
  CLIENT_CERT_URL    "client_x509_cert_url"     
  STORAGE_BUCKET=    "storageBucket"
  DATABASE_URL=      "databaseURL"
  ```
  10. Go to the parent folder and start it `cd ../ && firebase serve`.
  11. In your second terminal go to client `cd client`.
  12. Install the dependencies `npm install`.
  13. As in step 9 create a `.env` file and populate it with your project data like the example below:  
  ```json
  REACT_APP_API_KEY=               "apiKey"
  REACT_APP_AUTH_DOMAIN=           "authDomain"
  REACT_APP_DATABASE_URL=          "databaseURL"
  REACT_APP_CLIENT_PROJECT_ID=     "projectId"
  REACT_APP_STORAGE_BUCKET=        "storageBucket"
  REACT_APP_MESSAGING_SENDER_ID=   "messagingSenderId"
  REACT_APP_APP_ID=                "appId"
  ```
  14. Start the UI client `npm start`
