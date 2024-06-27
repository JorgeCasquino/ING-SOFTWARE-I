import pyrebase

firebaseConfig = {
  "apiKey: AIzaSyDpzu9eI4FkCLyWcU5SylI3NWDLQCo3Cpc",
  "authDomain: traductor-ia.firebaseapp.com",
  "projectId: traductor-ia",
  "storageBucket: traductor-ia.appspot.com",
  "messagingSenderId: 143522908534",
  "appId: 1:143522908534:web:a5dd0f0758fd3562079257",
  "measurementId: G-KN2R5GSV3R"
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
