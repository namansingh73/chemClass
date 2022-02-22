import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classroomActions from '../../store/classroom/classroom-actions';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import MiscSidebar from '../MiscSidebar/MiscSidebar';
import styles from './Main.module.css';

const Main = (props) => {
  const [sidebarOpenResponsive, setSidebarOpenResponsive] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpenResponsive((sidebarOpenResponsive) => !sidebarOpenResponsive);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(classroomActions.loadClassrooms());
  }, [dispatch]);

  return (
    <Fragment>
      <Navbar
        toggleSidebar={toggleSidebar}
        sidebarOpenResponsive={sidebarOpenResponsive}
      />
      <div className={styles.backgroundContainer} />
      <Sidebar sidebarOpenResponsive={sidebarOpenResponsive} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <MiscSidebar />
    </Fragment>
  );
};

export default Main;
