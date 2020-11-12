import React from "react";
import { TestBloc } from "./test-bloc";

let instance: TestBloc | null;

export function useTestBloc() {
  if (instance == null) instance = new TestBloc();

  React.useEffect(() => {
    return () => {
      instance = null;
    }
  }, []);


  return instance;
}
