import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Landing = () => {

    const [btn, setBtn] = useState(false);

    /* Le hook useRef est utilisé pour créer une référence mutable dans un composant React. 
    Il est couramment utilisé pour accéder aux éléments du DOM ou pour stocker des valeurs 
    mutables qui persistent entre les rendus du composant. */

    /* Ici j'utilise useRef pour créer une référence à l'élément DOM avec la variable refWolverine 
    Une fois la référence créée, on peut l'attacher à un élément DOM spécifique en utilisant 
    l'attribut 'ref' dans la balise JSX correspondante*/

    /* Sur la doc React il est écrit : 
    Changing a ref does not trigger a re-render. This means refs are perfect for storing 
    information that doesn’t affect the visual output of your component */

    const refWolverine = useRef(null);
    // console.log(refWolverine);

    /* Et ici j'utilise useEffect pour qu'un 'effet' (une fonction) soit exécuté après que le 
    rendu (render) du composant soit effectué
    Ici j'ajoute la class CSS startingImg à mon image (que je récupère gràce à useRef), permettant
    de mettre une image de wolverine mais cette fois avec ses griffes (on ne voit pas les griffes apparaitre car trop rapide) */

    useEffect(() => {
        refWolverine.current.classList.add("startingImg")
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 2000);
        /* Le deuxième argument de useEffect, ici le tableau, spécifie les valeurs devant être 'surveillées'
        pour déclencher l'exécution de l'effet. Ici je laisse un tableau vide pour que l'effet s'exécute une seule fois après le premier rendu */
    }, []);

    // Fonction qui s'enclenchera quand on survolera le bouton gauche
    const setLeftImg = () => {
        refWolverine.current.classList.add("leftImg");
    }

    // Pareil pour le bouton droit
    const setRightImg = () => {
        refWolverine.current.classList.add("rightImg");
    }

    // Et il faut une fonction qui permettent de supprimer cette classe lorsque l'on ne survole plus le bouton
    const clearImg = () => {
        if (refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg");
        } else if (refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg");
        }
    }

    /* Avec cette condition, au départ, on aura pas les boutons, puis après 3 secondes, les griffes 
    de Wolverine vont disparaitre (changement d'image), on fait passer btn en true, et ils vont appraitre ! 
    Cela grâce au hook useState, qui permet de gérer des States dans des composants fonction */
    const displayBtn = btn && (
        <>
            {/* 2 boutons : un bouton d'inscription et un bouton de connexion
                A l'aide de flexbox on va placer les boutons à gauche et à droite de wolverine */}
            <div className="leftBox">
                {/* Link à la place de button pour rediriger le click, il faut rajouter 'to' */}
                <Link onMouseOver={setLeftImg} to="/signup" onMouseOut={clearImg} className="btn-welcome">Inscription</Link>
            </div>
            <div className="rightBox">
                <Link onMouseOver={setRightImg} to="/login" onMouseOut={clearImg} className="btn-welcome">Connexion</Link>
            </div>
        </>
    )

    return (
        // Ici l'attribut 'ref' de useRef :
        <main ref={refWolverine} className="welcomePage">
            { displayBtn }
        </main>
    )
}