export default function compose(...funcs: Array<(args: any) => void>) {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
