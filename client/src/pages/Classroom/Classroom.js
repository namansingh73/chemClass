import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassroomContainer from '../../components/Classroom/ClassroomContainer';
import AddClass from '../../components/Classroom/AddClass';
import ClassroomCard from '../../components/Classroom/ClassroomCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Error from '../../components/Error/Error';
import image1 from '../../images/classroom-1.jpg';
import image2 from '../../images/classroom-2.jpg';
import image3 from '../../images/classroom-3.jpg';
import image4 from '../../images/classroom-4.jpg';
import image5 from '../../images/classroom-5.jpg';

const images = [image1, image2, image3, image4, image5];

const Classroom = () => {
  const [loading, setLoading] = useState(true);
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const fetchClassrooms = async () => {
      try {
        const res = await axios.get('/api/v1/classrooms/');
        setClassrooms(res.data.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchClassrooms();
  }, [loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Error
        onReload={() => {
          setLoading(true);
          setError(false);
        }}
      />
    );
  }

  return (
    <ClassroomContainer>
      {classrooms.map((classroom, idx) => (
        <ClassroomCard
          key={classroom._id}
          image={images[idx % 5]}
          subjectName={classroom.name}
          instructor={`${classroom.instructorName}${
            classroom.unsubmittedAssignmentCount === null ? ' (You)' : ''
          }`}
          studentsCount={classroom.studentCount}
          assignmentCount={classroom.unsubmittedAssignmentCount}
          id={classroom._id}
          index={idx % 5}
        />
      ))}
      <AddClass
        onClassJoined={() => {
          setLoading(true);
          setError(false);
        }}
      />
    </ClassroomContainer>
  );
};

export default Classroom;
