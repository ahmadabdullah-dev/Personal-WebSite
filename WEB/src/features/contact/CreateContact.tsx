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
import { useContact } from "../../lib/hooks/useContact";
import type { CreateContactDTO } from "../../lib/types/contact";

export default function CreateContact() {
  const { createContactAsync } = useContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactDTO>({
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (creds: CreateContactDTO) => {
    createContactAsync.mutate(creds);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Contact
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                fullWidth
                {...register("fullName", {
                  required: "Full name is required",
                })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                disabled={createContactAsync.isPending}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={createContactAsync.isPending}
              />

              <TextField
                label="Message"
                fullWidth
                multiline
                minRows={5}
                {...register("message", {
                  required: "Message is required",
                })}
                error={!!errors.message}
                helperText={errors.message?.message}
                disabled={createContactAsync.isPending}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={createContactAsync.isPending}
              >
                {createContactAsync.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send Message"
                )}
              </Button>

              {createContactAsync.error && (
                <Alert severity="error">
                  {createContactAsync.error.message}
                </Alert>
              )}

              {createContactAsync.isSuccess && (
                <Alert severity="success">
                  {createContactAsync.data?.value}
                </Alert>
              )}
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
