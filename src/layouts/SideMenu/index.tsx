import React, { useState, useMemo, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RouteConfig from '@routes/route.types';
import menus from '@routes/route.config';

import Icon from '@components/Icon';

import logo from '@assets/images/logo.png';

import { name, selectCollapsed, changeCollapsed } from '@src/store/modules/basic.module';

import styles from './styles.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderMenu: React.FC = () => {
  const { collapsed, title } = useSelector(state => state[name]);
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

  const generateMenu = (menu: RouteConfig) => {
    if (menu.hideInMenu) return null;
    // if (menu.auth) {
    //   const isAuth = checkAuth(menu.auth, userInfoState);
    //   if (!isAuth) return null;
    // }

    const children = menu.children?.filter(item => !item.hideInMenu) || [];
    // 保证如果children都隐藏不限制子集
    if (children.length) {
      return (
        <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon type={`icon-${menu.icon}`} style={{ fontSize: 20 }} />
              <span>{menu.name}</span>
            </span>
          }
        >
          {menu.children?.map(childMenu => {
            return generateMenu(childMenu);
          })}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path || '/dashboard'} className={styles.nemuItem}>
          {menu.icon && <Icon type={`icon-${menu.icon}`} style={{ fontSize: 20 }} />}
          <span>{menu.name}</span>
        </Link>
      </Menu.Item>
    );
  };

  return (
    <Sider
      theme="light"
      className={styles.sider}
      width={220}
      style={{ height: '100vh' }}
      collapsed={collapsed}
    >
      <div className={styles.logo}>
        <img src={logo} width="32" alt="" />
        {!collapsed ? <span className={styles.title}>{title}</span> : ''}
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={openKeys}
        className={styles.menu}
      >
        {menus.map(item => generateMenu(item))}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
