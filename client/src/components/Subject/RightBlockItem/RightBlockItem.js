import React from 'react';
import SubjectCard from '../SubjectCard';
import Header from './Header';
import MainContent from './MainContent';
import Attachments from './Attachments';
import Comments from './Comments';
import AddComment from './AddComment';

const RightBlockItem = (props) => {
  return (
    <SubjectCard noPadding>
      <Header post={props.post} instructor={props.instructor} />
      <MainContent post={props.post} />
      <Attachments post={props.post} />
      <Comments post={props.post} />
      <AddComment post={props.post} />
    </SubjectCard>
  );
};

export default RightBlockItem;
