import { UPDATE_FILTER, UPDATE_FILTER_DATES } from '../constants/ActionTypes';

const initialState = { dates: [] }; // todo: change dates to a object -> startDate, endDate

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
