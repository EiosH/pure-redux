export interface Action<T> {
  type: string;
  payload?: T;
}

export interface Reducer<T> {
  (state?: T, action?: Action<T>): T;
}

export interface Listener {
  (): void;
}

export interface Dispatch<T> {
  (action: Action<T>): Action<T>;
}

export interface GetState<T> {
  (): T | undefined;
}

export interface Middleware<T> {
  (data: { dispatch: Dispatch<T>; getState: GetState<T> }): (
    next: Dispatch<T>
  ) => (action: Action<T>) => Action<T>;
}
