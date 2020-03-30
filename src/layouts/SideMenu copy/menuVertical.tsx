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
}

const menuVertical: React.FC<Props> = ({ selectedKeys }) => {
  const generateMenu = (menu: RouteConfig, firstLevel?: boolean) => {
    if (menu.hideInMenu) return null;
    // if (menu.auth) {
    //   const isAuth = checkAuth(menu.auth);
    //   if (!isAuth) return null;
    // }

    const children = menu.children?.filter(item => !item.hideInMenu) || [];
    if (children.length) {
      return (
        <SubMenu
          key={menu.path}
          title={
            <span>
              {menu.icon && <img src={menu.icon} width="24px" alt={menu.name} />}
              {!firstLevel && <span className={styles.menuName}>{menu.name}</span>}
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
          {menu.icon && <img src={menu.icon} width="24px" alt={menu.name} />}
          <span className={styles.menuName}>{menu.name}</span>
        </Link>
      </Menu.Item>
    );
  };
  return (
    <Menu theme="light" mode="vertical" defaultSelectedKeys={selectedKeys}>
      {menus.map(item => generateMenu(item, true))}
    </Menu>
  );
};

export default menuVertical;
