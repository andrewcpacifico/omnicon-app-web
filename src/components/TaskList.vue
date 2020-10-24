<template>
  <div>
    <v-subheader>Teste</v-subheader>
    <div class="list-wrapper" v-if="status === 'loaded'">
      <v-list>
        <v-list-item v-for="task  in tasks" v-bind:key="task._id">{{ task.title }}</v-list-item>
      </v-list>

      <v-progress-circular
        class="scroll-loader"
        ref="scrollLoader"
        indeterminate
      ></v-progress-circular>
    </div>

    <v-progress-circular class="loader"
      v-else
      indeterminate
      size="50"
    ></v-progress-circular>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import taskService from '../services/task';

const SCROLL_MARGIN = 5;

export default {
  name: 'Tasklist',
  data: () => ({
    tasks: [],
    status: 'loading',
    loadingData: false,
  }),
  async beforeCreate() {
    this.loadingData = true;
    const tasks = await taskService.getAll();
    this.$data.tasks = tasks;
    this.status = 'loaded';
    this.loadingData = false;
  },
  created() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 300);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  },
  methods: {
    handleScroll() {
      if (this.loadingData) {
        return;
      }

      const { scrollLoader } = this.$refs;
      const { top } = scrollLoader.$el.getBoundingClientRect();

      if (top <= window.innerHeight - SCROLL_MARGIN) {
        this.loadMoreData();
      }
    },
    loadMoreData() {
      console.log('loading data...');
      this.loadingData = true;
      setTimeout(() => {
        this.loadingData = false;
      }, 3000);
    },
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

  .list-wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .scroll-loader {
    margin-top: 20px;
  }
</style>
