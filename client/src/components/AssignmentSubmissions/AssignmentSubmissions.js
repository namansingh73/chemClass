import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import alertActions from '../../store/alert/alert-actions';
import PopupCard from '../../layout/PopupCard/PopupCard';
import UserItem from './UserItem';
import styles from './AssignmentSubmissions.module.css';

const AssignmentSubmissions = (props) => {
  const dispatch = useDispatch();
  const subject = useSelector(({ subject }) => subject);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(
          `/api/v1/classrooms/posts/${props.post._id}/assignmentSubmission`
        );

        setSubmissions(res.data.submissions);
        setLoading(false);
      } catch (err) {
        dispatch(
          alertActions.alert({
            alertType: 'Error',
            info: 'Cannot get submissions!',
          })
        );
        props.onClose();
      }
    };

    fetchSubmissions();
  }, [dispatch, props]);

  return (
    <PopupCard onClose={props.onClose}>
      <h2 className={styles.heading}>Submissions</h2>
      {subject.students.length === 0
        ? 'No students'
        : subject.students.map((student) => (
            <UserItem
              key={student._id}
              type='student'
              user={student}
              isDisabled={
                !!subject.disabledStudents.find((id) => student._id === id)
              }
            />
          ))}
    </PopupCard>
  );
};

export default AssignmentSubmissions;
