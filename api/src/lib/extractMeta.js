/**
 * @param { import("cheerio").CheerioAPI } $
 * @param { string } url
 * @returns { { title: string | undefined, description: string | undefined, favicon: string } }
 */
export const extractMeta = ($, url) => {
  const title =
    $('meta[property="og:title"]').attr("content") ||
    $('meta[name="title"]').attr("content") ||
    $("title").text().trim() ||
    undefined
  const description =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content") ||
    undefined;
  const iconTag =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href");

  let favicon = '';

  if (iconTag) {
    favicon = new URL(iconTag, url).href;
  } else {
    favicon = new URL("/favicon.ico", url).href;
  }
  return { title, description, favicon };
};
