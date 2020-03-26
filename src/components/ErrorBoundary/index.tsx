/* eslint-disable no-console */
import React from 'react';
import { Modal, Button } from 'antd';
// import platform from 'platform';
import { errorMailTo } from '@utils/errorMailTo';

export interface IState {
  hasError: boolean;
  errorMessage: string;
  errorInfo: any;
}

class ErrorBoundary extends React.Component<object, IState> {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: object) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorInfo: '',
    };
  }

  // componentDidUpdate = (prevProps:any) => {
  //   if (this.state.hasError && (prevProps.location.pathname !== this.props.location.pathname)) {
  //     this.setState({
  //       hasError: false,
  //     });
  //   }
  // }

  componentDidCatch(errorMessage: any, info: any) {
    console.group('出错啦');
    console.log('错误', errorMessage);
    console.log('信息', info);
    console.groupEnd();

    if (process.env.NODE_ENV !== 'development') {
      // 上报错误
      // reportException(window.location.href, error.message + info.componentStack);
    }

    this.setState({
      hasError: true,
      errorMessage,
      errorInfo: info,
    });
    Modal.error({
      title: '出现错误',
      width: 500,
      content: (
        <div>
          <p>
            当前网页出现错误，请<b>尝试刷新</b>或<b>联系技术人员</b>。
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '2em 5em',
            }}
          >
            <Button
              type="primary"
              icon="reload"
              ghost
              onClick={() => {
                window.location.reload();
              }}
            >
              刷新页面
            </Button>
            <a href={errorMailTo(info, platform.description)}>
              <Button type="primary" icon="mail" ghost>
                发送反馈
              </Button>
            </a>
          </div>
          <div
            style={{
              color: '#9E9E9E',
              fontSize: '0.8em',
            }}
          >
            <b>错误信息：</b>
            <div>
              <b>环境：</b>
              {`${platform.description}`}
            </div>
            <div>
              <b>位置：</b>
              {window.location.href}
            </div>
            <div>
              <b>信息：</b>
              <code>{errorMessage.message}</code>
            </div>
          </div>
        </div>
      ),
      okText: '关闭',
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <h2>{this.state.errorMessage.toString()}</h2>
          <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
