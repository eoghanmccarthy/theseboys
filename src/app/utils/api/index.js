import { useQuery } from 'react-query';
import axios, { CancelToken } from 'axios';

const getAuth = async () => {
  const source = CancelToken.source();

  const promise = await axios.get(`http://eoghan.io/data/config`, {
    cancelToken: source.token
  });

  promise.cancel = () => {
    source.cancel('Query was cancelled.');
  };

  return promise;
};

export const useGetAuth = (instance, options = {}) => {
  return useQuery([{ name: 'get_auth', instance }], getAuth, {
    ...options
  });
};
