import React from 'react';
import Card from '../../layout/Card/Card';
import CircularProgressBar from '../CircularProgessBar/CircularProgressBar';

const MiscSidebarClass = () => {
  return (
    <Card>
      <CircularProgressBar percentage={30} color='yellow' />
    </Card>
  );
};

export default MiscSidebarClass;
