import firebase_admin
from firebase_admin import credentials

def initialize_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate('config/firebase-adminsdk.json')
        firebase_admin.initialize_app(cred)

initialize_firebase()
