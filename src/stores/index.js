import { createStore } from "vuex";

export function _createStore() {
  return createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    devtools: false, // if this is ON you get memory leak, see: https://github.com/vuejs/vuex/issues/1934
  });
}
