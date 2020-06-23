import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const pointsService = {
  delete: pointId => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}case/point/delete`,
      data: {
        pointId,
      },
    });
  },
  deletePoints: pointIds => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}case/points/delete`,
      data: {
        pointIds,
      },
    });
  },
  edit: data => {
    return axios({
      method: 'PUT',
      url: `${REACT_APP_API_URL}case/point`,
      data,
    });
  },
  setLabel: label => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}case/point`,
      data: {
        label,
      },
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
