import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import App from '@layouts/index';

interface Props {}

const Root = (props: Props) => {
  return (
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  );
};

export default Root;
