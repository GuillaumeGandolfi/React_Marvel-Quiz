import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../Firebase/firebaseConfig";
import { Link, useNavigate } from 'react-router-dom';

import { setDoc, doc } from "firebase/firestore";


export const Signup = () => {

    const navigate = useNavigate();

    // On crée un objet contenant les champs de notre formulaire, on les initialise en valeur vide
    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    // Avec useState() on va créer un état local à notre composant Signup
    // Dans le tableau on met la valeur actuelle de l'état et une fonction pour le mettre à jour
    // En résumé ici loginData va stocker les valeurs du formulaire (initialiser vide) 
    // et on pourra les mettre à jour avec la fonction set (setteur)
    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState('');

    /* Pour expliquer un peu le but de cette méthode 
    lorsqu'un user entrera une valeur dans un champ, l'évenement onChange va s'enclencher, on va alors
    appeler la méthode handleChange et passer l'objet 'event' en param
    On utilise la méthode setLoginData (setteur de useState) pour mettre à jour loginData
    La nouvelle valeur de l'état est créée en utilisant le spread operator pour copier toutes les 
    propriétés de l'objet 'loginData'
    Ensuite on utilise [event.target.id] pour spécifier la propriété de l'objet à mettre à jour
    Puis on cible la value pour récupérer la nouvelle valeur et l'assigner à la prop correspondante de loginData*/
    const handleChange = (event) => {
        setLoginData({...loginData, [event.target.id]: event.target.value})
    }


    const handleSubmit = e => {
        e.preventDefault();
        const { email, password, pseudo } = loginData;
        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            return setDoc(doc(database, `users/${authUser.user.uid}`), {
                pseudo,
                email
            });
        })
        .then(() => {
            setLoginData({...data});
            // redirection
            navigate('/welcome');
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        })
    }


    // destructuring de liginData, pour ne pas appeler à chaque fois dans les value des input
    // exemple : au lieu de faire value={loginData.pseudo} on va faire value={pseudo}
    const { pseudo, email, password, confirmPassword } = loginData;

    // Maintenant on peut ajouter une condition qui affiche le bouton de validation 
    // de l'inscription que si les champs sont remplis
    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ?
    <button disabled>Inscription</button> : <button>Inscription</button>

    // gestion des erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>;

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup"></div>
                <div className="formBoxRight">
                    <div className="formContent">

                    {errorMsg}

                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                            {/* Bouton inscription */}
                            { btn }
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit ? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}