import React from 'react';
import styles from './AddClass.module.css';
// import addIcon from '../../pages/Classroom/images/add.png';
import bgImage from '../../pages/Classroom/images/bgImage.jpg';

const AddClass = () => {
  return (
    <div className={styles.addClassCard}>
      <img src={bgImage} alt='Join class' className={styles.image} />
      {/* <img src={addIcon} alt='Add a class' className={styles.icon} /> */}
      <span className={styles.text}>Join class</span>
    </div>
  );
};

export default AddClass;
