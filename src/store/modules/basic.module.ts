import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '@store/index';

import cacheStorage from '@utils/localstorageExpires';

interface BasicState {
  collapsed: boolean;
  title: string;
}
const initialState: BasicState = {
  collapsed: cacheStorage.get('collapsed'),
  title: 'React Demo',
};

export const slice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    // setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
    //   const { type, payload } = action;
    //   Object.entries(payload).forEach(item => {
    //     const [key, val] = item;
    //     state[key] = val;
    //   });
    // },
    changeCollapsed: state => {
      const collapsed = !state.collapsed;
      cacheStorage.set('collapsed', collapsed);
      state.collapsed = collapsed;
    },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { changeCollapsed } = slice.actions;
export const { name } = slice;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCollapsed = (state: RootState) => state.basic.collapsed;
export const getTitle = (state: RootState) => state.basic.title;

export default slice.reducer;
