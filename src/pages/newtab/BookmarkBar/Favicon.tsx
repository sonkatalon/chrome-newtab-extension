import { useMemo } from "react";
import browser from "webextension-polyfill";
import { BookmarkItem } from "./BookmarkItem";

function buildFaviconUrl({ url: itemUrl }: BookmarkItem): string | undefined {
  if (typeof itemUrl !== "string") {
    return undefined;
  }

  const url = new URL(browser.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", itemUrl);
  url.searchParams.set("size", "32");
  return url.toString();
}

interface FaviconProps {
  item: BookmarkItem;
}

const style = { width: "16px", height: "16px" };

export const Favicon = ({ item }: FaviconProps) => {
  const src = useMemo(() => buildFaviconUrl(item), [item]);
  return src && <img alt={item.title} src={src} style={style} />;
};
