/* MAIN ENTRY POINT FOR SERVING APPLICATION */
import "dotenv/config";
import express from "express";
import cookies from "cookie-parser";
import { renderPage } from "vike/server";
import mobile from "is-mobile";
import { resolve } from "path";

const root = resolve(".");

// STARTS SERVER //
startServer();

async function startServer() {
  const app = express();

  app.use(cookies());

  const vite = await import("vite");
  const viteDevMiddleware = (
    await vite.createServer({
      root,
      server: { middlewareMode: true },
      appType: "custom",
    })
  ).middlewares;
  app.use(viteDevMiddleware);

  // default route
  app.get("*", async (req, res, next) => {
    const s = Date.now();

    // clean up index.html
    req.url = req.url.replace("index.html", "");

    // parse language from URL
    let { country, lang, path } = ["us", "en", ""];

    // check for bots
    const isBot = false;

    const protocol = req.hostname.includes("localhost") ? "http" : "https";
    // create context page & parse URL
    const pageContextInit = {
      cookie: req.cookies?.vuex, // incoming cookie with state from the browser
      lang: lang,
      country: country,
      isMobile: mobile({ ua: req }),
      urlOriginal: `${protocol}://${req.get("host")}${req.originalUrl}`,
      path: path,
      isBot: isBot,
      reqHeaders: req.headers,
      reqIP: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    };

    // RENDER PAGE TO HTML //
    const pageContext = await renderPage(pageContextInit);
    const { body, statusCode, headers } = pageContext.httpResponse;
    const contentType = headers.find((el) => el[0] == "Content-Type")[1];

    console.log(
      `[Route]"${req.url}": ${Date.now() - s}ms | [IP]: ${
        req.headers["x-forwarded-for"] || req.socket.remoteAddress
      } [UserAgent]: ${req.get("User-Agent")}`
    ); // eslint-disable-line

    // return response to request
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}
