import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import menus from '@routes/route.config';
import RouteConfig from '@routes/route.types';
import checkAuth from '@utils/authUtils';
import styles from './styles.scss';

const { SubMenu } = Menu;
interface Props {
  selectedKeys: string[];
  openKeys: string[];
}

const MenuInline: React.FC<Props> = ({ selectedKeys, openKeys }) => {
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
              {menu.icon && (
                <img src={menu.icon} style={{ width: 24, marginRight: 4 }} alt={menu.name} />
              )}
              <span className={styles.menuName}>{menu.name}</span>
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
      <Menu.Item key={menu.path} style={{ paddingLeft: 28 }}>
        <Link to={menu.path || '/dashboard'} className={styles.nemuItem}>
          {menu.icon && (
            <img src={menu.icon} style={{ width: 24, marginRight: 4 }} alt={menu.name} />
          )}
          <span className={styles.menuName}>{menu.name}</span>
        </Link>
      </Menu.Item>
    );
  };
  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={selectedKeys} defaultOpenKeys={openKeys}>
      {menus.map(item => generateMenu(item))}
    </Menu>
  );
};

export default MenuInline;
