import React from 'react';
import styles from './SidebarRefer.module.css';

const SidebarRefer = () => {
  return (
    <div className={styles.sidebarRefer}>
      <div className={styles.sidebarReferText}>
        Love the app! <br /> Share with friends
      </div>
      <div className={styles.sidebarReferIcon}>
        <i className='far fa-paper-plane' />
      </div>
      <div className={styles.sidebarReferLink}>chemClass.com</div>
    </div>
  );
};

export default SidebarRefer;
