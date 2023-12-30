import { _createApp } from "./app";

export default render;

async function render(pageContext) {
  // this loads the state from the server (corresponds to ssrContext.state)
  const state = pageContext.INITIAL_STATE;

  const { app, store } = await _createApp(pageContext);

  store.replaceState(state);

  app.mount("#app");
}
