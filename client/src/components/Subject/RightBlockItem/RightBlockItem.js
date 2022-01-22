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
      <Header instructor={props.instructor} />
      <MainContent />
      <Attachments />
      <Comments />
      <AddComment />
    </SubjectCard>
  );
};

export default RightBlockItem;
