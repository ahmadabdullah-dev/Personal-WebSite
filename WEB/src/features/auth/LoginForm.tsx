import { useAuth } from "../../lib/hooks/useAuth";
import { useForm } from "react-hook-form";
import type { LoginDTO } from "../../lib/types/auth";
import {
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";

type LoginFormProps = {
  email: string;
  isPersistence: boolean;
};

export default function LoginForm({ email, isPersistence }: LoginFormProps) {
  const { loginAsync } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    defaultValues: { email, code: "", isPersistence },
  });

  const onSubmit = (creds: LoginDTO) => {
    loginAsync.mutate(creds);
  };
  const verifyFailed = loginAsync.data != null && !loginAsync.data.isSuccess;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Enter the verification code sent to {email}
        </Typography>

        <TextField
          label="Verification code"
          fullWidth
          {...register("code", {
            required: "Verification code is required",
          })}
          error={!!errors.code}
          helperText={errors.code?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loginAsync.isPending}
        >
          {loginAsync.isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Verify"
          )}
        </Button>

        {verifyFailed && (
          <Alert severity="error">{loginAsync.data?.error}</Alert>
        )}

        {loginAsync.error && (
          <Alert severity="error">
            {loginAsync.error.message}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
