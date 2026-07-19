import { useForm } from "react-hook-form";
import { useProjects } from "../../../lib/hooks/useProjects";
import type { CreateProjectDTO } from "../../../lib/types/projects";
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

export default function CreateProject() {
  const { createProjectAsync } = useProjects();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectDTO>();



  const onSubmit = (creds: CreateProjectDTO) => {
    createProjectAsync.mutate(creds);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Create Project
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Slug"
                fullWidth
                {...register("slug", { required: "Slug is required" })}
                error={!!errors.slug}
                helperText={errors.slug?.message}
                disabled={createProjectAsync.isPending}
              />
              <TextField
                label="Name"
                fullWidth
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={createProjectAsync.isPending}
              />
              <TextField
                label="Short Description"
                fullWidth
                multiline
                minRows={2}
                {...register("shortDescription")}
                disabled={createProjectAsync.isPending}
              />
              <TextField
                label="Long Description"
                fullWidth
                multiline
                minRows={5}
                {...register("longDescription")}
                disabled={createProjectAsync.isPending}
              />
              <TextField
                label="Tech Stack"
                fullWidth
                placeholder="React, .NET, PostgreSQL"
                {...register("techStack")}
                disabled={createProjectAsync.isPending}
              />
              <TextField
                label="GitHub Link"
                fullWidth
                {...register("githubLink")}
                disabled={createProjectAsync.isPending}
              />
              <TextField
                label="Live Link"
                fullWidth
                {...register("liveLink")}
                disabled={createProjectAsync.isPending}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={createProjectAsync.isPending}
              >
                {createProjectAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Project"
                )}
              </Button>
              {createProjectAsync.error && (
                <Alert severity="error">
                  {createProjectAsync.error.message}
                </Alert>
              )}
              {createProjectAsync.isSuccess && (
                <Alert severity="success">
                  {createProjectAsync.data?.value}
                </Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
