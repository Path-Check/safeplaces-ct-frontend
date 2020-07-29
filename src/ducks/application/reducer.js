import applicationTypes from './types';

const initialState = {
  status: 'IDLE',
  notification: null,
  editorView: false,
  mode: undefined,
  newCase: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case applicationTypes.STATUS:
      return { ...state, status: action.status };
    case applicationTypes.NEW_CASE:
      return {
        ...state,
        newCase: action.newCase,
      };
    case applicationTypes.NOTIFICATION:
      return {
        ...state,
        notification: action.data,
      };
    case applicationTypes.ACTIVE_POINT:
      return {
        ...state,
        activePoint: action.data,
      };
    case applicationTypes.EDITOR_VIEW:
      return {
        ...state,
        renderEditor: action.renderEditor,
      };
    case applicationTypes.MODE:
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
}
