/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { combineReducers, Reducer, ReducersMapObject, AnyAction, CombinedState } from 'redux';

const modulesFiles = require.context('../', true, /\.module.ts$/);

const modules = modulesFiles.keys().reduce((prev, modulePath) => {
  const module = modulesFiles(modulePath);
  const key = module.slice.name;
  prev[key] = module.default;
  return prev;
}, {});

// const makeRootReducer = (reducers?: ReducersMapObject) =>
//   combineReducers({
//     userInfo: userInfoReducer,
//     basic: basicReducer,
//     ...reducers,
//   });

export const store = configureStore({
  reducer: {
    ...modules,
  },
  middleware: [...getDefaultMiddleware(), logger] as const,
});

// export const injectReducer = (reducers: ReducersMapObject) => {
//   // const injectReducers: ReducersMapObject = {};
//   // injectReducers[name] = reducers;
//   // 可以过滤reducer ,只留公用的和当前页面的。不存在的页面的reducer将被删除回收
//   store.replaceReducer(makeRootReducer(reducers)); // 注入时更新
// };

// type InjectStore = {
//   [name: string]: AnyAction;
// };

export type RootState = ReturnType<typeof store.getState>;

// export type RootState = ReturnType<typeof makeRootReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
