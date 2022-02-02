import React from 'react';
import { useSelector } from 'react-redux';
import RightBlockItem from './RightBlockItem/RightBlockItem';
import Error from '../Error/Error';

const RightBlock = () => {
  const subject = useSelector(({ subject }) => subject);

  if (subject.posts.length === 0) {
    return (
      <Error
        fullWidth
        heading='Nothing to show'
        text='Come back again later!'
      />
    );
  }

  return subject.posts.map((post) => (
    <RightBlockItem key={post._id} post={post} />
  ));
};

export default RightBlock;
