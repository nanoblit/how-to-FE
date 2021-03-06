import axios from 'axios';

export default () => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : 'false';
  const instance = axios.create({
    headers: {
      authorization: token,
    },
  });

  return instance;
};
