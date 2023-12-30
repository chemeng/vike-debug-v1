import { dangerouslySkipEscape } from "vike/server";

export default render;

async function render(context) {
  // this runs after onBeforeRender
  const { renderedHtml, headTags, htmlAttrs, bodyAttrs } = context;

  let extraScripts = "";

  const documentHtml = dangerouslySkipEscape(`
        <!DOCTYPE html>
        <html lang="${context.lang}-${context.country}" ${htmlAttrs}>
        <head>
            ${headTags}
            ${extraScripts}
        </head>
        <body ${bodyAttrs}>
        <div id="app">${renderedHtml}</div>
        </body>
        </html>`);

  return {
    documentHtml,
    pageContext: context.pageContext,
  };
}
