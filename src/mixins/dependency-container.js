export default function registerMixin(Vue) {
  Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.dependencyContainer) {
        this.$dependencyContainer = options.dependencyContainer;
      } else if (options.parent && options.parent.$dependencyContainer) {
        this.$dependencyContainer = options.parent.$dependencyContainer;
      }
    },
  });
}
