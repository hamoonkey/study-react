/** Setup Store */
import { combineReducers, legacy_createStore, applyMiddleware } from "https://cdn.jsdelivr.net/npm/redux@5.0.1/dist/redux.browser.mjs";

// Reducer and Action Creator
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
function increment() {
  return { type: 'INCREMENT' };
}
function asyncIncrement() {
  return () => {
    const newCounter = store.getState().counter.count + 1;
    fetch('http://localhost:3000/count', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: newCounter })
    }).then(response => {
      if (response.ok) {
        store.dispatch(increment());
      }
    });
  }
}
function decrement() {
  return { type: 'DECREMENT' };
}
function asyncDecrement() {
  return () => {
    const newCounter = store.getState().counter.count - 1;
    fetch('http://localhost:3000/count', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: newCounter })
    }).then(response => {
      if (response.ok) {
        store.dispatch(decrement());
      }
    });
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
function setUser(name) {
  return { type: 'SET_USER', payload: name };
}
function asyncSetUser(name) {
  return () => {
    fetch('http://localhost:3000/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    }).then(response => {
      if (response.ok) {
        store.dispatch(setUser(name));
      }
    });
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
function addPost(message) {
  return { type: 'ADD_POST', payload: message };
}
function asyncAddPost(message) {
  return () => {
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    }).then(response => {
      if (response.ok) {
        store.dispatch(addPost(message));
      }
    });
  }
}

// combineReducersを使って統合
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    posts: postsReducer
});

// Middleware
const thunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action();
  }
  return next(action);
};

// Storeの作成
let store;
const initialState = [];
initialState.push(fetch('http://localhost:3000/count'));
initialState.push(fetch('http://localhost:3000/user'));
initialState.push(fetch('http://localhost:3000/posts'));
Promise.all(initialState).then(responses => Promise.all(responses.map(res => res.json()))).then(([count, user, posts]) => {
  store = legacy_createStore(rootReducer, {
    counter: {count: count.value},
    user: { name: user.name },
    posts: posts.map(post => post.message)
  }, applyMiddleware(thunkMiddleware));

  updateView();

  // 状態の監視
  store.subscribe(() => {
    console.log('現在の状態:', store.getState());
    updateView();
  });
});

/** User Operations */
document.getElementById("counter-increment").addEventListener("click", () => {
  store.dispatch(asyncIncrement());
});

document.getElementById("counter-decrement").addEventListener("click", () => {
  store.dispatch(asyncDecrement());
});

document.getElementById("user-set").addEventListener("click", () => {
  const $userInput = document.getElementById("user-input");
  store.dispatch(asyncSetUser($userInput.value));
  $userInput.value = '';
});

document.getElementById("post-add").addEventListener("click", () => {
  const $postInput = document.getElementById("post-input");
  store.dispatch(asyncAddPost($postInput.value));
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
