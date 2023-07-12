import { forwardRef, useEffect, useState } from "react"
import { GiTrophyCup } from 'react-icons/gi';
import { Loader } from "../Loader";
import { Modal } from "../Modal";
import axios from 'axios';

export const QuizOver = forwardRef((props, ref) => {

    const {
        levelNames,
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestions
    } = props;

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;

    const hash = 'fc7302042914cb0234f88d0050a025ee';

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterData, setCharacterData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAsked(ref.current)

        if (localStorage.getItem('marvelStorageDate')) {
            const date = localStorage.getItem('marvelStorageDate');
            checkDataAge(date);
        }
    }, [ref])

    const checkDataAge = (date) => {

        const today = Date.now();
        const timeDifference = today - date;

        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if ( daysDifference >= 15 ) {
            localStorage.clear();
            localStorage.setItem('marvelStorageDate', Date.now());
        }
    }

    const showModal = (id) => {
        setOpenModal(true);

        if (localStorage.getItem(id)) {
            setCharacterData(JSON.parse(localStorage.getItem(id)));
            setLoading(false);
        } else {

            axios
                .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
                .then(response => {
                    setCharacterData(response.data);
                    // Si on a bien récupérer les données, on met le loading en false,
                    // pour que l'on puisse afficher les data dans le JSX (voir plus bas)
                    setLoading(false);

                    localStorage.setItem(id, JSON.stringify(response.data));

                    if (!localStorage.getItem('marvelStorageDate')) {
                        localStorage.setItem("marvelStorageDate", Date.now());
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const closeModal = () => {
        setOpenModal(false);
        // Et quand on ferme le modal, on remet loading à son état initial, c'est à dire true
        setLoading(true);
    }

    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        // L'utilisateur devra recommencer tout le quiz
        // setTimeout(() => {loadLevelQuestions(0)}, 3000)
        // Ou seulement le niveau qu'il vient de rater
        setTimeout(() => { loadLevelQuestions(quizLevel) }, 3000)
    }

    const decision = score >= averageGrade ? (
        <>
            <div className="stepsBtnContainer">
                {
                    quizLevel < levelNames.length ?
                        (
                            <>
                                <p className="successMsg">Bravo, passez au niveau suivant !</p>
                                <button className="btnResult success"
                                    onClick={() => loadLevelQuestions(quizLevel)}>Niveau Suivant</button>
                            </>
                        )
                        :
                        (
                            <>
                                <p className="successMsg">
                                    <GiTrophyCup size='50px' /> Bravo, vous êtes un expert !</p>
                                <button className="btnResult gameOver"
                                    onClick={() => loadLevelQuestions(0)}>Accueil</button>
                            </>
                        )
                }
            </div>

            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </>
    ) :
        (
            <>
                <div className="stepsBtnContainer">
                    <p className="failureMsg">Vous avez échoué !</p>

                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="progressPercent">Note: {score}/{maxQuestions}</div>
                </div>
            </>
        );

    const questionAnswer = score >= averageGrade ? (
        asked.map((question) => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className="btnInfo"
                            onClick={() => showModal(question.heroId)}>Infos</button>
                    </td>
                </tr>
            )
        })
    )
        :
        (
            <tr>
                <td colSpan="3">
                    <Loader loadingMsg={"Pas de réponse"}
                        styling={{ textAlign: 'center', color: 'red' }} />
                </td>
            </tr>
        )

    // Si le loading est false, on peut récupérer les data
    const resultInModal = !loading ?
        (
            <>
                <div className="modalHeader">
                    <h2>{characterData.data.results[0].name}</h2>
                </div>
                <div className="modalBody">
                    <div className="comicImage">
                        <img 
                        src={characterData.data.results[0].thumbnail.path
                        +'.'+
                        characterData.data.results[0].thumbnail.extension} 
                        alt={characterData.data.results[0].name}/>

                        <p>{characterData.attributionText}</p>
                    </div>
                    <div className="comicDetails">
                        <h3>Description</h3>
                        {
                            characterData.data.results[0].description ?
                            <p>{characterData.data.results[0].description}</p>
                            : <p>Description indisponible</p>

                        }
                        <h3>Plus d'infos</h3>
                        {
                            characterData.data.results[0].urls &&
                            characterData.data.results[0].urls.map((url, index) => {
                                return <a 
                                key={index} 
                                href={url.url}
                                target="blanck"
                                rel="noopener noreferrer"
                                >
                                    {url.type}
                                </a>
                            })
                        }
                    </div>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn"
                        onClick={closeModal}>Fermer</button>
                </div>
            </>
        )
        :
        (
            <>
                <div className="modalHeader">
                    <h2>Réponse de Marvel ...</h2>
                </div>
                <div className="modalBody">
                    <Loader />
                </div>
            </>
        )

    return (
        <>

            {decision}

            <hr />
            <p>Les réponses aux questions posées : </p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>

            <Modal showModal={openModal}>

                {resultInModal}
            </Modal>
        </>
    )
})