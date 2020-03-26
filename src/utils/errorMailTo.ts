export function errorMailTo(errorInfo: any, platformInfo: any) {
  const pageHref = window.location.href;
  const body = `\n\nenv:\n${platformInfo}\n\nlocation:\n${pageHref}\n\ninfo${errorInfo.componentStack}`;
  const mailTo = encodeURI(`576579227@qq.com?subject=KFC Web 错误反馈&body=${body}`);
  return `mailto:${mailTo}`;
}
