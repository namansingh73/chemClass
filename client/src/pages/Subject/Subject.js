import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import SubjectHeader from '../../components/Subject/SubjectHeader';
import SubjectMain from '../../components/Subject/SubjectMain';
import image1 from '../../images/classroom-1.jpg';
import image2 from '../../images/classroom-2.jpg';
import image3 from '../../images/classroom-3.jpg';
import image4 from '../../images/classroom-4.jpg';
import image5 from '../../images/classroom-5.jpg';

const images = [image1, image2, image3, image4, image5];

const Subject = () => {
  const params = useParams();

  return (
    <Fragment>
      <SubjectHeader
        subjectName='Mathematics'
        instructor='Jonas'
        image={images[parseInt(params.imageCnt)]}
      />
      <SubjectMain />
    </Fragment>
  );
};

export default Subject;
