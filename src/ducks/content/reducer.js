import contentTypes from './types';

const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, content } = action;

  switch (type) {
    case contentTypes.CONTENT:
      console.log(type);
      return {
        ...state,
        ...content,
      };
    default:
      return state;
  }
}
