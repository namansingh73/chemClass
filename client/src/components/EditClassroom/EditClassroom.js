import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import subjectActions from '../../store/subject/subject-actions';
import Input from '../../utils/Input/Input';
import PopupCard from '../../layout/PopupCard/PopupCard';
import Button from '../../utils/Button/Button';
import styles from './EditClassroom.module.css';

const EditClassroom = (props) => {
  const subject = useSelector(({ subject }) => subject);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(subject.name);
  const [meetLink, setMeetLink] = useState(subject.meetLink);

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const data = { name, meetLink };
      const res = await axios.patch(`/api/v1/classrooms/${subject._id}`, data);

      const updatedSubject = res.data.classroom;
      dispatch(subjectActions.updateSubject(updatedSubject));
      dispatch(
        alertActions.alert({
          alertType: 'Success',
          info: 'Subject updated successfully!',
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
  };

  return (
    <PopupCard onClose={props.onClose}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles.heading}>Edit Classroom Details</h2>
        <p>You can edit name and meet link</p>
        <Input
          id='name'
          type='name'
          placeholder='Classroom'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id='link'
          type='url'
          placeholder='meet-link'
          value={meetLink}
          onChange={(e) => setMeetLink(e.target.value)}
        />

        <Button color='blue' rounded disabled={loading} loading={loading}>
          <i className='fab fa-telegram-plane'></i> Submit
        </Button>
      </form>
    </PopupCard>
  );
};

export default EditClassroom;
