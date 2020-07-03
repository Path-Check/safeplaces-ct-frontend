import tagsTypes from './types';

const tagsActions = {
  setTags: tags => ({
    type: tagsTypes.TAGS,
    tags,
  }),
};

export default tagsActions;
