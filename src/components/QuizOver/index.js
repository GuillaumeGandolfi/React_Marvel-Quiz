import { forwardRef, useEffect, useState } from "react"
import { GiTrophyCup } from 'react-icons/gi';
import { Loader } from "../Loader";
import { Modal } from "../Modal";

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
    console.log(API_PUBLIC_KEY);
    
    const hash = 'fc7302042914cb0234f88d0050a025ee';

    const [asked, setAsked] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const showModal = () => {
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        // L'utilisateur devra recommencer tout le quiz
        // setTimeout(() => {loadLevelQuestions(0)}, 3000)
        // Ou seulement le niveau qu'il vient de rater
        setTimeout(() => {loadLevelQuestions(quizLevel)}, 3000)
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
                                    <GiTrophyCup size='50px'/> Bravo, vous êtes un expert !</p>
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
                    styling={{textAlign: 'center', color: 'red'}}/>
                </td>
            </tr>
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
                <div className="modalHeader">
                </div>
                <div className="modalBody">
                </div>
                <div className="modalFooter">
                    <button className="modalBtn"
                    onClick={closeModal}>Fermer</button>
                </div>
            </Modal>
        </>
    )
})