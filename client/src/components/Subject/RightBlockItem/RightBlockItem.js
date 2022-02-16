import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SubjectCard from '../SubjectCard';
import Header from './Header';
import MainContent from './MainContent';
import Attachments from './Attachments';
import Comments from './Comments';
import AddComment from './AddComment';

const RightBlockItem = (props) => {
  const location = useLocation();
  const scrollDivRef = useRef();

  const hash = location.hash;

  useEffect(() => {
    if (hash === `#post-${props.post._id}`) {
      const headerOffset = 120;
      const elementPosition = scrollDivRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [hash, props.post._id]);

  return (
    <SubjectCard id={`post-${props.post._id}`} noPadding>
      <div ref={scrollDivRef} />
      <Header post={props.post} />
      <MainContent post={props.post} />
      <Attachments post={props.post} />
      <Comments post={props.post} />
      <AddComment post={props.post} />
    </SubjectCard>
  );
};

export default RightBlockItem;
