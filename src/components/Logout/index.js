import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {

    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    // Au départ, checked est false (défini juste au dessus)
    useEffect(() => {
        // Si le checked passe true, il faut déconnecter l'utilisateur
        if(checked) {
            signOut(auth).then(() => {
                // Si la déconnexion a bien été effectuée
                console.log("Déconnexion réussie");
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }).catch((error) => {
                // Sinon, s'il y a une erreur
                console.log("Oups, une erreur est survenue");
            });
        }
    }, [checked, navigate]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

    return(
        <div className="logoutContainer">
            <label className="switch">
                <input type="checkbox" onChange={handleChange} checked={checked} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}