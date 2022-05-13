import { Action, Dispatch, GetState } from "../type";

const logger = ({ getState }: { getState: GetState<unknown> }) => {
  return (next: Dispatch<unknown>) => (action: Action<unknown>) => {
    console.log("state before dispatch", getState());
    const returnValue = next(action);
    console.log("state after dispatch", getState());
    return returnValue;
  };
};

export default logger;
