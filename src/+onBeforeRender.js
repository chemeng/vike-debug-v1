import { renderToString } from "@vue/server-renderer";
import { renderHeadToString } from "@vueuse/head";
import { _createApp } from "./app.js";

export default onBeforeRender;

async function onBeforeRender(ctx) {
  // fetch data from server
  if (ctx.config?.requests) {
    try {
      await fetchData(ctx);
    } catch (error) {
      console.error(error && error.stack);
    }
  }
  // create app instance
  const { app, store, head } = await _createApp(ctx);

  // create HTML
  const renderedHtml = await renderToString(app, ctx);

  // extract metadata
  const { headTags, htmlAttrs, bodyAttrs } = await renderHeadToString(head);
  const INITIAL_STATE = store.state;

  // prepare data to be passed to the client
  const { pageProps } = ctx;

  return {
    pageContext: {
      INITIAL_STATE,
      pageProps,
      renderedHtml,
      headTags,
      htmlAttrs,
      bodyAttrs,
    },
  };
}

async function fetchData(ctx) {
  // helper function for getting data from server

  const promiseArray = [];

  console.log(ctx.config.requests); // list of strings instead of objects

  for (const i in ctx.config.requests) {
    let serverRequest = ctx.config.requests[i];
    console.log(serverRequest); // this simply has a string and not an object

    console.log(serverRequest.url); // undefined
  }
  await Promise.allSettled(promiseArray);
}
