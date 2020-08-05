import axios from 'axios';

const { REACT_APP_LOCALIZATION_API_URL } = process.env;

const contentService = {
  fetchContent: language => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_LOCALIZATION_API_URL}${language}.json`,
    });
  },
};

export default contentService;
