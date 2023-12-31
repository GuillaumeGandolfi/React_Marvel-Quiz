import { Logout } from "../Logout";
import { Quiz } from "../Quiz";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { ToastContainer } from 'react-toastify';
import { Loader } from "../Loader";
import 'react-toastify/dist/ReactToastify.css';

export const Welcome = (props) => {

    const navigate = useNavigate();

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user) => {
            user ? setUserSession(user) : navigate('/');
        });

        if (!!userSession) {

            const colRef = user(userSession.uid);
            getDoc(colRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const docData = snapshot.data();
                        setUserData(docData);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        return listener();
        
    }, [navigate, userSession]);

    // On va vérifier la valeur de useSession
    // Si c'est nul (c'est le cas ici pour l'instant) on va afficher un loader
    // Sinon, on retourne la page avec le quiz (et le bouton pour se logout)

    return userSession === null ? (
        // En JSX les éléments doivent être dans un élément parent,
        // Pour ne pas surcharger de div, on utiliser un fragment

        <Loader loadingMsg={"Authentification ..."}
        styling={{textAlign: 'center', color: '#FFFFFF'}}
        />
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <ToastContainer />
                <Quiz userData={userData} />
            </div>
        </div>
    )
}