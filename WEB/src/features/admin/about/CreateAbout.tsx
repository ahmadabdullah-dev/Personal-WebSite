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
import { useAbout } from "../../../lib/hooks/useAbout";
import type { AboutDTO } from "../../../lib/types/about";

export default function CreateAbout() {
  const { addAboutAsync } = useAbout();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AboutDTO>({
    defaultValues: {
        fullName:"", bio:"", title:"", githubLink:"", linkedInLink:""
    },
  });

  const onSubmit = (creds: AboutDTO) => {

    addAboutAsync.mutate(creds, {
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
            Create About
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="FullName"
                fullWidth
                {...register("fullName", { required: "FullName is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                disabled={addAboutAsync.isPending}
              />
              <TextField
                label="Title"
                fullWidth
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                disabled={addAboutAsync.isPending}
              />
              <TextField
                label="Bio"
                fullWidth
                multiline
                minRows={5}
                {...register("bio")}
                disabled={addAboutAsync.isPending}
              />
              <TextField
                label="Github Link"
                fullWidth
                {...register("githubLink")}
                disabled={addAboutAsync.isPending}
              />
              <TextField
                label="LinkedIn Link"
                fullWidth
                {...register("linkedInLink")}
                disabled={addAboutAsync.isPending}
              />
             
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={addAboutAsync.isPending}
              >
                {addAboutAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create About"
                )}
              </Button>
              {addAboutAsync.error && (
                <Alert severity="error">
                  {addAboutAsync.error.message}
                </Alert>
              )}
              {addAboutAsync.isSuccess && (
                <Alert severity="success">
                  {addAboutAsync.data?.value}
                </Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
