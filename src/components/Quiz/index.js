// Comme on a fait que des composants de type fonction, on va faire une classe ici pour changer
import { Component } from 'react';

export class Quiz extends Component {
    
    render() {

        // destructuring
        const { pseudo } = this.props.userData;

        return(
            <div>
                <h2>Pseudo: {pseudo}</h2>
            </div>
        )
    }

}