import { TextField } from '@material-ui/core';
import { FormBloc, FormEvents } from '@src/blocs/form';
import { createUseStyle } from '@src/config/theme';
import React from 'react';

export function TextFormField<T, R>(props: {
  id: keyof T;
  bloc: FormBloc<T, R>;
  label: string;
  obscure?: boolean;
}) {
  const value = props.bloc.getValue(props.id);
  const { styles } = useStyle();

  return (
    <TextField
      style={styles.container}
      value={value}
      label={props.label}
      type={props.obscure ? 'password' : undefined}
      onChange={(e) => {
        props.bloc.dispatch(new FormEvents.Update<T>(props.id, e.target.value));
      }}
    />
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({
  container: {
    marginBottom: dimensions.gutterLarge,
  },
}));
