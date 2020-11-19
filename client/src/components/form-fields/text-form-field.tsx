import { OutlinedInput } from '@material-ui/core';
import { FormBloc, FormEvents } from '@src/blocs/form';
import React from 'react';

export function TextFormField<T>(props: {
  id: keyof T;
  bloc: FormBloc<T>;
  label: string;
}) {
  const value = props.bloc.getValue(props.id);

  return (
    <OutlinedInput
      value={value}
      onChange={(e) => {
        props.bloc.dispatch(new FormEvents.Update<T>(props.id, e.target.value));
      }}
    />
  );
}
