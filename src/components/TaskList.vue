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

<template>
  <div>
    <v-subheader>Teste</v-subheader>
    <div class="list-wrapper" v-if="status === 'loaded'">
      <v-list>
        <v-list-item v-for="task  in tasks" v-bind:key="task._id">{{ task.title }}</v-list-item>
      </v-list>

      <v-progress-circular
        v-if="hasNext"
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
    hasNext: true,
  }),
  async created() {
    await this.loadTasks();
    this.status = 'loaded';

    this.handleDebouncedScroll = debounce(this.handleScroll, 300);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  },
  methods: {
    handleScroll() {
      if (this.loadingData || !this.hasNext) {
        return;
      }

      const { scrollLoader } = this.$refs;
      if (scrollLoader) {
        const { top } = scrollLoader.$el.getBoundingClientRect();

        if (top <= window.innerHeight - SCROLL_MARGIN) {
          this.loadTasks();
        }
      }
    },
    async loadTasks() {
      this.loadingData = true;
      if (!this.tasksLoader) {
        this.tasksLoader = await taskService.getAll();
      } else {
        this.tasksLoader = await this.tasksLoader.next();
      }
      this.loadingData = false;

      const { tasks, hasNext } = this.tasksLoader;
      this.hasNext = hasNext;
      this.$data.tasks.push(...tasks);

      setTimeout(this.handleScroll);
    },
  },
};
</script>
