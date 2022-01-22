import React, { Fragment } from 'react';
import SubjectHeader from '../../components/Subject/SubjectHeader';
import SubjectMain from '../../components/Subject/SubjectMain';
import image2 from '../../images/classroom-4.jpg';

const Subject = () => {
  return (
    <Fragment>
      <SubjectHeader
        subjectName='Mathematics'
        instructor='Jonas'
        image={image2}
      />
      <SubjectMain />
    </Fragment>
  );
};

export default Subject;
