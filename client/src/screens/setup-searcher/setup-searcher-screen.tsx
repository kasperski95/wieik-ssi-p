import { useFormBloc } from '@src/blocs/form';
import { Card } from '@src/components/card';
import { CardContent } from '@src/components/card-content';
import { FormBuilder } from '@src/components/form-builder';
import { TextFormField } from '@src/components/form-fields/text-form-field';
import { FormWrapper } from '@src/components/form-wrapper';
import { Screen } from '@src/components/screen';
import { Bloc } from '@src/modules/react-bloc';
import React from 'react';

export function SetupSearcherScreen() {
  Bloc.logger = console;

  const formBloc = useFormBloc('abc', {
    foo: 'bar',
  });

  return (
    <Screen>
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
    </Screen>
  );
}
