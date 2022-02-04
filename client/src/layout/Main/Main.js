import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classroomActions from '../../store/classroom/classroom-actions';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import MiscSidebar from '../MiscSidebar/MiscSidebar';
import styles from './Main.module.css';

const Main = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(classroomActions.loadClassrooms());
  }, [dispatch]);

  return (
    <Fragment>
      <Navbar />
      <div className={styles.mainContainer}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
        <MiscSidebar />
      </div>
    </Fragment>
  );
};

export default Main;
