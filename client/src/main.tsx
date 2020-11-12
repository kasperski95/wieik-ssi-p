import React from 'react';
import { TestEvents, TestStates, useTestBloc } from './blocs/test';
import { BlocBuilder } from './modules/react-bloc';

export function App() {
  const bloc = useTestBloc();
  return (
    <React.Fragment>
      <button
        children='test'
        onClick={() => {
          bloc.dispatch(new TestEvents.Toggle());
        }}
      />
      <BlocBuilder
        bloc={bloc}
        builder={(state) => {
          if (state instanceof TestStates.Initial) return <div>foo</div>;
          else return <div>bar</div>;
        }}
      />
    </React.Fragment>
  );
}
