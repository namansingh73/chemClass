import React, { useState, useMemo } from 'react';
import styles from './Comments.module.css';
import CommentItem from './CommentItem';

const commentsAll = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
];

const Comments = () => {
  // testing ke lie abhi random daal rakha h baad mei hata denge

  const comments = useMemo(() => {
    const results = [];

    for (let i = 0; i < parseInt(5 * Math.random()); ++i) {
      results.push(commentsAll[i]);
    }

    return results;
  }, []);

  const [showAll, setShowAll] = useState(false);

  const clickHandler = () => {
    setShowAll((showAll) => !showAll);
  };

  if (comments.length === 0) {
    return null;
  }

  return (
    <div className={styles.commentsContainer}>
      <button className={styles.commentsExpandBtn} onClick={clickHandler}>
        <i className='fas fa-user-friends'></i> {comments.length} class comments
      </button>

      {showAll && comments.map((comment) => <CommentItem key={comment.id} />)}
      {!showAll && <CommentItem />}
    </div>
  );
};

export default Comments;
