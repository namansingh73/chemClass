import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Fuse from 'fuse.js';
import classroomAction from '../../store/classroom/classroom-actions';
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

const Classroom = (props) => {
  const dispatch = useDispatch();
  const { loading, classrooms, error, searchParameter } = useSelector(
    ({ classroom }) => classroom
  );

  useEffect(() => {
    return () => {
      dispatch(classroomAction.updateSearchParamter(''));
    };
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Error onReload={() => dispatch(classroomAction.loadClassroom())} />;
  }

  let filteredClassrooms = classrooms;

  if (searchParameter) {
    const fuse = new Fuse(classrooms, {
      keys: ['name'],
      threshold: 0.45,
    });

    filteredClassrooms = fuse.search(searchParameter).map(({ item }) => item);
  } else if (props.archived) {
    filteredClassrooms = classrooms.filter((classroom) => classroom.archived);
  } else {
    filteredClassrooms = classrooms.filter((classroom) => !classroom.archived);
  }

  return (
    <ClassroomContainer>
      {filteredClassrooms.map((classroom, idx) => (
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
          dispatch(classroomAction.loadClassrooms());
        }}
      />
    </ClassroomContainer>
  );
};

export default Classroom;
