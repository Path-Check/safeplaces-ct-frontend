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
};

export default pointsService;
