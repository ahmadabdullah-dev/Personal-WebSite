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
import { useHome } from "../../../lib/hooks/useHome";

export default function DeleteHome() {
  const { deleteHomeAsync } = useHome();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    deleteHomeAsync.mutate();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Delete Home
          </Typography>

          <Box component="form" onSubmit={handleOpenConfirm}>
            <Stack spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="error"
                fullWidth
                disabled={deleteHomeAsync.isPending}
              >
                {deleteHomeAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Delete Home"
                )}
              </Button>
              {deleteHomeAsync.error && (
                <Alert severity="error">{deleteHomeAsync.error.message}</Alert>
              )}
              {deleteHomeAsync.isSuccess && (
                <Alert severity="success">{deleteHomeAsync.data?.value}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Home?</DialogTitle>
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
