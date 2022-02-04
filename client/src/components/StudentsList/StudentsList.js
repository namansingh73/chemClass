import React from 'react';
import { useSelector } from 'react-redux';
import PopupCard from '../../layout/PopupCard/PopupCard';
import UserItem from './UserItem';
import styles from './StudentsList.module.css';

const StudentsList = (props) => {
  const subject = useSelector(({ subject }) => subject);

  return (
    <PopupCard onClose={props.onClose}>
      <h2 className={styles.heading}>Instructor</h2>
      <UserItem type='instructor' user={subject.instructor} />
      <h2 className={styles.heading}>Students</h2>
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

export default StudentsList;
