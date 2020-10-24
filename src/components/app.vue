<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      hide-on-scroll
    >
      <v-toolbar-title>Omnicon</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <task-list/>
    </v-main>
  </v-app>
</template>

<script>
import TaskList from './task-list.vue';

export default {
  name: 'App',

  components: {
    TaskList,
  },

  data: () => ({
    //
  }),
};
</script>
