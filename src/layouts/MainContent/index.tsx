import React, { Suspense, useContext } from 'react';
import { Layout } from 'antd';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, Redirect } from 'react-router-dom';
// import ErrorBoundary from '@components/ErrorBoundary';
import PageLoading from '@components/PageLoading';
import Exception from '@components/Exception';
import { generateRoutes } from '@utils/routeUtils';

import styles from './styles.scss';

const { Content } = Layout;

const MainContent: React.FC = () => {
  return (
    // <TransitionGroup>
    //   <CSSTransition classNames="fade" key={pathname} timeout={500}>
    <Content className={styles.cmsContent}>
      {/* <ErrorBoundary> */}
      <Suspense fallback={<PageLoading />}>
        <Switch>
          {generateRoutes()}
          <Route path="/error" component={Exception} />;
          <Redirect to="/error" />;
        </Switch>
      </Suspense>
      {/* </ErrorBoundary> */}
    </Content>
    //   </CSSTransition>
    // </TransitionGroup>
  );
};

export default MainContent;
