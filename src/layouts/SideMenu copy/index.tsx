import React, { useState, useMemo, useContext } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import yum from '@assets/images/yum.png';
import logo from '@assets/images/logo_small.png';
import navLeft from '@assets/images/nav_left.svg';
import navRight from '@assets/images/nav_right.svg';

import { selectCollapsed, changeCollapsed } from '@src/store/modules/basic.module';

import styles from './styles.scss';

import MenuInline from './menuInline';
import MenuVertical from './menuVertical';

const { Sider } = Layout;

const SiderMenu: React.FC = () => {
  const collapsed = useSelector(selectCollapsed);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const openKeys = useMemo(() => {
    let defaultOpenKeys: Array<string> = [];
    if (pathname === '/') {
      defaultOpenKeys = [];
    } else {
      const key = pathname.match(/^\/\w+/) || ['/'];
      defaultOpenKeys = [key[0]];
    }
    return defaultOpenKeys;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 模拟didmount

  return (
    <Sider theme="light" className={styles.sider} width={240} collapsed={collapsed}>
      <div className={styles.logo}>
        <img src={collapsed ? logo : yum} alt="KFC" style={{ height: collapsed ? 40 : 48 }} />
      </div>
      {collapsed ? (
        <MenuVertical selectedKeys={[pathname]} />
      ) : (
        <MenuInline selectedKeys={[pathname]} openKeys={openKeys} />
      )}
      <div className={styles.collapBox} onClick={() => dispatch(changeCollapsed())}>
        <div className={styles.collap} style={{ width: collapsed ? 48 : 208 }}>
          <img src={collapsed ? navRight : navLeft} width={24} alt="nav"></img>
        </div>
      </div>
    </Sider>
  );
};

export default SiderMenu;
