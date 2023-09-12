/* eslint-disable @next/next/link-passhref */
import React, { useState } from 'react';
// import styled from 'styled-components';
// import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import styles from '../styles/Sidebar.module.css'
import { Link } from './Link';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className="nav">
          <Link href="#">
            <FaIcons.FaBars className={styles.nav__icon} onClick={showSidebar} />
          </Link>
        </nav>
        <div className={(sidebar ? `${styles.sidebar__nav} ${styles.left_on}` : `${styles.sidebar__nav} ${styles.left_off}` )}>
          <div style={{ width: "100%" }}>
            <div>
              <AiIcons.AiOutlineClose className={styles.nav__icon} onClick={showSidebar} />
            </div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;