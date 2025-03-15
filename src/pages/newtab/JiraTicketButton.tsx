import { PositiveButton, TextField } from "@katalon-studio/katalon-ui/v2";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useEventCallback,
} from "@mui/material";

export const JiraTicketButton = () => {
  const [open, setOpen] = useState(false);
  const handleClose = useEventCallback(() => setOpen(false));
  const handleOpen = useEventCallback(() => setOpen(true));

  const [ticketKey, setTicketKey] = useState("");
  const validatedTicketKey = useMemo(() => {
    const value = ticketKey.trim().toUpperCase();
    if (value.match(/^[A-Z]+-\d+$/) !== null) {
      return value;
    } else {
      return "";
    }
  }, [ticketKey]);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  });

  const handleSubmit = useEventCallback(() => {
    if (validatedTicketKey.length > 0) {
      window.location.href = `https://katalon.atlassian.net/browse/${validatedTicketKey}`;
    }
  });

  return (
    <>
      <PositiveButton onClick={handleOpen} variant="outlined">
        Open Jira Ticket
      </PositiveButton>
      <Dialog disableRestoreFocus onClose={handleClose} open={open}>
        <DialogTitle>Open Jira Ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="off"
            fullWidth
            onChange={setTicketKey}
            onKeyDown={handleKeyDown}
            label="Ticket Key"
            placeholder="e.g. TO-1234"
            value={ticketKey}
          />
        </DialogContent>
        <DialogActions>
          <PositiveButton
            onClick={handleSubmit}
            disabled={validatedTicketKey.length === 0}
            variant="contained"
          >
            Let's go
          </PositiveButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
