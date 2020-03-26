import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';
import routes from '@routes/route.config';
import RouteConfig from '@routes/route.types';
import checkAuth from '@utils/authUtils';

type Breadcrumb = {
  name?: string;
  path?: string;
};

const flatten = (routeArry: RouteConfig[]): RouteConfig[] =>
  routeArry.reduce((pre: RouteConfig[], item: RouteConfig) => {
    if (item.children) {
      const children = flatten(item.children);
      return [...pre, item, ...children];
    }
    return [...pre, item];
  }, []);

const flattenRoute: RouteConfig[] = flatten(routes);

const flattenAuth = (routeArry: RouteConfig[]) => {
  let res: RouteConfig[] = [];
  routeArry.forEach(item => {
    const isAuth = true;
    // if (item.auth) {
    //   isAuth = checkAuth(item.auth, userInfoState);
    // }
    if (isAuth) {
      if (item.component) res.push(item);
      if (item.children) {
        res = [...res, ...flattenAuth(item.children)];
      }
    }
  });
  return res;
};

export const generateRoutes = (): ReactNode[] => {
  const flattenAuthRoute: RouteConfig[] = flattenAuth(routes);
  return flattenAuthRoute.map(item => {
    return <Route key={item.path} path={item.path} component={item.component} exact />;
  });
};
export const getDocumentTitle = (pathname: string) => {
  return flattenRoute.filter((item: RouteConfig) => item.path === pathname)[0]?.name;
};
export const getBreadcrumb = (pathname: string): Breadcrumb[] => {
  if (pathname === '/') return [{ name: '首页', path: '/' }];
  const ary = [];
  let str = pathname;
  while (str) {
    ary.unshift(str);
    str = str.replace(/\/\w+$/, '');
  }
  return ary.map(path => ({
    name: flattenRoute.filter((item: RouteConfig) => item.path === path)[0]?.name || 'null',
    path,
  }));
};
