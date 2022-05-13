import co from "co";
import EventEmitter from "events";

import { Action, Dispatch } from "../type";

const eventEmitter = new EventEmitter();

let rootDispatch: Dispatch<unknown>;

const createSagaMiddleware = () => {
  const fn = function ({ dispatch }: { dispatch: Dispatch<unknown> }) {
    rootDispatch = dispatch;
    return (next: Dispatch<unknown>) => (action: Action<unknown>) => {
      eventEmitter.emit(action.type);
      const nextAction = next(action);
      return nextAction;
    };
  };

  const proxy = new Proxy(fn, {
    get(_, key) {
      if (key === "run")
        return (generatefn: (...args: any[]) => Iterator<any, any, any>) => {
          co(generatefn);
        };
    },
  });

  return proxy;
};

const put = (action: Action<any>) => {
  rootDispatch(action);
  return Promise.resolve();
};

const takeEvery = (
  actionType: string,
  generatefn: (...args: any[]) => Iterator<any, any, any>
) => {
  eventEmitter.on(actionType, () => {
    co(generatefn);
  });

  return Promise.resolve();
};

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};

export { put, takeEvery, delay };

export default createSagaMiddleware;
