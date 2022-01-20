import React from 'react';
import SubjectHeader from '../../components/Subject/SubjectHeader';
import SubjectMain from '../../components/Subject/SubjectMain';
import image2 from '../../images/classroom-4.jpg';
import Main from '../../layout/Main/Main';

const Subject = () => {
  return (
    <Main>
      <SubjectHeader
        subjectName='Mathematics'
        instructor='Jonas'
        image={image2}
      />
      <SubjectMain />
    </Main>
  );
};

export default Subject;
