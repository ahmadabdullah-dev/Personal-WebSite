import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { useAbout } from "../../../lib/hooks/useAbout";
import type { AboutDTO } from "../../../lib/types/about";

export default function UpdateAbout() {
  const {  updateAboutAsync,  readAboutAsync } = useAbout();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<AboutDTO>();

  useEffect(() => {
    if (readAboutAsync.data?.value) {
      reset(readAboutAsync.data.value);
    }
  }, [readAboutAsync.data]);

  const onSubmit = (creds: AboutDTO) => {
    updateAboutAsync.mutate(creds, {
      onSuccess: () => {
        reset(creds);
      },
    });
  };

  if (readAboutAsync.isLoading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Update Home
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              
             
              <TextField
                label="Bio"
                fullWidth
                multiline
                minRows={5}
                {...register("description")}
                disabled={updateAboutAsync.isPending}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={updateAboutAsync.isPending}
              >
                {updateAboutAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update About"
                )}
              </Button>
              {updateAboutAsync.error && (
                <Alert severity="error">{updateAboutAsync.error.message}</Alert>
              )}
              {updateAboutAsync.isSuccess && (
                <Alert severity="success">{updateAboutAsync.data?.value}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
