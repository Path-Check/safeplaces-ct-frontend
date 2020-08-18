import tooltipsTypes from './types';

const tooltipsActions = {
  setActiveTooltip: activeTooltip => ({
    type: tooltipsTypes.SET_ACTIVE_TOOLTIP,
    activeTooltip,
  }),
};

export default tooltipsActions;
