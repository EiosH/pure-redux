import { Action, Dispatch, GetState } from "../type";

const logger = ({ getState }: { getState: GetState<unknown> }) => {
  return (next: Dispatch<unknown>) => (action: Action<unknown>) => {
    console.log();
    console.log("state before dispatch");
    const returnValue = next(action);
    console.log("state after dispatch");
    console.log();

    return returnValue;
  };
};

export default logger;
