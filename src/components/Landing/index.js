import { useRef, useEffect, useState } from "react";

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

    /* Avec cette condition, au départ, on aura pas les boutons, puis après 3 secondes, les griffes 
    de Wolverine vont disparaitre (changement d'image), on fait passer btn en true, et ils vont appraitre ! 
    Cela grâce au hook useState, qui permet de gérer des States dans des composants fonction */
    const displayBtn = btn && (
        <>
            {/* 2 boutons : un bouton d'inscription et un bouton de connexion
                A l'aide de flexbox on va placer les boutons à gauche et à droite de wolverine */}
            <div className="leftBox">
                <button className="btn-welcome">Inscription</button>
            </div>
            <div className="rightBox">
                <button className="btn-welcome">Connexion</button>
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