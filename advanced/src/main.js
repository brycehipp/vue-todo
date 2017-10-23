import Vue from 'vue';
import VuePersist from 'vue-persist';
import App from './App.vue';

Vue.use(VuePersist);

const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get() {
      return EventBus;
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
