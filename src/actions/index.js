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
    });
};

export const setLoading = loading => ({ type: types.LOADING, payload: loading });
