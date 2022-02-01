import React from 'react';
import { useSelector } from 'react-redux';
import RightBlockItem from './RightBlockItem/RightBlockItem';

const RightBlock = () => {
  const subject = useSelector(({ subject }) => subject);

  return subject.posts.map((post) => (
    <RightBlockItem key={post._id} post={post} />
  ));
};

export default RightBlock;
