import React from 'react';
import DayPicker from 'react-day-picker';
import MiscSidebarClassesEvents from './MiscSidebarClassesEvents';
import 'react-day-picker/lib/style.css';

const MiscSidebar = () => {
  return (
    <div>
      <DayPicker />
      <MiscSidebarClassesEvents />
    </div>
  );
};

export default MiscSidebar;
