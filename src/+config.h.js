const passToClient = ["INITIAL_STATE", "pageProps", "routeParams"];

export default {
  passToClient: passToClient,
  meta: {
    requests: {
      env: { server: true },
    },
  },
};
