import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAnZxot-T_i4vqQM5qofBIF1I2ley2qwS0",
    authDomain: "crwn-db-ed205.firebaseapp.com",
    databaseURL: "https://crwn-db-ed205.firebaseio.com",
    projectId: "crwn-db-ed205",
    storageBucket: "crwn-db-ed205.appspot.com",
    messagingSenderId: "30829723553",
    appId: "1:30829723553:web:c680a14255d595c09015e0",
    measurementId: "G-TEC2VFBF01"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase;
