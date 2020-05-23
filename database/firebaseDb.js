
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBEz0bAS3dV7AZkmipNexnxqNbwLEdgBkE",
  authDomain: "hflnewdb.firebaseapp.com",
  databaseURL: "https://hflnewdb.firebaseio.com",
  projectId: "hflnewdb",
  storageBucket: "hflnewdb.appspot.com",
  messagingSenderId: "265302555358",
  appId: "1:265302555358:web:6ae4aa1ffe515f7676e04f",
  measurementId: "G-9B1630N5FT"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;