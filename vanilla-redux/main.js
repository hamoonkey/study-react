/** Setup Store */
import { legacy_createStore } from "https://cdn.jsdelivr.net/npm/redux@5.0.1/dist/redux.legacy-esm.min.js";

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function userReducer(state = { name: '' }, action) {
  switch (action.type) {
    case 'SET_USER':
        return { name: action.payload };
    default:
      return state;
  }
}

function postsReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.payload];
    default:
      return state;
  }
}

// combineReducersを使わずに手動で統合
function rootReducer(state = {
    counter: { count: 0 },
    user: { name: '' },
    posts: []
}, action) {
  return {
    counter: counterReducer(state.counter, action),
    user: userReducer(state.user, action),
    posts: postsReducer(state.posts, action),
  };
}

// Storeの作成
const store = legacy_createStore(rootReducer);

/** User Operations */
document.getElementById("counter-increment").addEventListener("click", () => {
  store.dispatch({ type: 'INCREMENT' });
});

document.getElementById("counter-decrement").addEventListener("click", () => {
  store.dispatch({ type: 'DECREMENT' });
});

document.getElementById("user-set").addEventListener("click", () => {
  const $userInput = document.getElementById("user-input");
  store.dispatch({ type: 'SET_USER', payload: $userInput.value });
  $userInput.value = '';
});

document.getElementById("post-add").addEventListener("click", () => {
  const $postInput = document.getElementById("post-input");
  store.dispatch({ type: 'ADD_POST', payload: $postInput.value });
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