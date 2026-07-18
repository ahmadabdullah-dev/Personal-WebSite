import { useState } from "react";
import { useNavigate } from "react-router";
import type { PaginationParams } from "../../lib/types/common";
import { useProjects } from "../../lib/hooks/useProjects";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

export default function Projects() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 9,
  });
  const { getProjectsAsync } = useProjects(pagination);
  const navigate = useNavigate();

  if (getProjectsAsync.isLoading) {
    return (
     <div>Loading...</div>
    );
  }

  const result = getProjectsAsync.data;

  if (!result?.value) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          {result?.error}
        </Alert>
      </Container>
    );
  }

  const list = result.value;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Projects
      </Typography>

      {list.items.length === 0 ? (
        <Alert severity="info" variant="outlined">
          No projects found.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {list.items.map((p) => {
            const techStack = p.techStack
              ? p.techStack.split(",").map((t: string) => t.trim())
              : [];

            return (
              <Grid key={p.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ textTransform: "uppercase", mb: 1 }}
                    >
                      {p.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {p.shortDescription}
                    </Typography>

                    {techStack.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: "wrap", gap: 1 }}
                      >
                        {techStack.map((tech: string) => (
                          <Chip
                            key={tech}
                            label={tech}
                            variant="outlined"
                            size="small"
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
                  </CardContent>

                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate(`/projects/${p.slug}`)}
                    >
                      More Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Pagination
          count={list.totalPages}
          page={list.currentPage}
          onChange={(_, page) => setPagination((p) => ({ ...p, page }))}
          shape="rounded"
          color="primary"
        />
      </Box>
    </Container>
  );
}
