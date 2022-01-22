import React from 'react';
import styles from './CommentItem.module.css';
import commentAuthor from './commentAuthor.png';

const CommentItem = () => {
  return (
    <div className={styles.commentItem}>
      <img
        src={commentAuthor}
        className={styles.commentAuthorIcon}
        alt='Avatar icon'
      />
      <div className={styles.commentInfo}>
        <div className={styles.commentHeader}>
          <span className={styles.authorName}>Jonas</span>
          <span className={styles.time}>11:59 PM</span>
          <button className={styles.deleteCommentBtn}>
            <i className='far fa-trash-alt'></i>
          </button>
        </div>

        <div className={styles.commentBody}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore
          necessitatibus ab quod ut ipsa velit odio beatae architecto sint
          laboriosam.
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
