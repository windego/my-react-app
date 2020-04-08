import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Layout } from 'antd';
import { getDocumentTitle } from '@utils/routeUtils';

import LogRocket from 'logrocket';
import Header from './Header';
import SideMenu from './SideMenu';
import MainContent from './MainContent';

// LogRocket.init('mo2kks/fe-area-platform');

function Index() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `React-${getDocumentTitle(pathname)}`;
  }, [pathname]);

  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <SideMenu />
      <Layout style={{ height: '100vh', background: '#fff' }}>
        <Header />
        <MainContent />
      </Layout>
    </Layout>
  );
}

export default Index;
