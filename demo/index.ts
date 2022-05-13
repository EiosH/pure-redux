// @ts-nocheck
import { createStore, Action, applyMiddleware } from "../src/index";
import thunk from "../src/middlewares/thunk";
import logger from "../src/middlewares/logger";
import reduxPromise from "../src/middlewares/redux-promise";

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
