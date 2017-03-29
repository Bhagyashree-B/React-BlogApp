import firebase from 'firebase'

const config = {
  // apiKey: "AIzaSyDHL6JFTyBcaV60WpE4yXfeO0aZbzA9Xbk",
  // authDomain: "practice-auth.firebaseapp.com",
  // databaseURL: "https://practice-auth.firebaseio.com",
   apiKey: "AIzaSyASDyA-6G2ew5g_9emQpm6bnZSZxyW9dHY",
    authDomain: "reactdb-75770.firebaseapp.com",
    databaseURL: "https://reactdb-75770.firebaseio.com",
    storageBucket: "reactdb-75770.appspot.com",
    messagingSenderId: "651835472212"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth