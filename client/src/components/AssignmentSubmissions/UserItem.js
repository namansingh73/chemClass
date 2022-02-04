import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import subjectActions from '../../store/subject/subject-actions';
import alertActions from '../../store/alert/alert-actions';
import Tooltip from '../../utils/Tooltip/Tooltip';
import avatarStudent from './avatarStudent.png';
import avatarInstructor from './avatarInstructor.png';
import styles from './UserItem.module.css';

const UserItem = (props) => {
  const dispatch = useDispatch();
  const subject = useSelector(({ subject }) => subject);
  const auth = useSelector(({ auth }) => auth);
  const isInstructor = auth.user._id === subject.instructor._id;

  const [loading, setLoading] = useState(false);

  const clickHandler = async (event) => {
    if (loading) {
      return;
    }

    if (!window.confirm(`${props.isDisabled ? 'Enable' : 'Disable'} user?`)) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `/api/v1/classrooms/${subject._id}/students/${props.user._id}/${
          props.isDisabled ? 'enable' : 'disable'
        }`
      );

      const updatedSubject = res.data.classroom;
      dispatch(subjectActions.updateSubject(updatedSubject));
      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'User status updated successfully!',
        })
      );
    } catch (err) {
      if (err.response) {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: err.response.data.message,
          })
        );
      } else {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: 'Something went wrong!',
          })
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.outerContainer}>
      <img
        src={
          props.user.photo?.url ||
          (props.type === 'instructor' ? avatarInstructor : avatarStudent)
        }
        alt={props.user.name}
        className={styles.avatarIcon}
      />
      <div
        className={`${styles.name} ${
          props.isDisabled && styles.name__disabled
        }`}
      >
        {props.user.name}
        {auth.user._id === props.user._id && ' (You)'}
      </div>
      {isInstructor && props.type !== 'instructor' && (
        <Tooltip
          onClick={clickHandler}
          direction='left'
          hoverText={props.isDisabled ? 'Enable' : 'Disable'}
          DomElement='button'
          className={`${styles.button} ${
            props.isDisabled && styles.button__disable
          }`}
        >
          {props.isDisabled ? (
            <i className='fas fa-user-check'></i>
          ) : (
            <i className='fas fa-user-times'></i>
          )}
        </Tooltip>
      )}
    </div>
  );
};

export default UserItem;
