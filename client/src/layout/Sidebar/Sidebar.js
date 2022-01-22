import React from 'react';
import SidebarProfile from './SidebarProfile';
import SidebarList from './SidebarList';
import SidebarRefer from './SidebarRefer';

import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <SidebarProfile />
      <SidebarList />
      <SidebarRefer />
    </aside>
  );
};

export default Sidebar;
