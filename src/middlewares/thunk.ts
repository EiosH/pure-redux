import { Action, Dispatch } from "../type";

const thunk = ({ dispatch }: { dispatch: Dispatch<unknown> }) => {
  return (next: Dispatch<unknown>) =>
    (action: ((dispatch: Dispatch<unknown>) => void) | Action<unknown>) => {
      if (typeof action === "function") {
        return action(dispatch);
      } else {
        const nextAction = next(action);
        return nextAction;
      }
    };
};

export default thunk;
