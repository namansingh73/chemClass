import React, { useState } from 'react';
import styles from './Comments.module.css';
import CommentItem from './CommentItem';

const Comments = (props) => {
  const [showAll, setShowAll] = useState(false);

  const clickHandler = () => {
    setShowAll((showAll) => !showAll);
  };

  if (props.post.comments.length === 0) {
    return null;
  }
  return (
    <div className={styles.commentsContainer}>
      <button className={styles.commentsExpandBtn} onClick={clickHandler}>
        <i className='fas fa-user-friends'></i> {props.post.comments.length}{' '}
        class comments
      </button>

      {showAll &&
        props.post.comments
          .slice()
          .reverse()
          .map((comment) => (
            <CommentItem comment={comment} key={comment._id} />
          ))}
      {!showAll && (
        <CommentItem
          comment={props.post.comments[props.post.comments.length - 1]}
        />
      )}
    </div>
  );
};

export default Comments;
