import axios from 'axios';

const { REACT_APP_TRANSLATION_API_URL } = process.env;

const pointsService = {
  delete: discreetPointIds => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_TRANSLATION_API_URL}case/points/delete`,
      data: {
        discreetPointIds,
      },
    });
  },
  deletePoints: ids => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_TRANSLATION_API_URL}case/points/delete`,
      data: {
        discreetPointIds: ids,
      },
    });
  },
  edit: data => {
    return axios({
      method: 'PUT',
      url: `${REACT_APP_TRANSLATION_API_URL}case/point`,
      data,
    });
  },
  setLabel: data => {
    return axios({
      method: 'PUT',
      url: `${REACT_APP_TRANSLATION_API_URL}case/points`,
      data,
    });
  },
  add: data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_TRANSLATION_API_URL}case/point`,
      data,
    });
  },
};

export default pointsService;
