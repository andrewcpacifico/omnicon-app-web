<template>
  <div>
    <v-subheader>Teste</v-subheader>
    <v-list v-if="status === 'loaded'">
      <v-list-item v-for="task  in tasks" v-bind:key="task.id">{{ task.name }}</v-list-item>
    </v-list>

    <v-progress-circular class="loader"
      v-else
      indeterminate
      size="50"
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

<style scoped>
  .loader {
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
  }
</style>
