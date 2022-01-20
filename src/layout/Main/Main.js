import React, { Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import MiscSidebar from '../MiscSidebar/MiscSidebar';
import styles from './Main.module.css';

const Main = (props) => {
  return (
    <Fragment>
      <Navbar />
      <div className={styles.mainContainer}>
        <Sidebar />
        <main className={styles.main}>{props.children}</main>
        <MiscSidebar />
      </div>
    </Fragment>
  );
};

export default Main;
