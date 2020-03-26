import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Avatar, Dropdown, Menu, Layout, Breadcrumb } from 'antd';
import { getBreadcrumb } from '@utils/routeUtils';
import arrowIcon from '@assets/images/navtop_arrow_right@2x.png';
import avater from '@assets/images/nav_personage.svg';

import styles from './styles.scss';

const { Header } = Layout;

const TopHeader: React.FC = () => {
  const { pathname } = useLocation();

  const breadcrumb = getBreadcrumb(pathname);

  const DropdownList = (
    <Menu>
      <Menu.Item key="logout" className={styles.logout}>
        退出
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className={styles.header}>
      <Breadcrumb
        className={styles.headerLeft}
        separator={<img src={arrowIcon} alt="arrow" width={24} />}
      >
        {breadcrumb.map((item, index: number) => {
          const { name, path } = item;
          if (index !== 0 && index !== breadcrumb.length - 1) {
            return (
              <Breadcrumb.Item key={path}>
                <Link to={path || '/'}>{name}</Link>
              </Breadcrumb.Item>
            );
          }
          return <Breadcrumb.Item key={path}>{name}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
      <div className={styles.headerRight}>
        <Dropdown overlay={DropdownList} className={styles.headerDropdown}>
          <div>
            <span className={styles.userName}>{'user_name' || ''}</span>
            <Avatar src={avater} />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopHeader;
