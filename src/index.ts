import compose from "./compose";

import {
  Action,
  Reducer,
  Listener,
  Middleware,
  Dispatch,
  GetState,
} from "./type";

class Store<T> {
  state: T | undefined;
  reducer: Reducer<T>;
  listeners: Set<Listener>;
  middleware?: Middleware<T>;

  constructor(reducer: Reducer<T>, initial?: T, middleware?: Middleware<T>) {
    this.reducer = reducer;
    this.state = initial;
    this.state = this.reducer(this.state);
    this.listeners = new Set();

    this.middleware = middleware;
  }

  getState = () => {
    return this.state;
  };

  dispatch = (action: Action<T>) => {
    const _dispatch = () => {
      this.state = this.reducer(this.state!, action);

      this.listeners.forEach((listener) => listener());
      return action;
    };

    if (this.middleware) {
      return this.middleware({
        getState: this.getState,
        dispatch: this.dispatch,
      })(_dispatch)(action);
    } else {
      return _dispatch();
    }
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  replaceReducer = (nextReducer: Reducer<T>) => {
    this.reducer = nextReducer;
  };

  combineReducers(reducerMap: Record<string, Reducer<T>>) {
    return (state?: T, action?: Action<T>) => {
      Object.values(reducerMap).forEach((reducer) => {
        reducer(state, action);
      });
    };
  }
}
const createStore = <T>(
  reducer: Reducer<T>,
  initial?: T,
  middleware?: Middleware<T>
) => {
  return new Store<T>(reducer, initial, middleware);
};

const applyMiddleware = <T>(...middlewares: Middleware<T>[]) => {
  return (data: { dispatch: Dispatch<T>; getState: GetState<T> }) => {
    const chain = middlewares.map((middleware) => middleware(data));

    return compose(...chain);
  };
};

export { createStore, applyMiddleware };

export * from "./type";
