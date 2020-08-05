import contentTypes from './types';

const contentActions = {
  setContent: content => ({
    type: contentTypes.CONTENT,
    content,
  }),
  setLanguage: language => ({
    type: contentTypes.LANGUAGE,
    language,
  }),
  determineContent: () => ({
    type: contentTypes.DETERMINE_CONTENT,
  }),
};

export default contentActions;
