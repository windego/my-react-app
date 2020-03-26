import React, { useState, useMemo, useContext } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router';
import yum from '@assets/images/yum.png';
import logo from '@assets/images/logo_small.png';
import navLeft from '@assets/images/nav_left.svg';
import navRight from '@assets/images/nav_right.svg';

import styles from './styles.scss';

import MenuInline from './menuInline';
import MenuVertical from './menuVertical';

const { Sider } = Layout;

const SiderMenu: React.FC = () => {
  const { pathname } = useLocation();
  const useInfo = [];

  // const authList = useReduxSelector(state => state.userInfo.privilege_list);
  // getCollapsed 只在初始化时执行一次
  const getCollapsed = (): boolean => JSON.parse(localStorage.getItem('collapsed') || 'false');
  const [collapsed, setCollapsed] = useState<boolean>(getCollapsed);

  const onCollapse = () => {
    localStorage.setItem('collapsed', JSON.stringify(!collapsed));
    setCollapsed(!collapsed);
  };

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
      <div className={styles.collapBox} onClick={onCollapse}>
        <div className={styles.collap} style={{ width: collapsed ? 48 : 208 }}>
          <img src={collapsed ? navRight : navLeft} width={24} alt="nav"></img>
        </div>
      </div>
    </Sider>
  );
};

export default SiderMenu;
