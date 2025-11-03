/** Setup Store */
import {createSlice, configureStore} from "https://cdn.jsdelivr.net/npm/@reduxjs/toolkit@2.9.2/+esm";

import { createLogger } from "https://cdnjs.cloudflare.com/ajax/libs/redux-logger/4.0.0/redux-logger.es.min.js";

// Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { 
      state.count += 1;
    },
    decrement: (state) => { state.count -= 1 }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '' },
  reducers: {
    setUser: (state, action) => { state.name = action.payload }
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => { state.push(action.payload) }
  }
});

// Middleware
const loggerMiddleware = createLogger();

// Storeの作成
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    user: userSlice.reducer,
    posts: postsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
});

/** User Operations */
document.getElementById("counter-increment").addEventListener("click", () => {
  store.dispatch(counterSlice.actions.increment());
});

document.getElementById("counter-decrement").addEventListener("click", () => {
  store.dispatch(counterSlice.actions.decrement());
});

document.getElementById("user-set").addEventListener("click", () => {
  const $userInput = document.getElementById("user-input");
  store.dispatch(userSlice.actions.setUser($userInput.value));
  $userInput.value = '';
});

document.getElementById("post-add").addEventListener("click", () => {
  const $postInput = document.getElementById("post-input");
  store.dispatch(postsSlice.actions.addPost($postInput.value));
  $postInput.value = '';
});

/** Init */
function updateView_Counter(counter) {
  document.getElementById('counter-value').textContent = counter.count;
}

function updateView_User(user) {
  document.getElementById('user-name').textContent = user.name;
}

function updateView_Posts(posts) {
  const postList = document.getElementById('post-list');
  postList.innerHTML = '';
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = post;
    postList.appendChild(li);
  });
}

function updateView() {
  const state = store.getState();
  updateView_Counter(state.counter);
  updateView_User(state.user);
  updateView_Posts(state.posts);
}

updateView();

// 状態の監視
store.subscribe(() => {
  console.log('現在の状態:', store.getState());
  updateView();
});