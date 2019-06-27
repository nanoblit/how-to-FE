import { createBrowserHistory } from 'history';

import authedAxios from '../misc/authedAxios';
import * as types from './types';

export const fetchGuides = () => dispatch => {
  dispatch({ type: types.SET_GUIDES, payload: [] });
  authedAxios()
    .get('http://localhost:8000/guides')
    .then(res => {
      console.log(res.data);
      dispatch({ type: types.SET_GUIDES, payload: res.data });
    })
    .catch(error => {
      console.log(error.message);
      createBrowserHistory().push('/welcome'); // Doesn't work when going back
    });
};

export const setLoading = loading => ({ type: types.LOADING, payload: loading });
