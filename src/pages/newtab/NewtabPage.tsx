import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import { theme } from "@katalon-studio/katalon-ui";
import { CssBaseline, Stack, ThemeProvider, Typography } from "@mui/material";

export const NewtabPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} sx={{ m: 2 }}>
        <Typography variant="h3">chrome-newtab-extension</Typography>
      </Stack>
    </ThemeProvider>
  );
};
