import axios from 'axios';

export async function fetch(endpoint: string) {
  const result = await axios.get(`${process.env.REACT_APP_API}/${endpoint}`);
  console.log(result);
  return result.data;
}
