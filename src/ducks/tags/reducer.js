import tagsTypes from './types';

const initialState = {
  tags: null,
};

export default function reducer(state = initialState, action) {
  const { type, tags } = action;
  switch (type) {
    case tagsTypes.TAGS:
      console.log(state.tags);

      const newTags = new Set([tags, ...state.tags]);
      console.log(newTags);

      return {
        ...state,
        tags: [...newTags].filter(t => t),
      };
    default:
      return state;
  }
}
