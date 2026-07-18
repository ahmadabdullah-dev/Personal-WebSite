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
import type { HomeDTO } from "../../../lib/types/home";

export default function CreateHome() {
  const { addHomeAsync } = useHome();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HomeDTO>({
    defaultValues: {
      fullName: "",
      bio: "",
      title: "",
      githubLink: "",
      linkedInLink: "",
    },
  });

  const onSubmit = (creds: HomeDTO) => {
    addHomeAsync.mutate(creds, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Create Home
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="FullName"
                fullWidth
                {...register("fullName", { required: "FullName is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                disabled={addHomeAsync.isPending}
              />
              <TextField
                label="Title"
                fullWidth
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                disabled={addHomeAsync.isPending}
              />
              <TextField
                label="Bio"
                fullWidth
                multiline
                minRows={5}
                {...register("bio")}
                disabled={addHomeAsync.isPending}
              />
              <TextField
                label="Github Link"
                fullWidth
                {...register("githubLink")}
                disabled={addHomeAsync.isPending}
              />
              <TextField
                label="LinkedIn Link"
                fullWidth
                {...register("linkedInLink")}
                disabled={addHomeAsync.isPending}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={addHomeAsync.isPending}
              >
                {addHomeAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Home"
                )}
              </Button>
              {addHomeAsync.error && (
                <Alert severity="error">{addHomeAsync.error.message}</Alert>
              )}
              {addHomeAsync.isSuccess && (
                <Alert severity="success">{addHomeAsync.data?.value}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
