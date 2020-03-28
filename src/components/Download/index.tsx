import React from 'react';
import { Popover, Tooltip } from 'antd';
// import ExportLog from './ExportLog';
import downLoad from '@assets/images/top_down.svg';

interface Props {}

export default (props: Props) => {
  const showloglistdot = false;
  return (
    <Popover
      overlayClassName="export-log"
      trigger="click"
      placement="topRight"
      arrowPointAtCenter
      // onVisibleChange={handleExportLog}
      // getPopupContainer={trigger => trigger.parentNode}
      title={<div style={{ fontSize: '14px', textAlign: 'left' }}>下载</div>}
      // content={
      //   <ExportLog data={exportLogList} loading={logListLoading} onRetry={handleExportLogRetry} />
      // }
    >
      <div className="download">
        <Tooltip placement="bottom" title="下载">
          <img src={downLoad} className="download-img" alt="下载" />
        </Tooltip>
        <span
          className="download-dot"
          style={{ display: showloglistdot ? 'inline-block' : 'none' }}
        />
      </div>
    </Popover>
  );
};
