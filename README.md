# pure-redux
盗版 redux


```js
const addOne = {
  type: "ADD",
  payload: 1,
};

const subtractOne = {
  type: "SUBTRACT",
  payload: 1,
};

const reducer = (state = 10, action?: Action<number>) => {
  switch (action?.type) {
    case "ADD":
      return state + action.payload;
    case "SUBTRACT":
      return state - action.payload;
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  undefined,
  applyMiddleware(logger, thunk, reduxPromise)
);

store.subscribe(() => {
  console.log("subscribe dispatch -------- >");
});

store.dispatch(addOne);

console.log("state", store.getState());

store.dispatch((dispatch) => {
  setTimeout(() => {
    dispatch(subtractOne);
  }, 1000);
});

const promiseAction = new Promise((resolve) => {
  setTimeout(() => {
    resolve(subtractOne);
  }, 2000);
});

store.dispatch(promiseAction);


// 运行结果
// state before dispatch 10
// subscribe dispatch -------- >
// state after dispatch 11
// state 11
// state before dispatch 11
// state after dispatch 11
// state before dispatch 11
// state after dispatch 11
// state before dispatch 11
// subscribe dispatch -------- >
// state after dispatch 10
// state before dispatch 10
// subscribe dispatch -------- >
// state after dispatch 9

```
