import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useState, useEffect } from 'react';

export const Login = () => {

    const navigate = useNavigate();

    // Pour différencier de signup, on va ici créer un useState pour chaque champ
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true);
        } else if (btn) { 
            setBtn(false);
        }
    }, [password, email, btn])
    
    const handleSubmit = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            setEmail('');
            setPassword('');
            navigate('/welcome', {replace: true});
        })
        .catch(erorr => {
            setError(error);
            setEmail('');
            setPassword('');
        })
    }

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {error !== '' && <span>{error.message}</span>}

                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" autoComplete="off" required />
                                <label htmlFor="password">Password</label>
                            </div>

                            {/* Condition pour activer le bouton de connexion */}
                            {/* {btn ? <button>Connexion</button> : <button disabled>Connexion</button>} */}
                            {/* Pour ne pas dupliquer le bouton on peut plutôt faire ça : */}
                            {<button disabled = {btn ? false : true}>Connexion</button>}

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant.</Link>
                            <br/>
                            <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié ? Récupérez-le ici.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}