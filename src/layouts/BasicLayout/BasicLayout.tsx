import { Layout } from 'antd';
import { CopyrightCircleOutlined } from '@ant-design/icons';
import React, { FC } from 'react';

import styles from './BasicLayout.scss';
import BasicHeader from './Header';

const { Content, Footer } = Layout;

const BasicLayout: FC = ({ children }) => (
  <Layout className={styles.basic}>
    <BasicHeader />
    <Layout>
      <Content className={styles.container}>
        <div className={styles.content}>{children}</div>
        <Footer className={styles.footer}>
          <span>Copyright </span>
          <CopyrightCircleOutlined />
          <span> 百胜运营平台 </span>
        </Footer>
      </Content>
    </Layout>
  </Layout>
);

export default BasicLayout;
