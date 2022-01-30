import React, { useState, Fragment } from 'react';
import JoinClassroom from '../JoinClassroom/JoinClassroom';
import styles from './AddClass.module.css';
import bgImage from '../../images/addClass.jpg';

const AddClass = (props) => {
  const [displayJoinClassPopup, setDisplayJoinClassPopup] = useState(false);

  return (
    <Fragment>
      {displayJoinClassPopup && (
        <JoinClassroom
          onClassJoined={props.onClassJoined}
          onClose={() => setDisplayJoinClassPopup(false)}
        />
      )}

      <div
        className={styles.addClassCard}
        onClick={() => {
          setDisplayJoinClassPopup(true);
        }}
      >
        <img src={bgImage} alt='Join class' className={styles.image} />
        <span className={styles.text}>Join class</span>
      </div>
    </Fragment>
  );
};

export default AddClass;
