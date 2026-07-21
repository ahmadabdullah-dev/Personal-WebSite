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
  Divider,
} from "@mui/material";
import { useHome } from "../../../lib/hooks/useHome";

export default function AddHomeFiles() {
  const { addHomeFilesAsync } = useHome();

  const [homeImage, setHomeImage] = useState<File>();
  const [cv, setCv] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHomeImage(e.target.files?.[0]);
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCv(e.target.files?.[0]);
  };

  const handleFilesUpload = () => {
    if (!homeImage && !cv) return;

    addHomeFilesAsync.mutate(
      { homeImage, cv },
      {
        onSuccess: () => {
          setHomeImage(undefined);
          setCv(undefined);
        },
      },
    );
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" sx={{ mb: 2 }}>
            Add Files
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="outlined"
              component="label"
              disabled={addHomeFilesAsync.isPending}
            >
              {homeImage ? homeImage.name : "Choose Home Image"}
              <input
                key={homeImage?.name ?? "home-image"}
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            <Button
              variant="outlined"
              component="label"
              disabled={addHomeFilesAsync.isPending}
            >
              {cv ? cv.name : "Choose CV"}
              <input
                key={cv?.name ?? "cv"}
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleCvChange}
              />
            </Button>

            <Button
              variant="contained"
              onClick={handleFilesUpload}
              disabled={addHomeFilesAsync.isPending || (!homeImage && !cv)}
            >
              {addHomeFilesAsync.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Upload Files"
              )}
            </Button>

            {addHomeFilesAsync.error && (
              <Alert severity="error">{addHomeFilesAsync.error.message}</Alert>
            )}
            {addHomeFilesAsync.isSuccess && (
              <Alert severity="success">Files uploaded successfully</Alert>
            )}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
