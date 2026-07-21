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
import { useHome } from "../../../lib/hooks/useHome";
import type { UpdateHomeDTO } from "../../../lib/types/home";

export default function UpdateHome() {
  const { updateHomeAsync, readHomeAsync } = useHome();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateHomeDTO>();

  useEffect(() => {
    if (readHomeAsync.data?.value) {
      const home = readHomeAsync.data.value;
      (Object.keys(home) as (keyof UpdateHomeDTO)[]).forEach((key) => {
        setValue(key, home[key]);
      });
    }
  }, [readHomeAsync.data, setValue]);

  const onSubmit = (creds: UpdateHomeDTO) => {
    updateHomeAsync.mutate(creds);
  };

  if (readHomeAsync.isLoading) {
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
                label="FullName"
                fullWidth
                {...register("fullName")}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                disabled={updateHomeAsync.isPending}
              />
              <TextField
                label="Title"
                fullWidth
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                disabled={updateHomeAsync.isPending}
              />
              <TextField
                label="Bio"
                fullWidth
                multiline
                minRows={5}
                {...register("bio")}
                disabled={updateHomeAsync.isPending}
              />
              <TextField
                label="Email"
                fullWidth
                {...register("email")}
                disabled={updateHomeAsync.isPending}
              />
              <TextField
                label="Github Link"
                fullWidth
                {...register("githubLink")}
                disabled={updateHomeAsync.isPending}
              />
              <TextField
                label="LinkedIn Link"
                fullWidth
                {...register("linkedInLink")}
                disabled={updateHomeAsync.isPending}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={updateHomeAsync.isPending}
              >
                {updateHomeAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update Home"
                )}
              </Button>
              {updateHomeAsync.error && (
                <Alert severity="error">{updateHomeAsync.error.message}</Alert>
              )}
              {updateHomeAsync.isSuccess && (
                <Alert severity="success">{updateHomeAsync.data?.value}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
