// @ts-nocheck
import { createStore, Action, applyMiddleware } from "../src/index";
import thunk from "../src/middlewares/thunk";
import logger from "../src/middlewares/logger";
import reduxPromise from "../src/middlewares/redux-promise";
import createSagaMiddleware from "../src/redux-saga";

import rootSaga from "./saga";

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
