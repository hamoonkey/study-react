/** Setup Store */
import {createSlice, configureStore, createAsyncThunk} from "https://cdn.jsdelivr.net/npm/@reduxjs/toolkit@2.9.2/+esm";

// Slice and ThunkActionCreator
const asyncIncrement = createAsyncThunk(
  'counter/asyncIncrement',
  async (_, thunkAPI) => {
    const newCounter = thunkAPI.getState().counter.count + 1;
    const response = await fetch('http://localhost:3000/count', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: newCounter })
    });
    if (response.ok) {
      return null;
    }
  }
);

const asyncDecrement = createAsyncThunk(
  'counter/asyncDecrement',
  async (_, thunkAPI) => {
    const newCounter = thunkAPI.getState().counter.count - 1;
    const response = await fetch('http://localhost:3000/count', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: newCounter })
    });
    if (response.ok) {
      return null;
    }
  }
);

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { 
      state.count += 1;
    },
    decrement: (state) => { state.count -= 1 }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncIncrement.fulfilled, (state, action) => {
      state.count += 1;
    });
  }
});

const asyncSetUser = createAsyncThunk(
  'user/asyncSetUser',  
  async (name) => {
    const response = await fetch('http://localhost:3000/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    });
    if (response.ok) {
      return name;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '' },
  reducers: {
    setUser: (state, action) => { state.name = action.payload }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncSetUser.fulfilled, (state, action) => {
      state.name = action.payload;
    });
  }
});

const asyncAddPost = createAsyncThunk(
  'posts/asyncAddPost',
  async (message) => {
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    });
    if (response.ok) {
      return message;
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => { state.push(action.payload) }
  },
  extraReducers: (builder) => {
    builder.addCase(asyncAddPost.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  }
});

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
