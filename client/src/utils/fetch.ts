import axios from 'axios';

export async function goFetch(
  endpoint: string,
  options?: { params?: { [key: string]: string | number } }
) {
  const result = await axios.get(`${process.env.REACT_APP_API}/${endpoint}`, {
    params: options?.params,
  });
  return result.data;
}
