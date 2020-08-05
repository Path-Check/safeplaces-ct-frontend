import axios from 'axios';

const contentService = {
  fetchContent: language => {
    return axios({
      method: 'GET',
      url: `./localization/${language}.json`,
    });
  },
};

export default contentService;
