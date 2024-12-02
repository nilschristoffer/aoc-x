import React from "react";

import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { ApiLeaderboard } from "../apiType";
import { useAdventOfCodeJson } from "../AdventOfCodeContext";
import { Clear, CookieSharp, DataObject } from "@mui/icons-material";
import { hasAllowedLs, setAllowedLs } from "../useLocalStorage";

const verifiedJSONData = (jsonData: string) => {
  try {
    JSON.parse(jsonData);
    return true;
  } catch (e) {
    return false;
  }
};

const DataModal: React.FunctionComponent = () => {
  const { setLeaderboard, leaderboard } = useAdventOfCodeJson();
  const [jsonData, setJsonData] = React.useState(JSON.stringify(leaderboard));
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(!leaderboard);
  const [hasAllowedCookies, setHasAllowedCookies] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setJsonData(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = () => {
    if (verifiedJSONData(jsonData)) {
      setLeaderboard(JSON.parse(jsonData) as ApiLeaderboard);
      setOpen(false);
    } else {
      setError("Invalid JSON");
    }
  };

  const handleAllowCookies = () => {
    setAllowedLs();
    setHasAllowedCookies(true);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<DataObject />}
        color="secondary"
        sx={{
          color: "secondary.light",
        }}
      >
        Import JSON
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "background.default",
            backgroundImage: "unset",
          },
        }}
      >
        <DialogTitle color="secondary" sx={{ textShadow: "0 0 5px" }}>
          Paste JSON
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {!hasAllowedLs() && !hasAllowedCookies && (
              <Alert
                severity="warning"
                icon={<CookieSharp />}
                sx={{
                  alignItems: "center",
                }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleAllowCookies}
                  >
                    Allow
                  </Button>
                }
              >
                <AlertTitle>Allow cookies?</AlertTitle>
                By storing the provided JSON in your browser's local storage,
                you allow us to store the data you provide, so you don't need to
                import it every time you visit the site. And thats actually the
                only thing we store, no tracking, no ads, no bullshit.
              </Alert>
            )}

            {leaderboard ? (
              <Link
                href={`https://adventofcode.com/${leaderboard.event}/leaderboard/private/view/${leaderboard.owner_id}.json`}
                target="_blank"
              >
                Go to current imported leaderboard with updated data
              </Link>
            ) : (
              <DialogContentText sx={{ wordBreak: "break-word" }}>
                {
                  "https://adventofcode.com/{year}/leaderboard/private/view/{id}.json"
                }
              </DialogContentText>
            )}
            <TextField
              value={jsonData}
              color="secondary"
              onChange={handleChange}
              label={"JSON"}
              multiline
              rows={10}
              error={!!error}
              helperText={error}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: jsonData ? (
                  <IconButton color="secondary" onClick={() => setJsonData("")}>
                    <Clear />
                  </IconButton>
                ) : undefined,
              }}
            ></TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataModal;
