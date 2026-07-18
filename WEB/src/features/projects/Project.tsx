import { useParams } from "react-router";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import { useProjects } from "../../lib/hooks/useProjects";

export default function Project() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="warning" variant="outlined">
          No project specified.
        </Alert>
      </Container>
    );
  }
  const {getProjectBySlugAsync} = useProjects(undefined, slug);
  const { data, isLoading, error } = getProjectBySlugAsync;

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          {error.message}
        </Alert>
      </Container>
    );
  }

  const project = data?.value;

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="info" variant="outlined">
          Project not found.
        </Alert>
      </Container>
    );
  }

  const techStack = project.techStack
    ? project.techStack.split(",").map((t) => t.trim())
    : [];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Box>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2.25rem", sm: "3.5rem" } }}
          >
            {project.name}
          </Typography>
          <Divider sx={{ mt: 3 }} />
        </Box>

        {techStack.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {techStack.map((tech: string) => (
              <Chip
                key={tech}
                label={tech}
                variant="outlined"
                sx={{
                  borderRadius: 0,
                  textTransform: "uppercase",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              />
            ))}
          </Stack>
        )}

        {project.longDescription && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              wordBreak: "break-word",
              lineHeight: 1.8,
              whiteSpace: "pre-line",
            }}
          >
            {project.longDescription}
          </Typography>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ pt: 2 }}
        >
          {project.liveLink && (
            <Button
              variant="contained"
              color="primary"
              endIcon={<LaunchIcon />}
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Site
            </Button>
          )}
          {project.githubLink && (
            <Button
              variant="outlined"
              color="inherit"
              endIcon={<GitHubIcon />}
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              GitHub
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
