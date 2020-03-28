import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Popover, Menu } from 'antd';
import avator from '@assets/images/top_head.svg';
import styles from './AvatarImg.scss';

const { Item } = Menu;

interface Props {}

export default (props: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Popover
      overlayClassName={styles.popover}
      trigger="click"
      placement="topRight"
      arrowPointAtCenter
      visible={visible}
      title={<div className={styles.title}>个人中心</div>}
      onVisibleChange={status => setVisible(status)}
      content={
        <Menu>
          <Item key="account">
            <Link to="">账号设置</Link>
          </Item>
          <Item key="logout">
            <span style={{ color: '#FF5555' }}>退出</span>
          </Item>
        </Menu>
      }
    >
      <img src={avator} className="ant-avatar" alt="头像" />
    </Popover>
  );
};
