/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { combineReducers, Reducer, ReducersMapObject, Store } from 'redux';

import userInfoReducer from './modules/userInfo.module';
import basicReducer from './modules/basic.module';

// 异步reducer
const asyncReducers: ReducersMapObject = {};

const makeRootReducer = (reducers?: ReducersMapObject) =>
  combineReducers({
    userInfo: userInfoReducer,
    basic: basicReducer,
    ...reducers,
  });

export const store: Store = configureStore({
  reducer: makeRootReducer(),
  middleware: [...getDefaultMiddleware(), logger] as const,
});

export const injectReducer = (name: string, reducer: Reducer) => {
  if (!asyncReducers.name) {
    asyncReducers[name] = reducer;
  }

  // 可以过滤reducer ,只留公用的和当前页面的。不存在的页面的reducer将被删除回收
  store.replaceReducer(makeRootReducer(asyncReducers)); // 注入时更新
};

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
