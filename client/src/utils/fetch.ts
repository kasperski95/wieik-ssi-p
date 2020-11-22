import axios from 'axios';

export async function goFetch(endpoint: string) {
  const result = await axios.get(`${process.env.REACT_APP_API}/${endpoint}`);
  return result.data;
}
