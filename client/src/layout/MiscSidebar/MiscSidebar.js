import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayPicker from 'react-day-picker';
import MiscSidebarClassesEvents from './MiscSidebarClassesEvents';
import styles from './MiscSidebar.module.css';

const MiscSidebar = () => {
  const [day, setDay] = useState(() => {
    const today = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    return today;
  });

  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAssignmentSummary = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/v1/classrooms/assignmentSummary');
        setAssignments(res.data.assignments);
      } catch (err) {
        setError(true);
      }

      setLoading(false);
    };
    fetchAssignmentSummary();
  }, []);

  const dayClickHandler = (day) => {
    setDay(day);
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const due = new Date(assignment.assignmentDetails.due);
    return (
      !assignment.assignmentDetails.submitted &&
      day <= due &&
      due < new Date(day.getTime() + 24 * 60 * 60 * 1000)
    );
  });

  return (
    <div className={styles.miscSidebar}>
      <DayPicker onDayClick={dayClickHandler} selectedDays={day} />
      <MiscSidebarClassesEvents assignments={filteredAssignments} day={day} />
    </div>
  );
};

export default MiscSidebar;
