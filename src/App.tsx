import React from 'react';
import { ConfigProvider, Button } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';

import Root from './routes/Root';

moment.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      {/* <Root /> */}
      dddd是
    </ConfigProvider>
  );
}

export default App;
