import contentTypes from './types';

const initialState = {
  data: null,
  language: null,
};

export default function reducer(state = initialState, action) {
  const { type, content } = action;

  switch (type) {
    case contentTypes.CONTENT:
      return {
        ...state,
        data: content,
      };
    case contentTypes.LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
}
