export const UPDATE_FILTER = 'safeplaces/filter/UPDATE_FILTER';
export const UPDATE_FILTER_DATES = 'safeplaces/filter/UPDATE_FILTER_DATES';

const initialState = { dates: [] };

export default function detail(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return action.data;
    case UPDATE_FILTER_DATES:
      return { ...state, dates: action.data };
    default:
      return state;
  }
}

export const updateFilter = data => {
  return {
    type: UPDATE_FILTER,
    data,
  };
};

export const updateFilterDates = data => {
  return {
    type: UPDATE_FILTER_DATES,
    data,
  };
};
