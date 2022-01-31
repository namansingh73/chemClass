import React from 'react';
import commentAuthor from './commentAuthor.png';
import prettyDate from '../../../utils/HelperFunctions/prettyDate';
import styles from './CommentItem.module.css';

const CommentItem = (props) => {
  return (
    <div className={styles.commentItem}>
      <img
        src={commentAuthor}
        className={styles.commentAuthorIcon}
        alt='Avatar icon'
      />
      <div className={styles.commentInfo}>
        <div className={styles.commentHeader}>
          <span className={styles.authorName}>{props.comment.user.name}</span>
          <span className={styles.time}>
            {prettyDate(props.comment.createdAt)}
          </span>
          <button className={styles.deleteCommentBtn}>
            <i className='far fa-trash-alt'></i>
          </button>
        </div>

        <div className={styles.commentBody}>{props.comment.text}</div>
      </div>
    </div>
  );
};

export default CommentItem;
