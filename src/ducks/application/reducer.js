import applicationTypes from './types';

const initialState = {
  status: 'IDLE',
  notification: null,
  editorView: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case applicationTypes.STATUS:
      return { ...state, status: action.status };
    case applicationTypes.NOTIFICATION:
      return {
        ...state,
        notification: action.data,
      };
    case applicationTypes.EDITOR_VIEW:
      return {
        ...state,
        renderEditor: action.renderEditor,
      };
    default:
      return state;
  }
}
