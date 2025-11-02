/** Setup Store */
import { combineReducers, legacy_createStore } from "https://cdn.jsdelivr.net/npm/redux@5.0.1/dist/redux.browser.mjs";

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

// combineReducersを使って統合
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    posts: postsReducer
});

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
  });

  updateView();

  // 状態の監視
  store.subscribe(() => {
    console.log('現在の状態:', store.getState());
    updateView();
  });
});

/** User Operations */
document.getElementById("counter-increment").addEventListener("click", () => {
  const newCounter = store.getState().counter.count + 1;
  fetch('http://localhost:3000/count', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value: newCounter })
  }).then(response => {
    if (response.ok) {
      store.dispatch({ type: 'INCREMENT' });
    }
  });
});

document.getElementById("counter-decrement").addEventListener("click", () => {
  const newCounter = store.getState().counter.count - 1;
  fetch('http://localhost:3000/count', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value: newCounter })
  }).then(response => {
    if (response.ok) {
      store.dispatch({ type: 'DECREMENT' });
    }
  });
});

document.getElementById("user-set").addEventListener("click", () => {
  const $userInput = document.getElementById("user-input");
  fetch('http://localhost:3000/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: $userInput.value })
  }).then(response => {
    if (response.ok) {
      store.dispatch({ type: 'SET_USER', payload: $userInput.value });
      $userInput.value = '';
    }
  });
});

document.getElementById("post-add").addEventListener("click", () => {
  const $postInput = document.getElementById("post-input");
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: $postInput.value })
  }).then(response => {
      if (response.ok) {
        store.dispatch({ type: 'ADD_POST', payload: $postInput.value });
        $postInput.value = '';
      }
  });
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
