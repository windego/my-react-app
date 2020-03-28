import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Avatar, Dropdown, Menu, Layout, Breadcrumb } from 'antd';
import { getBreadcrumb } from '@utils/routeUtils';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';

import AvatarImg from '@components/AvatarImg';
import Download from '@components/Download';

import { selectCollapsed, changeCollapsed } from '@store/modules/basicSlice';
import styles from './styles.scss';

const { Header } = Layout;

const TopHeader: React.FC = () => {
  const collapsed = useSelector(selectCollapsed);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const breadcrumb = getBreadcrumb(pathname);

  return (
    <Header className={styles.header}>
      <div className={styles.headerLeft}>
        <div onClick={() => dispatch(changeCollapsed())}>
          {collapsed ? (
            <MenuUnfoldOutlined className={styles.trigger} />
          ) : (
            <MenuFoldOutlined className={styles.trigger} />
          )}
        </div>
        <Breadcrumb separator=">" className={styles.breadcrumb}>
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
      </div>

      <div className={styles.headerRight}>
        <Download />
        <AvatarImg />
      </div>
    </Header>
  );
};

export default TopHeader;
