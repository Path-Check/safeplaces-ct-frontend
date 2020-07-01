import tagsTypes from './types';

const initialState = {
  tags: [],
};

export default function reducer(state = initialState, action) {
  const { type, tags } = action;
  switch (type) {
    case tagsTypes.TAGS:
      return {
        ...state,
        tags: [...new Set([tags, ...state.tags])].filter(t => t),
      };
    default:
      return state;
  }
}
