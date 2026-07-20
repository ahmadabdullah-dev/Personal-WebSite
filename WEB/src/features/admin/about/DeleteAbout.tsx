import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useAbout } from "../../../lib/hooks/useAbout";

export default function DeleteAbout() {
  const { deleteAboutAsync } = useAbout();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    deleteAboutAsync.mutate();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Delete About
          </Typography>

          <Box component="form" onSubmit={handleOpenConfirm}>
            <Stack spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="error"
                fullWidth
                disabled={deleteAboutAsync.isPending}
              >
                {deleteAboutAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Delete About"
                )}
              </Button>
              {deleteAboutAsync.error && (
                <Alert severity="error">{deleteAboutAsync.error.message}</Alert>
              )}
              {deleteAboutAsync.isSuccess && (
                <Alert severity="success">{deleteAboutAsync.data?.value}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete About?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
