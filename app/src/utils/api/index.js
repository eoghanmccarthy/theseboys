import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetAuth = (options = {}) => {
  return useQuery(
    ['GET_AUTH'],
    async () => {
      const { data } = await axios.get(`http://eoghan.io/`);
      return data;
    },
    {
      ...options
    }
  );
};
