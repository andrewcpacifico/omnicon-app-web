import config from '../config';

class TaskService {
  constructor({ axios }) {
    this.axios = axios;
  }

  async getAll({ offset = 0, limit = 10 } = {}) {
    const { data } = await this.axios.get(`${config.api.baseUrl}/v1/tasks?limit=${limit}&offset=${offset}`);
    return {
      tasks: data,
      hasNext: data.length === limit,
      next: () => this.getAll({ limit, offset: offset + limit }),
    };
  }
}

export default TaskService;
