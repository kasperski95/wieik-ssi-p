import React from 'react';
import { FormStates, useFormBloc } from './blocs/form';
import { TextFormField } from './components/form-fields/text-form-field';
import { Bloc, BlocBuilder } from './modules/react-bloc';

export function App() {
  Bloc.logger = console;

  const bloc = useFormBloc('abc', {
    foo: 'bar',
  });

  return (
    <React.Fragment>
      <BlocBuilder
        bloc={bloc}
        builder={(state) => {
          if (state instanceof FormStates.Editable)
            return <TextFormField bloc={bloc} id='foo' label='foo' />;
          else return <div>bar</div>;
        }}
      />
    </React.Fragment>
  );
}
