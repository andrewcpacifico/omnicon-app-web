<template>
  <div>
    <v-subheader>Teste</v-subheader>
    <v-list v-if="status === 'loaded'">
      <v-list-item v-for="task  in tasks" v-bind:key="task.id">{{ task.name }}</v-list-item>
    </v-list>
    <v-progress-circular
      v-else
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import taskService from '../services/task';

export default {
  name: 'Tasklist',
  data: () => ({
    tasks: [],
    status: 'loading',
  }),
  async beforeCreate() {
    const tasks = await taskService.getAll();
    this.$data.tasks = tasks;
    this.status = 'loaded';
  },
};
</script>
