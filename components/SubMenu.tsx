import React, { useState } from 'react';
import { Link } from './Link';
import styles from '../styles/SubMenu.module.css'

const SubMenu = ({ item }: any) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link className={styles.sidebar__link} href={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <label className={styles.sidebar__label}>{item.title}</label>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item: any, index: number) => {
          return (
            <Link href={item.path} key={index}>
              {item.icon}
              <label className={styles.sidebar__label}>{item.title}</label>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;