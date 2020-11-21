import { useFormBloc } from '@src/blocs/form';
import { Card } from '@src/components/card';
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
      <Card.Wrapper>
        <Card.Content
          title='foo'
          actions={[{ name: 'test', callback: () => {} }, { name: 'test' }]}
        >
          test
        </Card.Content>
      </Card.Wrapper>

      {/* <FormWrapper>
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
      </FormWrapper> */}
    </Screen>
  );
}
