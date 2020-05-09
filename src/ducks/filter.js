import { createAction, createReducer } from '@reduxjs/toolkit';

export const updateFilter = createAction('safeplaces/filter/UPDATE_FILTER');
export const updateFilterDates = createAction(
  'safeplaces/filter/UPDATE_FILTER_DATES',
);

export default createReducer(
  { dates: {} },
  {
    [updateFilter]: (state, action) => action.payload,
    [updateFilterDates]: (state, action) => {
      return { ...state, dates: action.payload };
    },
  },
);
