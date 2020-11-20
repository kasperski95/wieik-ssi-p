import { FormBloc, FormStates } from '@src/blocs/form';
import { BlocBuilder } from '@src/modules/react-bloc';
import React from 'react';

interface SharedFormFieldProps<T> {
  id: keyof T;
  bloc: FormBloc<T>;
  value: any;
}

export function FormBuilder<T>(props: {
  formBloc: FormBloc<T>;
  builder: (
    data: T,
    createFormFieldProps: (id: keyof T) => SharedFormFieldProps<T>
  ) => JSX.Element;
}) {
  // const { styles } = useStyle();

  return (
    <BlocBuilder
      bloc={props.formBloc}
      builder={(state) => {
        if (state instanceof FormStates.Editable) {
          return props.builder(state.data, (id: keyof T) => ({
            id,
            value: props.formBloc.getValue(id),
            bloc: props.formBloc,
          }));
        }
        return <React.Fragment />;
      }}
    />
  );
}

// const useStyle = createUseStyle(({ theme, dimensions, shared }) => {
//   return {
//     container: {},
//   };
// });
