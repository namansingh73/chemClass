import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import subjectActions from '../../store/subject/subject-actions';
import SubjectHeader from '../../components/Subject/SubjectHeader';
import SubjectMain from '../../components/Subject/SubjectMain';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Error from '../../components/Error/Error';
import image1 from '../../images/classroom-1.jpg';
import image2 from '../../images/classroom-2.jpg';
import image3 from '../../images/classroom-3.jpg';
import image4 from '../../images/classroom-4.jpg';
import image5 from '../../images/classroom-5.jpg';

const images = [image1, image2, image3, image4, image5];

const Subject = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const fetchClassroom = async () => {
      try {
        const res = await axios.get(`/api/v1/classrooms/${params.id}`);
        dispatch(subjectActions.initSubject(res.data.data));
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };

    fetchClassroom();
  }, [dispatch, loading, params.id]);

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
    <Fragment>
      <SubjectHeader image={images[parseInt(params.imageCnt)]} />
      <SubjectMain />
    </Fragment>
  );
};

export default Subject;
