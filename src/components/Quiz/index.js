// Comme on a fait que des composants de type fonction, on va faire une classe ici pour changer
import { Component } from 'react';
import { Levels } from '../Levels';
import  ProgressBar  from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';
import { createRef } from 'react';
import { toast } from 'react-toastify';
import { QuizOver } from '../QuizOver';
import { FaChevronRight } from 'react-icons/fa';


const initialState = {
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false,
    quizEnd : false,
}

const levelNames = ["debutant", "confirme", "expert"];

export class Quiz extends Component {

    constructor(props) {
        super(props)
        this.state = initialState;
    }

    // Petit entrainement pour changer : utilisation de createRef et de la propriété current
    storedDataRef = createRef();

    // On va aller chercher les questions 'débutantes' (level en param)
    loadQuestions = (quizz) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            this.storedDataRef.current = fetchedArrayQuiz;
            // Ici avec map, on va créer un nouveau tableau qui ne contiendra pas les réponses aux questions !
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);

            this.setState({
                storedQuestions: newArray
            })

        } else {
            console.log("Pas assez de questions");
        }
    }

    showToastMsg = (pseudo) => {
        if (!this.state.showWelcomeMsg) {

            this.setState({
                showWelcomeMsg: true
            });

            toast.warn(`Welcome ${pseudo} & Good Luck !`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    componentDidMount() {
        this.loadQuestions(levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.storedQuestions !== prevState.storedQuestions) && (this.state.storedQuestions.length)) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if ((this.state.idQuestion !== prevState.idQuestion) && (this.state.storedQuestions.length)) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: false
            })
        }

        if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo);
        }
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    getPercent = (maxQuestions, score) => (score / maxQuestions) * 100;

    gameOver = () => {
        const gradePercent = this.getPercent(this.state.maxQuestions, this.state.score);

        this.setState({
            quizEnd: true
        });

        if (gradePercent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: gradePercent
            });
        } else {
            this.setState({
                percent: gradePercent 
            });
        }
    }
    
    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.setState(
                {
                    quizEnd: true
                },
                () => {
                    this.gameOver();
                }
            );
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1
            }))
            // Dans le if en cas de bonne réponse, on peut mettre le toast success
            toast.success(`Well done ! +1 pt`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                });
        } else {
            toast.error(`Wrong !`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    loadLevelQuestions = (param) => {
        this.setState({
            ...initialState, quizLevel: param
        })

        this.loadQuestions(levelNames[param]);
    }

    render() {
        // destructuring
        // const { pseudo } = this.props.userData;

        const displayOptions = this.state.options.map((option, index) => {
            return(
                <p key={index} 
                className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                onClick={() => this.submitAnswer(option)}

                >
                <FaChevronRight /> {option} </p>
            )
        })

        return this.state.quizEnd ? (
            <QuizOver 
                ref={this.storedDataRef}
                levelNames={levelNames}
                score={this.state.score}
                maxQuestions={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) :
        (
            <>
                {/* <h2>Pseudo: {pseudo}</h2> */}

                <Levels levelNames={levelNames}
                    quizLevel={this.state.quizLevel}/>
                <ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestions}/>

                <h2>{this.state.question}</h2>

                {displayOptions}

                <button 
                    disabled={this.state.btnDisabled} 
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                {/* Conditions pour transformer le bouton suivant en terminer */}
                {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}
                </button>
            </>
        )
    }

}