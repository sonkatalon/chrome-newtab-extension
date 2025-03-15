import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { BookmarkItem } from "./BookmarkItem";

function findBookmarkBar(
  nodes: browser.Bookmarks.BookmarkTreeNode[]
): BookmarkItem[] {
  let next = nodes;

  if (nodes.length === 1) {
    const node = nodes[0];
    const { children, title } = node;
    if (!children) {
      return [];
    }

    if (
      title === "Bookmarks Bar" ||
      (node as any).folderType === "bookmarks-bar"
    ) {
      return toBookmarkItems(children);
    }

    next = children;
  }

  return next.reduce((prev, child) => {
    const items = findBookmarkBar([child]);
    return [...prev, ...items];
  }, [] as BookmarkItem[]);
}

function toBookmarkItems(
  children: browser.Bookmarks.BookmarkTreeNode[]
): BookmarkItem[] {
  return children.map((child) => ({
    children: child.children ? toBookmarkItems(child.children) : undefined,
    id: child.id,
    title: child.title,
    url: child.url,
  }));
}

export function useBookmarkItems() {
  const [items, setItems] = useState<BookmarkItem[]>([]);
  useEffect(() => {
    (async () => {
      const tree = await browser.bookmarks.getTree();
      setItems(findBookmarkBar(tree));
    })();
  }, []);

  return items;
}
