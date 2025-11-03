/** Setup Store */
import {createSlice, configureStore} from "https://cdn.jsdelivr.net/npm/@reduxjs/toolkit@2.9.2/+esm";

// Slice and ThunkActionCreator
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
        store.dispatch(counterSlice.actions.increment());
      }
    });
  }
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
        store.dispatch(counterSlice.actions.decrement());
      }
    });
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '' },
  reducers: {
    setUser: (state, action) => { state.name = action.payload }
  }
});

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
        store.dispatch(userSlice.actions.setUser(name));
      }
    });
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => { state.push(action.payload) }
  }
});

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
        store.dispatch(postsSlice.actions.addPost(message));
      }
    });
  }
}

// Storeの作成
let store;
const initialState = [];
initialState.push(fetch('http://localhost:3000/count'));
initialState.push(fetch('http://localhost:3000/user'));
initialState.push(fetch('http://localhost:3000/posts'));
Promise.all(initialState).then(responses => Promise.all(responses.map(res => res.json()))).then(([count, user, posts]) => {
  store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
      user: userSlice.reducer,
      posts: postsSlice.reducer
    },
    preloadedState: {
      counter: {count: count.value},
      user: { name: user.name },
      posts: posts.map(post => post.message)
    }
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
