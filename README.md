# pure-redux

盗版 redux

### 已实现功能或 API

1. redux

- createStore
- getState
- dispatch
- subscribe
- replaceReducer
- combineReducers
- applyMiddleware

2. redux-thunk
3. redux-promise
4. redux-saga

- put
- takeEvery
- delay

5. react-redux

- connect
- Provider

```js
const addOne = {
  type: "ADD",
  payload: 1,
};

const subtractOne = {
  type: "SUBTRACT",
  payload: 1,
};

const reducer = (state = 1, action?: Action<number>) => {
  switch (action?.type) {
    case "ADD":
      return state + action.payload;
    case "SUBTRACT":
      return state - action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  undefined,
  applyMiddleware(sagaMiddleware, thunk, reduxPromise, logger)
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  console.log("subscribe dispatch -------- >");
  console.log("state", store.getState());
});

store.dispatch({
  type: "ASYNC_ADD",
});

store.dispatch(addOne);

store.dispatch((dispatch) => {
  setTimeout(() => {
    dispatch(subtractOne);
  }, 3000);
});

const promiseAction = new Promise((resolve) => {
  setTimeout(() => {
    resolve(subtractOne);
  }, 2000);
});

store.dispatch(promiseAction);

// 运行结果
// state before dispatch
// subscribe dispatch -------- >
// state 1
// state after dispatch

// state before dispatch
// subscribe dispatch -------- >
// state 2
// state after dispatch

// state before dispatch
// subscribe dispatch -------- >
// state 3
// state after dispatch

// state before dispatch
// subscribe dispatch -------- >
// state 2
// state after dispatch

// state before dispatch
// subscribe dispatch -------- >
// state 1
// state after dispatch
```
