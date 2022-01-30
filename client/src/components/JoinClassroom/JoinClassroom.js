import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import PopupCard from '../../layout/PopupCard/PopupCard';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './JoinClassroom.module.css';

const JoinClassroom = (props) => {
  const dispatch = useDispatch();
  const [classCode, setClassroomCode] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      await axios.post(`/api/v1/classrooms/join/${classCode}`);
      props.onClassJoined();
      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Class joined successfully!',
        })
      );
      props.onClose();
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
    <PopupCard onClose={props.onClose}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles.heading}>Join Class!</h2>
        <p>Welcome back!</p>
        <Input
          id='classCode'
          type='text'
          placeholder='Enter class code'
          required
          onChange={(event) => setClassroomCode(event.target.value)}
          value={classCode}
        />
        <Button color='blue' rounded disabled={loading} loading={loading}>
          <i className='fab fa-telegram-plane'></i> Join
        </Button>
      </form>
    </PopupCard>
  );
};

export default JoinClassroom;
