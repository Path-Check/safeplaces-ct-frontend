import tooltipsTypes from './types';

const initialState = {
  activeTooltip: 1,
};

export default function reducer(state = initialState, action) {
  const { activeTooltip } = action;
  switch (action.type) {
    case tooltipsTypes.SET_ACTIVE_TOOLTIP:
      return {
        ...state,
        activeTooltip,
      };
    default:
      return state;
  }
}
