export const SELECT = 'safeplaces/settingsApi/SELECT';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return action.data;
    default:
      return state;
  }
}

export const getSettingsApi = state => state.settingsApi;

export const changeSettingsApi = data => ({
  type: SELECT,
  data,
});
