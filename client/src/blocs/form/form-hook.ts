import { FormBloc } from './form-bloc';
import { FormBlocOptions } from './form-types';

const container: { [key: string]: FormBloc<any> | undefined } = {};

export function useFormBloc<T extends { [key: string]: any }>(
  token: string,
  initialData: T,
  options?: FormBlocOptions<T>
) {
  if (!container[token]) container[token] = new FormBloc(initialData, options);

  // React.useEffect(() => {
  //   return () => {
  //     container[token] = undefined;
  //   };
  // }, []);

  return container[token] as FormBloc<T>;
}
