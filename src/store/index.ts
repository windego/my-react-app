/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { combineReducers, Reducer } from 'redux';

import counterReducer from '../features/counter/counterSlice';

import userInfoReducer from './modules/userInfoSlice';
import basicReducer from './modules/basicSlice';

// console.log(getDefaultMiddleware());
// console.log(logger);

const makeRootReducer = (reducers?: Reducer) =>
  combineReducers({
    counter: counterReducer,
    userInfo: userInfoReducer,
    basic: basicReducer,
    ...reducers,
  });

export const injectReducer = (reducers: Reducer) => {
  // 可以过滤reducer ,只留公用的和当前页面的。不存在的页面的reducer将被删除回收
  store.replaceReducer(makeRootReducer(reducers)); // 注入时更新
};

export const store = configureStore({
  reducer: makeRootReducer(),
  // middleware: [logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
