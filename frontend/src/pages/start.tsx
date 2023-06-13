import React from 'react';
import styles from '@/styles/start.module.css';

const Start: React.FC = () => {
  return (
    <div>
      <img className={styles['background-image']} src="./image/start.svg" alt="Background Image" />
      <div className={styles['button-container']}>
        <a href="main" className={styles.button} id="start-button">
          START
        </a>
      </div>
      <div id="svg-container" className={styles['svg-container']}>
        <img className={styles['svg-image']} src="./image/start1.svg" alt="SVG Image 1" />
        <img className={styles['svg-image']} src="./image/start2.svg" alt="SVG Image 2" />
        <img className={styles['svg-image']} src="./image/start3.svg" alt="SVG Image 3" />
      </div>
    </div>
  );
};

export default Start;
