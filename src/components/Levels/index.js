import Stepper from 'react-stepper-horizontal';
import { useEffect, useState } from 'react';

export const Levels = ({levelNames, quizLevel}) => {

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const quizStep = levelNames.map((level) => ({title: level.toUpperCase()}))
        setLevels(quizStep);
    }, [levelNames]);

    return(
        <div className="levelsContainer" style={{background:'transparent'}}>
            {/* Les props de Stepper sont disponibles sur la doc de react-stepper-horizontal */}
            <Stepper steps={ levels } activeStep={ quizLevel }
            circleTop={0} activeTitleColor={'#d31017'} activeColor={'#d31017'}
            completeTitleColor={'#E0E0E0'} defaultTitleColor={'#E0E0E0'}
            completeColor={'#E0E0E0'} completeBarColor={'#E0E0E0'}
            barStyle={'dashed'} size={45} circleFontSize={20}/>
        </div>
    )
}