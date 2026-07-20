import { useAbout } from "../../lib/hooks/useAbout";
import { CircularProgress, Alert, Box, Typography, Stack } from "@mui/material";
import Skills from "./skills/Skills";

export default function About() {
  const { readAboutAsync } = useAbout();
  const about = readAboutAsync.data?.value;

  if (readAboutAsync.isLoading) {
    return (
      <Box sx={{display:"flex", justifyContent:"center"}}>
        <CircularProgress />
      </Box>
    );
  }

  if (readAboutAsync.isError) {
    return (
      <Alert severity="error">Something went wrong loading this page.</Alert>
    );
  }

  return (
    <Stack
      component="section"
      spacing={4}
      sx={{ maxWidth: 720, mx: "auto", py: 3 }}
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          About
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ whiteSpace: "pre-line", overflowWrap: "break-word" }}
        >
          {about?.description || "No description available."}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Skills />
      </Box>
    </Stack>
  );
}
