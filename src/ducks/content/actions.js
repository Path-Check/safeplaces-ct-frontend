import contentTypes from './types';

const contentActions = {
  setContent: content => ({
    type: contentTypes.CONTENT,
    content,
  }),
  determineContent: () => ({
    type: contentTypes.DETERMINE_CONTENT,
  }),
};

export default contentActions;
