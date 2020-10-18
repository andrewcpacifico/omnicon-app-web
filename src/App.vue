<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      hide-on-scroll
    >
    </v-app-bar>

    <v-main>
      <TaskList/>
    </v-main>
  </v-app>
</template>

<script>
import TaskList from './components/TaskList.vue';

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
