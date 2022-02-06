import React from 'react';
import MiscSidebarClassEventItem from './MiscSidebarClassEventItem';
import prettyDate, {
  formattedTime,
} from '../../utils/HelperFunctions/prettyDate';
import styles from './MiscSidebarClassesEvents.module.css';

const MiscSidebarClassesEvents = (props) => {
  const countCompleted = props.assignments.filter(
    (assignment) => assignment.assignmentDetails.submitted
  ).length;

  return (
    <div className={styles.classesEvents}>
      <h2 className={styles.heading}>Assignments' status</h2>
      <div>
        <MiscSidebarClassEventItem
          type='progress'
          percentage={
            props.assignments.length === 0
              ? 100
              : parseInt((countCompleted * 100) / props.assignments.length)
          }
          title='Progress'
          color='yellowOrange'
          dateTime={prettyDate(props.day, false)}
        />

        {props.assignments.map((assignment) => (
          <MiscSidebarClassEventItem
            key={assignment._id}
            type='assignment'
            title={assignment.classroom.name}
            dateTime={formattedTime(assignment.assignmentDetails.due)}
            redirectTo={`/classrooms/${assignment.classroom._id}/0/#post-${assignment._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MiscSidebarClassesEvents;
