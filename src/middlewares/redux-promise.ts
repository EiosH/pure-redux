import { Action, Dispatch } from "../type";

const reduxPromise = ({ dispatch }: { dispatch: Dispatch<unknown> }) => {
  type PromiseAction = Promise<Action<unknown>>;
  return (next: Dispatch<unknown>) =>
    (action: PromiseAction | Action<unknown>) => {
      console.log("action", action);

      if ((action as PromiseAction).then) {
        return (action as PromiseAction).then((data: Action<unknown>) => {
          dispatch(data);
        });
      } else {
        const nextAction = next(action as Action<unknown>);

        return nextAction;
      }
    };
};

export default reduxPromise;
