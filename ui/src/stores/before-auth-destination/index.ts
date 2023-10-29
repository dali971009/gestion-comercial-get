import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

export default defineStore('beforeAuthDestination', {
  state: () => ({
    beforeAuthDestination: null as RouteLocationNormalized | null,
  }),
  getters: {
    destination: state => {
      return state.beforeAuthDestination ?? null;
    },
  },
  actions: {
    setDestination(destination: RouteLocationNormalized | null) {
      this.beforeAuthDestination = destination;
    },
    clearDestination() {
      this.beforeAuthDestination = null;
    },
  },
});
