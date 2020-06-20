import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCz83pRCCB7YVaIuFz_if422xjpz85DOZ0",
    authDomain: "project-react-ed0f8.firebaseapp.com",
    databaseURL: "https://project-react-ed0f8.firebaseio.com",
    projectId: "project-react-ed0f8",
    storageBucket: "project-react-ed0f8.appspot.com",
    messagingSenderId: "736026811310",
    appId: "1:736026811310:web:e1e50d14bfeccb06a0063f",
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists) {
          const {displayName, email} = userAuth;
          const createAt = new Date();
          try {
              await userRef.set({
                  displayName,
                  email,
                  createAt,
                  ...additionalData,
              });
          } catch (error) {
              console.log('error creating user', error.messege);
          }
      }
      return userRef;
  };

  export const auth =  firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;