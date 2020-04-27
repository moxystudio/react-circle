import React, { useState, useCallback } from 'react';
import Circle from '@moxy/react-circle';

import styles from './index.module.css';

const Home = () => {
    const [percentage, setPercentage] = useState(0.3);
    const [counter, setCounter] = useState(0);
    const buttonCallback = useCallback(() => {
        setPercentage(percentage === 0.3 ? 0.7 : 0.3);
    }, [percentage]);
    const transitionCallback = useCallback(() => {
        setCounter(counter + 1);
    }, [counter]);

    return (
        <div className={ styles.home }>
            <h1>react-circle</h1>
            <button onClick={ buttonCallback }>Toggle circle</button>
            <Circle
                className={ styles.circle }
                strokeWidth={ 2 }
                strokePercentage={ percentage }
                direction="bothSides"
                onTransitionEnd={ transitionCallback } />
            <div>Transition has finished { counter } times</div>
        </div>
    );
};

export default Home;
