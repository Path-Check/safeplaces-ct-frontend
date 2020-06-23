import tagsTypes from './types';

const initialState = {
  tags: [],
};

export default function reducer(state = initialState, action) {
  const { type, tags } = action;
  switch (type) {
    case tagsTypes.TAGS:
      const newTags = new Set([...state.tags, tags]);

      return {
        ...state,
        tags: [...newTags],
      };
    default:
      return state;
  }
}
