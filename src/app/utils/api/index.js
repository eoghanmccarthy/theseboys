import { useQuery } from 'react-query';
import axios from 'axios';

const getAuth = async () => {
  const { data } = await axios.get(`http://eoghan.io/`);
  return data;
};

export const useGetAuth = (instance, options = {}) => {
  return useQuery([{ name: 'get_auth', instance }], getAuth, {
    ...options
  });
};
