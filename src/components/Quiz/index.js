// Comme on a fait que des composants de type fonction, on va faire une classe ici pour changer
import { Component } from 'react';
import { Levels } from '../Levels';
import  ProgressBar  from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';
import { createRef } from 'react';
import { toast } from 'react-toastify';
import { QuizOver } from '../QuizOver';


export class Quiz extends Component {

    state = {
        levelNames: ["debutant", "confirme", "expert"],
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
        quizEnd : false
    }

    // Petit entrainement pour changer : utilisation de createRef et de la propriété current
    storedDataRef = createRef();

    // On va aller chercher les questions 'débutantes' (level en param)
    loadQuestions = (quizz) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        console.log(fetchedArrayQuiz);
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

    showWelcomeMsg = (pseudo) => {
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
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: false
            })
        }

        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo);
        }
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    gameOver = () => {
        this.setState({
            quizEnd: true
        })
    }
    
    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.gameOver();
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

    render() {
        // destructuring
        // const { pseudo } = this.props.userData;

        const displayOptions = this.state.options.map((option, index) => {
            return(
                <p key={index} 
                className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                onClick={() => this.submitAnswer(option)}

                >{option} </p>
            )
        })

        return this.state.quizEnd ? (
            <QuizOver 
                ref={this.storedDataRef}
            />
        ) :
        (
            <>
                {/* <h2>Pseudo: {pseudo}</h2> */}

                <Levels/>
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