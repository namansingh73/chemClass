import React, { useState } from 'react';
import styles from './AddComment.module.css';
import commentImage from './addComment.png';

const AddComment = () => {
  const [commentIsFocused, setCommentisFocused] = useState(false);

  const commentChangeHandler = (e) => {
    e.target.style.height = 0;
    e.target.style.height = e.target.scrollHeight + 'px';
  };
  return (
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
  );
};

export default AddComment;
