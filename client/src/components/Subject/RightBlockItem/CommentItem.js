import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Linkify from 'linkify-react';
import alertActions from '../../../store/alert/alert-actions';
import subjectActions from '../../../store/subject/subject-actions';
import commentAuthor from './commentAuthor.png';
import prettyDate from '../../../utils/HelperFunctions/prettyDate';
import ShowMoreText from '../../../utils/ShowMoreText/ShowMoreText';
import styles from './CommentItem.module.css';

const CommentItem = (props) => {
  const auth = useSelector(({ auth }) => auth);
  const subject = useSelector(({ subject }) => subject);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    if (!window.confirm('Are you sure, you want to delete the comment?')) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(
        `/api/v1/classrooms/posts/${props.post._id}/comments/${props.comment._id}`
      );
      dispatch(
        subjectActions.deleteComment({
          postId: props.post._id,
          commentId: props.comment._id,
        })
      );
    } catch {
      dispatch(
        alertActions.alert({
          alertType: 'Error',
          info: 'Something went wrong!',
        })
      );
    }
    setLoading(false);
  };

  return (
    <div className={styles.commentItem}>
      <img
        src={props.comment.user.photo?.url || commentAuthor}
        className={styles.commentAuthorIcon}
        alt='Avatar icon'
      />
      <div className={styles.commentInfo}>
        <div className={styles.commentHeader}>
          <span className={styles.authorName}>{props.comment.user.name}</span>
          <span className={styles.time}>
            {prettyDate(props.comment.createdAt)}
          </span>
          {(auth.user._id === props.comment.user._id ||
            auth.user._id === subject.instructor._id) && (
            <button
              className={styles.deleteCommentBtn}
              disabled={loading}
              onClick={deleteHandler}
            >
              <i className='far fa-trash-alt'></i>
            </button>
          )}
        </div>

        <div className={styles.commentBody}>
          <Linkify options={{ target: '_blank' }}>
            <ShowMoreText text={props.comment.text} />
          </Linkify>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
