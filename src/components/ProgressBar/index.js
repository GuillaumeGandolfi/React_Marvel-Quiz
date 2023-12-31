import { memo } from "react";


const ProgressBar = ({idQuestion, maxQuestions}) => {

    const getPercent = (totalQuestions, questionId) => {
        return(100 / totalQuestions * questionId)
    }

    const actualQuestion = idQuestion + 1;

    const progressPercent = getPercent(maxQuestions, actualQuestion);

    return(
        <>
        <div className="percentage">
            <div className="progressPercent">{`Question : ${idQuestion + 1}/${maxQuestions}`}</div>
            <div className="progressPercent">{`Progression : ${progressPercent}%`}</div>
        </div>
        <div className="progressBar">
            <div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
        </div>
        </>
    )
}

export default memo(ProgressBar);