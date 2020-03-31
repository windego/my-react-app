import { lazy } from 'react';

// import loadable from '@utils/loadable';

import RouteConfig from '@routes/route.types';
import demoRoutes from '@routes/demos.route';
// import AUTH_MAP from '@constants/auth';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: '首页',
    exact: true,
    icon: 'home',
    component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/welcome')),
  },
  {
    path: '/business',
    name: '商圈规划',
    icon: 'home',
    children: [
      {
        path: '/business/manage',
        name: 'demo',
        component: lazy(() => import(/* webpackChunkName: "demo" */ '@src/pages/demo')),
      },
      {
        path: '/business/counter',
        name: 'counter',
        component: lazy(() => import(/* webpackChunkName: "counter" */ '@src/pages/counter')),
      },
      // {
      //   path: '/business/effect',
      //   name: '效果评估',
      //   component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
      //   children: [
      //     {
      //       path: '/business/effect/newstoredetail',
      //       name: '新店详情',
      //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
      //       hideInMenu: true,
      //     },
      //     {
      //       path: '/business/effect/oldstoredetail',
      //       name: '老店详情',
      //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
      //       hideInMenu: true,
      //     },
      //   ],
      // },
      // {
      //   path: '/business/chart',
      //   name: '统计报表',
      //   component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
      // },
    ],
  },
  // {
  //   path: '/user',
  //   name: '账号权限',
  //   icon: 'home',
  //   children: [
  //     {
  //       path: '/user/role',
  //       name: '角色管理',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //     {
  //       path: '/user/account',
  //       name: '账号管理',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //     {
  //       path: '/user/log',
  //       name: '操作日志',
  //       component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@src/pages/counter')),
  //     },
  //   ],
  // },
  ...(process.env.$OMIT_DEMO ? demoRoutes : []),
];

export default routes;
