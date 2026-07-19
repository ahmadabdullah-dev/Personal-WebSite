import { useSkills } from "../../lib/hooks/useSkills";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Alert,
  Paper,
} from "@mui/material";

export default function Skills() {
  const { readSkillsAsync } = useSkills();
  const { data, isLoading, isError } = readSkillsAsync;

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {data?.error ?? "Failed to load skills."}
        </Alert>
      </Box>
    );
  }

  const skills = data?.value ?? [];

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>

      {skills.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No skills found.
        </Typography>
      ) : (
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {skills.map((skill) => (
            <Chip
              key={skill.name}
              label={skill.name}
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}
