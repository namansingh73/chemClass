import React, { Fragment } from 'react';
import ClassroomContainer from '../../components/Classroom/ClassroomContainer';
import AddClass from '../../components/Classroom/AddClass';
import ClassroomCard from '../../components/Classroom/ClassroomCard';
import image1 from '../../images/classroom-1.jpg';
import image2 from '../../images/classroom-2.jpg';
import image3 from '../../images/classroom-3.jpg';
import image4 from '../../images/classroom-4.jpg';
import image5 from '../../images/classroom-5.jpg';

const Classroom = () => {
  return (
    <Fragment>
      <ClassroomContainer>
        <ClassroomCard
          image={image1}
          subjectName='Mathematics'
          instructor='Jonas'
          assignmentCount={0}
        />
        <ClassroomCard
          image={image2}
          subjectName='English'
          instructor='Brad Traversy'
          assignmentCount={2}
        />
        <ClassroomCard
          image={image3}
          subjectName='Science'
          instructor='Angela Yu'
          assignmentCount={4}
        />
        <ClassroomCard
          image={image4}
          subjectName='Hindi'
          instructor='Maxmillian'
          assignmentCount={0}
        />
        <ClassroomCard
          image={image5}
          subjectName='German'
          instructor='Colt Steele'
          assignmentCount={1}
        />
        <ClassroomCard
          image={image1}
          subjectName='Mathematics'
          instructor='Jonas'
          assignmentCount={0}
        />
        <ClassroomCard
          image={image2}
          subjectName='English'
          instructor='Brad Traversy'
          assignmentCount={2}
        />
        <ClassroomCard
          image={image3}
          subjectName='Science'
          instructor='Angela Yu'
          assignmentCount={4}
        />
        <AddClass />
      </ClassroomContainer>
    </Fragment>
  );
};

export default Classroom;
