import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import alertActions from '../../../store/alert/alert-actions';
import subjectActions from '../../../store/subject/subject-actions';
import styles from './AddComment.module.css';
import commentImage from './addComment.png';

const AddComment = (props) => {
  const dispatch = useDispatch();

  const { user } = useSelector(({ auth }) => auth);
  const [commentIsFocused, setCommentisFocused] = useState(false);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const commentChangeHandler = (e) => {
    e.target.style.height = 0;
    e.target.style.height = e.target.scrollHeight + 'px';
    setComment(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `/api/v1/classrooms/posts/${props.post._id}/comments`,
        {
          text: comment,
        }
      );

      const post = res.data.post;
      dispatch(subjectActions.updatePost(post));
      setComment('');
      inputRef.current.style.height = 0;
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    } catch (err) {
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
    <div className={styles.addComment}>
      <img
        src={user?.photo?.url || commentImage}
        className={styles.addCommentIcon}
        alt='Profile Icon'
      />
      <form
        onSubmit={submitHandler}
        className={`${styles.addCommentForm} ${
          commentIsFocused && styles.addCommentForm__focused
        }`}
      >
        <textarea
          ref={inputRef}
          type='text'
          placeholder='Add class comment...'
          className={styles.addCommentInput}
          rows='1'
          onChange={commentChangeHandler}
          onKeyUp={commentChangeHandler}
          onFocus={() => setCommentisFocused(true)}
          onBlur={() => setCommentisFocused(false)}
          value={comment}
          required
        />
        <button disabled={loading} className={styles.addCommentBtn}>
          <i className='far fa-paper-plane'></i>
        </button>
      </form>
    </div>
  );
};

export default AddComment;
