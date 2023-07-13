// Pour ne pas à avoir faire tout le côté back de ce projet (le but c'est de pratiquer React !
// j'utilise firebase qui fournit des fonctionnalités back-end)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Pour la base de données créée sur firebase
import { getFirestore, doc } from 'firebase/firestore';

// Le code ci-dessus a été obtenu sur firebase, dans le projet que j'ai crée
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const database = getFirestore(app);

export const user = (uid) => {
    return doc(database, `users/${uid}`);
}
