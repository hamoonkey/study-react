import { legacy_createStore } from "https://cdn.jsdelivr.net/npm/redux@5.0.1/dist/redux.legacy-esm.min.js";

// 初期状態
const initialState = { count: 0 };

// Reducer
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Storeの作成
const store = legacy_createStore(counterReducer);

// 状態の監視
store.subscribe(() => {
  console.log('現在の状態:', store.getState());
});

// Actionの送信
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });