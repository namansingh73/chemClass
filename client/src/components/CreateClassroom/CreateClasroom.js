import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import PopupCard from '../../layout/PopupCard/PopupCard';
import Input from '../../utils/Input/Input';
import Button from '../../utils/Button/Button';
import styles from './CreateClasroom.module.css';

const CreateClassroom = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [classroomName, setClassroomName] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const data = { name: classroomName };
      const res = await axios.post('/api/v1/classrooms/', data);
      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Classroom created successfully!',
        })
      );
      props.onClose();
      navigate(`/classrooms/${res.data.data._id}/0`);
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
        <h2 className={styles.heading}>Create new Class!</h2>
        <p>Welcome back!</p>
        <Input
          id='clasroomName'
          type='text'
          placeholder='Enter class name'
          required
          onChange={(event) => setClassroomName(event.target.value)}
          value={classroomName}
        />
        <Button color='blue' rounded disabled={loading} loading={loading}>
          <i className='fab fa-telegram-plane'></i> Create
        </Button>
      </form>
    </PopupCard>
  );
};

export default CreateClassroom;
