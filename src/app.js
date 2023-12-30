import { createSSRApp, h } from "vue";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";
import { _createStore } from "@/stores";

export async function _createApp(ctx) {
  // create application
  const app = createSSRApp({
    render: () => h(ctx.Page),
  });
  // create store
  const store = _createStore();
  const pinia = createPinia();
  // create meta handler
  const head = createHead();
  app.use(head);
  app.use(store);
  app.use(pinia);

  return { app, store, head };
}
