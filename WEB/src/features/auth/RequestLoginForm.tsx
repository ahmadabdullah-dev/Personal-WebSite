import { useAuth } from "../../lib/hooks/useAuth";
import { useForm } from "react-hook-form";
import type { RequestLoginDTO } from "../../lib/types/auth";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RequestLoginForm() {
  const { requestLoginAsync } = useAuth();

  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<RequestLoginDTO>({
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPersistence, setIsPersistence] = useState(false);
  const requestFailed = requestLoginAsync.data != null && !requestLoginAsync.data.isSuccess;
  const codeSent = requestLoginAsync.data?.isSuccess === true;

  useEffect(() => {
    if (requestFailed) {
      resetField("password");
    }
  }, [requestFailed, resetField]);

  const onSubmit = (creds: RequestLoginDTO) => {
    requestLoginAsync.mutate(creds);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 4, width: "100%" }}>
          <Typography variant="h3" sx={{ m: 2, textAlign: "center" }}>
            Login
          </Typography>

          {codeSent ? (
            <LoginForm
              email={getValues("email")}
              isPersistence={isPersistence}
            />
          ) : (
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword((v) => !v)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isPersistence}
                      onChange={(e) => setIsPersistence(e.target.checked)}
                    />
                  }
                  label="Remember me"
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={requestLoginAsync.isPending}
                >
                  {requestLoginAsync.isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Send login code"
                  )}
                </Button>

                {requestFailed && (
                  <Alert severity="error">
                    {requestLoginAsync.data?.error}
                  </Alert>
                )}

                {requestLoginAsync.error && (
                  <Alert severity="error">
                    {requestLoginAsync.error.message}
                  </Alert>
                )}
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
