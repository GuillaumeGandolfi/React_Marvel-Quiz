// Comme on a fait que des composants de type fonction, on va faire une classe ici pour changer
import { Component } from 'react';
import { Levels } from '../Levels';
import { ProgressBar } from '../ProgressBar';

export class Quiz extends Component {
    
    render() {

        // destructuring
        // const { pseudo } = this.props.userData;

        return(
            <div>
                {/* <h2>Pseudo: {pseudo}</h2> */}

                <Levels/>
                <ProgressBar/>

                <h2>Notre question quiz</h2>
                <p className="answerOptions">Question 1</p>
                <p className="answerOptions">Question 2</p>
                <p className="answerOptions">Question 3</p>
                <p className="answerOptions">Question 4</p>
                <button className="btnSubmit">Suivant</button>
            </div>
        )
    }

}