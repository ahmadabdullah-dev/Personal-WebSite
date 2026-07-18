import { useForm } from "react-hook-form";
import { useProjects } from "../../../lib/hooks/useProjects";
import type { DeleteProjectDTO } from "../../../lib/types/projects";
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

export default function DeleteProject() {
  const { deleteProjectBySlugAsync } = useProjects();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeleteProjectDTO>({
    defaultValues: {
      slug: "",
    },
  });

  const onSubmit = (creds: DeleteProjectDTO) => {
    deleteProjectBySlugAsync.mutate(creds, {
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
            Delete Project
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Slug"
                fullWidth
                {...register("slug", { required: "Slug is required" })}
                error={!!errors.slug}
                helperText={errors.slug?.message}
                disabled={deleteProjectBySlugAsync.isPending}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={deleteProjectBySlugAsync.isPending}
              >
                {deleteProjectBySlugAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Delete Project"
                )}
              </Button>
              {deleteProjectBySlugAsync.error && (
                <Alert severity="error">
                  {deleteProjectBySlugAsync.error.message}
                </Alert>
              )}
              {deleteProjectBySlugAsync.isSuccess && (
                <Alert severity="success">
                  {deleteProjectBySlugAsync.data?.value}
                </Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
