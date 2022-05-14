import React, { createContext, ReactElement, useState } from "react";

import isEqual from "lodash.isequal";

const Context = createContext(undefined);

class ReactRedux {
  Provider({ children, store }) {
    const Provider = Context.Provider;
    return <Provider value={store}>{children}</Provider>;
  }

  connect = (
    mapStateToProps: (state: unknown) => Record<string, any>,
    mapDispatchToProps: (
      dispatch: (action: Record<string, any>) => void
    ) => Record<string, (value: unknown) => unknown>
  ) => {
    return (Component: () => ReactElement) => {
      const Consumer = Context.Consumer;

      let lastProps: Record<string, any>;
      let subscribe: () => void;

      return (props: Record<string, any>) => {
        const [, setState] = useState<Symbol>();

        const reRender = (props: Record<string, any>) => {
          if (lastProps && isEqual(props, lastProps)) {
            return;
          }

          lastProps = props;
          setState(Symbol());
        };

        return (
          <Consumer>
            {(store) => {
              const state = store.getState();
              const stateProps = mapStateToProps(state);
              const dispatchProps = mapDispatchToProps(store.dispatch);

              subscribe?.();
              subscribe = store.subscribe(() => {
                reRender(stateProps);
              });

              return (
                <Component {...props} {...stateProps} {...dispatchProps} />
              );
            }}
          </Consumer>
        );
      };
    };
  };
}

const instance = new ReactRedux();

const Provider = instance.Provider;
const connect = instance.connect;

export { Provider, connect };
