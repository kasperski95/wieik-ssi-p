import React from 'react';
import { useFormBloc } from './blocs/form';
import { Card } from './components/card';
import { CardContent } from './components/card-content';
import { FormBuilder } from './components/form-builder';
import { TextFormField } from './components/form-fields/text-form-field';
import { FormWrapper } from './components/form-wrapper';
import { ThemeProvider } from './config/theme';
import { Bloc } from './modules/react-bloc';

export function App() {
  Bloc.logger = console;

  const formBloc = useFormBloc('abc', {
    foo: 'bar',
  });

  return (
    <ThemeProvider>
      <Card>
        <CardContent
          title='foo'
          actions={[{ name: 'test', callback: () => {} }]}
        >
          test
        </CardContent>
      </Card>

      <FormWrapper>
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
      </FormWrapper>
    </ThemeProvider>
  );
}
