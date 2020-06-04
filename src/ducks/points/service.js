import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const pointsService = {
  delete: pointId => {
    return axios({
      method: 'DELETE',
      url: `${REACT_APP_API_URL}point`,
      data: {
        pointId,
      },
    });
  },
  edit: data => {
    return axios({
      method: 'PUT',
      url: `${REACT_APP_API_URL}point`,
      data,
    });
  },
  add: data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}case/point`,
      data,
    });
  },
};

export default pointsService;
