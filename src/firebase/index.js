import firebase from 'firebase/app'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJ_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
}

export const firebaseApp = firebase.initializeApp(config)
export const firebaseDb = firebase.database()
export const firebaseAuth = firebase.auth()
export const firebasePlayers = firebase.database().ref('players')
export const firebaseGames = firebase.database().ref('games')
export const firebaseQueue = firebase.database().ref('queue')
