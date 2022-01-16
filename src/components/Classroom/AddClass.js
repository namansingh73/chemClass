import React from 'react';
import styles from './AddClass.module.css';
import bgImage from '../../pages/Classroom/images/bgImage.jpg';

const AddClass = () => {
  return (
    <div className={styles.addClassCard}>
      <img src={bgImage} alt='Join class' className={styles.image} />
      <span className={styles.text}>Join class</span>
    </div>
  );
};

export default AddClass;
