import axios from 'axios';

import config from '../config';

export default {
  async getAll() {
    const { data } = await axios.get(`${config.api.baseUrl}/v1/tasks`);
    return data;
  },
};
