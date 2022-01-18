import React, { useState } from 'react';
import SubjectCard from './SubjectCard';
import styles from './RightBlockItem.module.css';
import userImage from './user.png';
import commentImage from './userComment.png';

const RightBlockItem = (props) => {
  const [commentIsFocused, setCommentisFocused] = useState(false);

  const commentChangeHandler = (e) => {
    e.target.style.height = 0;
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <SubjectCard noPadding>
      <div className={styles.header}>
        <img
          src={userImage}
          alt={props.instructor}
          className={styles.instructorIcon}
        />
        <div className={styles.instructorTime}>
          <p className={styles.instructor}>{props.instructor}</p>
          <p className={styles.time}>11:51 PM</p>
        </div>
      </div>
      <div className={styles.mainContent}>Hello....</div>
      <div className={styles.addComment}>
        <img
          src={commentImage}
          className={styles.addCommentIcon}
          alt='Profile Icon'
        />
        <form
          className={`${styles.addCommentForm} ${
            commentIsFocused && styles.addCommentForm__focused
          }`}
        >
          <textarea
            type='text'
            placeholder='Add class comment...'
            className={styles.addCommentInput}
            rows='1'
            onChange={commentChangeHandler}
            onKeyUp={commentChangeHandler}
            onFocus={() => setCommentisFocused(true)}
            onBlur={() => setCommentisFocused(false)}
          />
          <button className={styles.addCommentBtn}>
            <i className='far fa-paper-plane'></i>
          </button>
        </form>
      </div>
    </SubjectCard>
  );
};

export default RightBlockItem;
