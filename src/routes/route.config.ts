import { lazy } from 'react';
import RouteConfig from '@routes/route.types';
import demoRoutes from '@routes/demos.route';
// import AUTH_MAP from '@constants/auth';

import NavHome from '@assets/images/nav_home.svg';
import NavAccount from '@assets/images/nav_account.svg';
import NavBusiness from '@assets/images/nav_Businessplanning.svg';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: '首页',
    exact: true,
    icon: NavHome,
    component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
  },
  {
    path: '/business',
    name: '商圈规划',
    icon: NavBusiness,
    children: [
      {
        path: '/business/manage',
        name: '商圈管理',
        component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
      },
      {
        path: '/business/effect',
        name: '效果评估',
        component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
        children: [
          {
            path: '/business/effect/newstoredetail',
            name: '新店详情',
            component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
            hideInMenu: true,
          },
          {
            path: '/business/effect/oldstoredetail',
            name: '老店详情',
            component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/business/chart',
        name: '统计报表',
        component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
      },
    ],
  },
  {
    path: '/user',
    name: '账号权限',
    icon: NavAccount,
    children: [
      {
        path: '/user/role',
        name: '角色管理',
        component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
      },
      {
        path: '/user/account',
        name: '账号管理',
        component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
      },
      {
        path: '/user/log',
        name: '操作日志',
        component: lazy(() => import(/* webpackChunkName: "dashboard" */ '@pages/redux-demo')),
      },
    ],
  },
  ...(process.env.$OMIT_DEMO ? demoRoutes : []),
];

export default routes;
