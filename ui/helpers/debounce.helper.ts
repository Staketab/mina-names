import debounce from "lodash.debounce";

export function debounceAsync<A, B>(
  func: (a: A, ...sec: any[]) => Promise<B>,
  debounceDelay?: number,
  onCanceled?: () => void // Add a new optional callback parameter
): {
  (a: A, ...sec: any[]): Promise<B | "skipped">;
  cancel(): void;
} {
  const promiseResolverRef: {
    current: (b: B | "skipped") => void;
    reject: (e: any) => void;
  } = {
    current: () => {},
    reject: (e) => {},
  };

  const debouncedFunc = debounce((a: A, ...sec: any[]) => {
    const promiseResolverSnapshot = promiseResolverRef.current;
    const promiseRejectSnapshot = promiseResolverRef.reject;
    void func(a, ...sec)
      .then((b) => {
        if (promiseResolverSnapshot === promiseResolverRef.current) {
          promiseResolverRef.current(b);
        }
      })
      .catch((e) => {
        if (promiseRejectSnapshot === promiseResolverRef.reject) {
          promiseResolverRef.reject(e);
        }
      });
  }, debounceDelay);

  const debouncedFetchData = (a: A, ...sec: any[]): Promise<B | "skipped"> =>
    new Promise<B | "skipped">((resolve, reject) => {
      promiseResolverRef.current("skipped");
      promiseResolverRef.current = resolve;
      promiseResolverRef.reject = reject;

      debouncedFunc(a, ...sec);
    });

  debouncedFetchData.cancel = (): void => {
    debouncedFunc.cancel();
    if (onCanceled) {
      onCanceled();
    }
    promiseResolverRef.current("skipped");
  };

  return debouncedFetchData;
}
