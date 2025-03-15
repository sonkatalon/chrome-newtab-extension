import { Menu, MenuItem, NeutralButton } from "@katalon-studio/katalon-ui/v2";
import { Box, styled, useEventCallback } from "@mui/material";
import { useCallback, useState } from "react";
import { BookmarkItem } from "./BookmarkItem";
import { Favicon } from "./Favicon";
import { useBookmarkItems } from "./useBookmarkItems";

const EllipsisSpan = styled("span")({
  maxWidth: "150px",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const SquareButton = styled(NeutralButton)({
  minWidth: "32px",
});

export const BookmarkBar = () => {
  const items = useBookmarkItems();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [activeItem, setActiveItem] = useState<BookmarkItem>();
  const open = Boolean(anchorEl);

  const handleClick = useEventCallback(
    (event: React.MouseEvent<HTMLElement>, item: BookmarkItem) => {
      if (item.children && item.children.length > 0) {
        setAnchorEl(event.currentTarget);
        setActiveItem(item);
      } else if (item.url) {
        window.location.href = item.url;
      }
    }
  );

  const handleClose = useCallback(() => {
    setAnchorEl(undefined);
    setActiveItem(undefined);
  }, []);

  return (
    <>
      <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        {items.map((item) => (
          <SquareButton
            key={item.id}
            onClick={(e) => handleClick(e, item)}
            startIcon={<Favicon item={item} />}
          >
            <EllipsisSpan title={item.title}>{item.title}</EllipsisSpan>
          </SquareButton>
        ))}
      </Box>
      <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
        {activeItem?.children?.map((childItem) => (
          <MenuItem
            key={childItem.id}
            leadingElement={<Favicon item={childItem} />}
            onClick={(e) => handleClick(e, childItem)}
          >
            {childItem.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
