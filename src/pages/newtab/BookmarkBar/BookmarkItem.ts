export interface BookmarkItem {
  children?: BookmarkItem[];
  id: string;
  title: string;
  url?: string;
}
