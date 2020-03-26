import React, { useCallback } from 'react';
import { Layout, Menu, Modal } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import Logo from '@assets/images/yum.png';
import styles from './Header.scss';

const { Header } = Layout;
const { Item: MenuItem, SubMenu } = Menu;
const { confirm } = Modal;

const BasicHeader = () => {
  const onClickMenu = useCallback(({ key }: ClickParam) => {
    switch (key) {
      case 'logout': {
        confirm({
          title: '确定退出登录吗?',
          okText: '确定',
          cancelText: '取消',
          maskClosable: true,
          onOk() {
            // logout();
          },
        });
        break;
      }
    }
  }, []);

  return (
    <Header className={styles.head}>
      <div className={styles.container}>
        <img src={Logo} alt="logo" width={160} height={58} />
        <Menu
          className={styles.menu}
          mode="horizontal"
          selectable={false}
          theme="dark"
          onClick={onClickMenu}
        >
          <SubMenu
            className={styles.subMenu}
            title={
              <>
                <UserOutlined />
                asdasdf
              </>
            }
          >
            <MenuItem key="logout">
              <LogoutOutlined />
              注销登录
            </MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  );
};

export default BasicHeader;
