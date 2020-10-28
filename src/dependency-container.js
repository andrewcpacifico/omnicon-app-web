import { asClass, asValue, createContainer } from 'awilix';
import axios from 'axios';

import TaskService from './services/task';

function registerDependencies() {
  const dependencyContainer = createContainer();

  dependencyContainer.register({
    // 3rd party deps
    axios: asValue(axios),
  });

  dependencyContainer.register({
    // services
    taskService: asClass(TaskService).singleton(),
  });

  return dependencyContainer.cradle;
}

export default registerDependencies();
