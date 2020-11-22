import axios from 'axios';
import React from 'react';

let BackendContext: React.Context<ReturnType<typeof _createBackendUtils>>;

export function useBackend() {
  return React.useContext(BackendContext);
}

export function createBackendUtils(jwt?: string) {
  const backendUtils = _createBackendUtils(jwt);
  BackendContext = React.createContext(backendUtils);

  return {
    BackendProvider: (props: { children: React.ReactNode }) => {
      return <BackendContext.Provider value={backendUtils} {...props} />;
    },
  };
}

function _createBackendUtils(jwt?: string) {
  return {
    async fetch(
      endpoint: string,
      options?: { params?: { [key: string]: string | number } }
    ) {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/${endpoint}`,
        {
          params: options?.params,
          headers: {
            authorization: jwt ? `Bearer ${jwt}` : undefined,
          },
        }
      );
      return result.data;
    },

    async send(endpoint: string, data?: any) {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/${endpoint}`,
        data
      );
      return result.data;
    },
  };
}
