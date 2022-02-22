import React from 'react';
import SidebarProfile from './SidebarProfile';
import SidebarList from './SidebarList';
import SidebarRefer from './SidebarRefer';

import styles from './Sidebar.module.css';

const Sidebar = (props) => {
  return (
    <aside
      className={`${styles.sidebar} ${
        props.sidebarOpenResponsive && styles.sidebar__opened
      }`}
    >
      <SidebarProfile />
      <SidebarList />
      <SidebarRefer />
    </aside>
  );
};

export default Sidebar;
