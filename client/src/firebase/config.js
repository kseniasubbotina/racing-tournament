import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBrWddEMg2_gxxQk1exJukgkMo3R7iXFzk',
  authDomain: 'racing-tournament.firebaseapp.com',
  databaseURL: 'https://racing-tournament.firebaseio.com',
  projectId: 'racing-tournament',
  storageBucket: 'racing-tournament.appspot.com',
  messagingSenderId: '905990956060'
}
firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)
const usersCollection = db.collection('users')

export default {
  db,
  auth,
  currentUser,
  usersCollection
}
