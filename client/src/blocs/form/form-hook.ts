import { FormBloc } from './form-bloc';

const container: { [key: string]: FormBloc<any> | undefined } = {};

export function useFormBloc<T extends { [key: string]: any }>(
  token: string,
  initialData: T
) {
  if (!container[token]) container[token] = new FormBloc(initialData);

  // React.useEffect(() => {
  //   return () => {
  //     container[token] = undefined;
  //   };
  // }, []);

  return container[token] as FormBloc<T>;
}
