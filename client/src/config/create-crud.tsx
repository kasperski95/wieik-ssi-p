import axios from 'axios';
import React from 'react';
import { endpoints } from './routes';

let CrudContext: React.Context<ReturnType<typeof _createCrud>>;

type Endpoint = typeof endpoints[keyof typeof endpoints];

export function useCrud() {
  return React.useContext(CrudContext);
}

export function createCrud(jwt?: string) {
  const backendUtils = _createCrud(jwt);
  CrudContext = React.createContext(backendUtils);

  return {
    CrudProvider: (props: { children: React.ReactNode }) => {
      return <CrudContext.Provider value={backendUtils} {...props} />;
    },
  };
}

function _createCrud(jwt?: string) {
  return {
    async read(
      endpoint: Endpoint,
      options?: {
        params?: { [key: string]: string | number };
        query?: { suffix: string; data: { [key: string]: string | number } };
      }
    ) {
      let suffix = '';
      if (options?.query) {
        suffix = Object.entries(options.query.data).reduce(
          (acc, [key, value]) => {
            return acc.replace(':' + key, value.toString());
          },
          options.query.suffix
        );
      }

      const result = await axios.get(
        `${process.env.REACT_APP_API}/${endpoint}${suffix}`,
        {
          params: options?.params,
          headers: {
            authorization: jwt ? `Bearer ${jwt}` : undefined,
          },
        }
      );
      return result.data;
    },

    async create(endpoint: Endpoint, data?: any) {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/${endpoint}`,
        data,
        {
          headers: {
            authorization: jwt ? `Bearer ${jwt}` : undefined,
          },
        }
      );
      return result.data;
    },
  };
}
