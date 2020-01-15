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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
  
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error)
        {
            console.log('Error Creating User', error.message);
        }
    }
    return userRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
      const collectionRef = firestore.collection(collectionKey);
      console.log(collectionRef);

      const batch = firestore.batch();
      documentsToAdd.forEach(obj => {
          const newDocRef = collectionRef.doc();
          console.log(newDocRef);
          batch.set(newDocRef, obj);
      });

      return await batch.commit()
  }

  export const convertCollectionsSnapshotToMap = (collections) => {
      const transformedCollection = collections.docs.map(doc => {
          const {title,items} = doc.data();
          return {
              routeName: encodeURI(title.toLowerCase()),
              id: doc.id,
              title,
              items
          };
      });

      return transformedCollection.reduce((accumulator,collection) => {
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;
      }, {});
  }

  export const getCurrentUser = () => {
      return new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged(userAuth => {
              unsubscribe();
              resolve(userAuth);
          }, reject)
      });
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


  export default firebase;
