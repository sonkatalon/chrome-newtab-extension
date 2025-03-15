import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import { theme } from "@katalon-studio/katalon-ui";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { JiraTicketButton } from "./JiraTicketButton";
import { SourceLink } from "./SourceLink";
import { BookmarkBar } from "./BookmarkBar";

export const NewtabPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} sx={{ m: 2 }}>
        <BookmarkBar />
        <JiraTicketButton />
        <SourceLink />
      </Stack>
    </ThemeProvider>
  );
};
