<template>
  <div>
    <v-subheader>Teste</v-subheader>
    <v-list>
      <v-list-item v-for="task  in tasks" v-bind:key="task.id">{{ task.name }}</v-list-item>
    </v-list>
  </div>
</template>

<script>
import taskService from '../services/task';

export default {
  name: 'Tasklist',
  data: () => ({
    tasks: taskService.getAll(),
  }),
};
</script>
