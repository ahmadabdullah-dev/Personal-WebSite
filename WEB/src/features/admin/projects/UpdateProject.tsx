import { useEffect, useState } from "react";
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

export default function UpdateProject() {
  const [slugInput, setSlugInput] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | undefined>(undefined);

  const { updateProjectAsync, getProjectBySlugAsync } = useProjects(undefined, activeSlug);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectDTO>();

  useEffect(() => {
    if (getProjectBySlugAsync.data?.value) {
      reset(getProjectBySlugAsync.data.value);
    }
  }, [getProjectBySlugAsync.data]);

  const handleLoad = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSlug(slugInput.trim());
  };

  const onSubmit = (creds: CreateProjectDTO) => {
    updateProjectAsync.mutate(creds, {
      onSuccess: () => {
        reset(creds);
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Update Project
          </Typography>

          <Box component="form" onSubmit={handleLoad} sx={{ mb: 4 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Project Slug"
                fullWidth
                value={slugInput}
                onChange={(e) => setSlugInput(e.target.value)}
                placeholder="example-project-slug"
              />
              <Button
                type="submit"
                variant="outlined"
                disabled={!slugInput.trim() || getProjectBySlugAsync.isFetching}
                sx={{ whiteSpace: "nowrap" }}
              >
                {getProjectBySlugAsync.isFetching ? (
                  <CircularProgress size={20} />
                ) : (
                  "Load"
                )}
              </Button>
            </Stack>
            {getProjectBySlugAsync.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {getProjectBySlugAsync.error.message}
              </Alert>
            )}
          </Box>

          {getProjectBySlugAsync.data?.value && (
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  label="Slug"
                  fullWidth
                  {...register("slug")}
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                  disabled={updateProjectAsync.isPending}
                />
                <TextField
                  label="Name"
                  fullWidth
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={updateProjectAsync.isPending}
                />
                <TextField
                  label="Short Description"
                  fullWidth
                  multiline
                  minRows={2}
                  {...register("shortDescription")}
                  disabled={updateProjectAsync.isPending}
                />
                <TextField
                  label="Long Description"
                  fullWidth
                  multiline
                  minRows={5}
                  {...register("longDescription")}
                  disabled={updateProjectAsync.isPending}
                />
                <TextField
                  label="Tech Stack"
                  fullWidth
                  placeholder="React, .NET, PostgreSQL"
                  {...register("techStack")}
                  disabled={updateProjectAsync.isPending}
                />
                <TextField
                  label="GitHub Link"
                  fullWidth
                  {...register("githubLink")}
                  disabled={updateProjectAsync.isPending}
                />
                <TextField
                  label="Live Link"
                  fullWidth
                  {...register("liveLink")}
                  disabled={updateProjectAsync.isPending}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={updateProjectAsync.isPending}
                >
                  {updateProjectAsync.isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update Project"
                  )}
                </Button>
                {updateProjectAsync.error && (
                  <Alert severity="error">
                    {updateProjectAsync.error.message}
                  </Alert>
                )}
                {updateProjectAsync.isSuccess && (
                  <Alert severity="success">Project updated.</Alert>
                )}
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
