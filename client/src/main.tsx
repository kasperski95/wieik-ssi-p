import React from 'react';
import { useFormBloc } from './blocs/form';
import { FormBuilder } from './components/form-builder';
import { TextFormField } from './components/form-fields/text-form-field';
import { styling, ThemeProvider } from './config/theme';
import { Bloc } from './modules/react-bloc';

export function App() {
  Bloc.logger = console;

  const formBloc = useFormBloc('abc', {
    foo: 'bar',
  });

  return (
    <ThemeProvider value={styling}>
      <FormBuilder
        formBloc={formBloc}
        builder={(formData, createProps) => {
          return (
            <React.Fragment>
              <TextFormField label='test' {...createProps('foo')} />
              <TextFormField label='test' {...createProps('foo')} />
            </React.Fragment>
          );
        }}
      />
    </ThemeProvider>
  );
}
