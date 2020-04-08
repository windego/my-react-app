import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Avatar, Dropdown, Menu, Layout, Breadcrumb, Row, Col } from 'antd';
import { ClickParam } from 'antd/lib/menu/index.d';
import { getBreadcrumb } from '@utils/routeUtils';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';

import Download from '@components/Download';

import Icon from '@components/Icon';

import { selectCollapsed, changeCollapsed } from '@src/store/modules/basic.module';
import { selectUserInfo } from '@src/store/modules/userInfo.module';
import styles from './styles.scss';

const { Header } = Layout;

const TopHeader: React.FC = () => {
  const collapsed = useSelector(selectCollapsed);
  const { userName } = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const breadcrumb = getBreadcrumb(pathname);

  const handleMenuClick = ({ key }: ClickParam) => {
    // console.log();
    if (key === 'signout') {
      localStorage.clear();
      // reduxPush('/user/login');
    } else if (key === 'password') {
      localStorage.clear();
    }
  };

  const DropDownMenu = (
    <Menu onClick={handleMenuClick} style={{ lineHeight: '63px', fontSize: '14px' }}>
      <Menu.Item key="password" style={{ width: '150px' }}>
        <Icon type="setting" />
        <span>修改密码</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="signout" style={{ width: '150px' }}>
        <Icon type="logout" />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header}>
      <Row>
        <Col xs={0} sm={0} md={2}>
          <div className={styles.left}>
            <Icon
              className={styles.trigger}
              type={`icon-${collapsed ? 'menu-unfold' : 'menu-fold'}`}
              onClick={() => dispatch(changeCollapsed())}
            />
          </div>
        </Col>
        <Col xs={2} sm={2} md={0}>
          <div className={styles.left}>
            <Icon
              className={styles.trigger}
              type={`icon-${collapsed ? 'menu-unfold' : 'menu-fold'}`}
              onClick={() => dispatch(changeCollapsed())}
            />
          </div>
        </Col>
      </Row>
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

      <div className={styles.right}>
        <Download />
        <Dropdown className={styles.dropwown} overlay={DropDownMenu} placement="bottomCenter">
          <div>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <span style={{ marginLeft: 8 }}>{userName}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );

  // return (
  //   <Header className={styles.header}>
  //     <div className={styles.headerLeft}>
  //       {collapsed ? (
  //         <MenuUnfoldOutlined
  //           className={styles.trigger}
  //           onClick={() => dispatch(changeCollapsed())}
  //         />
  //       ) : (
  //         <MenuFoldOutlined
  //           className={styles.trigger}
  //           onClick={() => dispatch(changeCollapsed())}
  //         />
  //       )}
  // <Breadcrumb separator=">" className={styles.breadcrumb}>
  //   {breadcrumb.map((item, index: number) => {
  //     const { name, path } = item;
  //     if (index !== 0 && index !== breadcrumb.length - 1) {
  //       return (
  //         <Breadcrumb.Item key={path}>
  //           <Link to={path || '/'}>{name}</Link>
  //         </Breadcrumb.Item>
  //       );
  //     }
  //     return <Breadcrumb.Item key={path}>{name}</Breadcrumb.Item>;
  //   })}
  // </Breadcrumb>
  //     </div>

  //     <div className={styles.headerRight}>
  //       <Download />
  //       <AvatarImg />
  //     </div>
  //   </Header>
  // );
};

export default TopHeader;
