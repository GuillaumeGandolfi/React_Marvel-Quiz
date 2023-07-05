// Pour ne pas à avoir faire tout le côté back de ce projet (le but c'est de pratiquer React !
// j'utilise firebase qui fournit des fonctionnalités back-end)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Le code ci-dessus a été obtenu sur firebase, dans le projet que j'ai crée
const firebaseConfig = {
    apiKey: "AIzaSyAgmNEIWI0R6FsOmvVo_vU1zbLteb_CbFQ",
    authDomain: "marvel-quiz-f74e0.firebaseapp.com",
    projectId: "marvel-quiz-f74e0",
    storageBucket: "marvel-quiz-f74e0.appspot.com",
    messagingSenderId: "72147106250",
    appId: "1:72147106250:web:9a2b979823303cffd9f733"
};

// Initialisation de Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);