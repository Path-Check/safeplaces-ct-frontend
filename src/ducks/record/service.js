import axios from 'axios';
import { getSettingsApi } from 'ducks/settingsApi';

export function fetch({ data, endpoint }) {
  const settingsApi = getSettingsApi;

  const url = `${settingsApi.apiurl}/${endpoint}/`;

  return axios({
    method: 'POST',
    url,
    data,
  });
}
