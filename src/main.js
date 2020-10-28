import Vue from 'vue';

import app from './components/app.vue';
import dependencyContainer from './dependency-container';
import dependencyContainerMixin from './mixins/dependency-container';
import vuetify from './plugins/vuetify';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

dependencyContainerMixin(Vue);

new Vue({
  dependencyContainer,
  vuetify,
  render: (h) => h(app),
}).$mount('#app');
