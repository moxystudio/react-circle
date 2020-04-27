import React from 'react';
import Circle from '@moxy/react-circle';

import styles from './index.module.css';

const Home = () => (
    <div className={ styles.home }>
        <h1>react-lib-template</h1>
        <Circle className={ styles.circle } strokeWidth="2" strokePercentage="0.7" direction="clockwise" />
    </div>
);

export default Home;
