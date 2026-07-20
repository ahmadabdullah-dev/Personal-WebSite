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
import { useSkills } from "../../../../lib/hooks/useSkills";
import type { SkillDTO } from "../../../../lib/types/skills";

export default function CreateHome() {
  const {  createSkillAsync } = useSkills();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillDTO>();

  const onSubmit = (creds: SkillDTO) => {
    createSkillAsync.mutate(creds);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Create Skill
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                fullWidth
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={createSkillAsync.isPending}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={createSkillAsync.isPending}
              >
                {createSkillAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create"
                )}
              </Button>
              {createSkillAsync.error && (
                <Alert severity="error">{createSkillAsync.error.message}</Alert>
              )}
              {createSkillAsync.isSuccess && (
                <Alert severity="success">{createSkillAsync.data?.value}</Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
