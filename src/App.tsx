import React, { useEffect } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import App from '@layouts/index';
import { getUserInfo } from '@layouts/api';

import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '@store/modules/userInfoSlice';

interface Props {}

const Root = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getInitData = async () => {
      const data = await getUserInfo();
      dispatch(setUserInfo(data));
    };
    getInitData();
  });

  return (
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  );
};

export default Root;
