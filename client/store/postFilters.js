/* eslint-disable no-underscore-dangle */
// Action Types
const SET_CATEGORY = 'SET_CATEGORY';
const SET_BOUNDS = 'SET_BOUNDS';
const CLEAR_FILTERS = 'CLEAR_FILTERS';

// Action Creators
export const _setCategory = (category) => ({
  type: SET_CATEGORY,
  category,
});

export const _setBounds = (north, east, south, west) => ({
  type: SET_BOUNDS,
  bounds: {
    north,
    south,
    east,
    west,
  },
});

// Reducer
const initialState = {
  bounds: { north: null, east: null, south: null, west: null },
  filter: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, filter: action.category };
    case SET_BOUNDS:
      return { ...state, bounds: action.bounds };
    case CLEAR_FILTERS:
      return initialState;
    default:
      return state;
  }
};
