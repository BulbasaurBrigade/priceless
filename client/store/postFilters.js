/* eslint-disable no-underscore-dangle */
// Action Types
const SET_CATEGORY = 'SET_CATEGORY';
const SET_BOUNDS = 'SET_BOUNDS';
const SET_SEARCH = 'SET_SEARCH';
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

export const _setSearch = (search) => ({
  type: SET_SEARCH,
  search,
});

// Reducer
const initialState = {
  bounds: { north: null, east: null, south: null, west: null },
  filter: '',
  search: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.search };
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
