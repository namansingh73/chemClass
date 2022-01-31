import React from 'react';
import RightBlockItem from './RightBlockItem/RightBlockItem';

const RightBlock = (props) => {
  return props.subject.posts.map((post) => (
    <RightBlockItem
      key={post._id}
      post={post}
      instructor={props.subject.instructor}
    />
  ));
};

export default RightBlock;
