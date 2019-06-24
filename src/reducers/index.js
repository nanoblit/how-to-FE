import * as types from '../actions/types';

export const guidesReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_GUIDES:
      return action.payload;
    default:
      return state;
  }
};

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case types.LOADING:
      return action.payload;
    default:
      return state;
  }
};
