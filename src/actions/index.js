import * as types from './types';

export const fetchGuides = () => dispatch => {
  dispatch({ type: types.SET_GUIDES, payload: [] });
};

export const setLoading = loading => ({ type: types.LOADING, payload: loading });
