import { useHome } from "../../lib/hooks/useHome";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Home() {
  const { readHomeAsync } = useHome();
  const home = readHomeAsync.data?.value;

  if (readHomeAsync.isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        minHeight: "80vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, sm: 6, md: 10 },
        py: { xs: 6, md: 0 },
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 8 },
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 1100,
          width: "100%",
        }}
      >
        <Avatar
          src="/Ahmad_Abdullah.jpeg"
          alt={home?.fullName ?? "Profile photo"}
          sx={{
            width: { xs: 240, sm: 280, md: 340 },
            height: { xs: 240, sm: 280, md: 340 },
            flexShrink: 0,
            boxShadow: 3,
            border: "4px solid",
            borderColor: "primary.main",
          }}
        />

        <Stack
          sx={{
            gap: 2,
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "700",
                fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
              }}
            >
              {home?.fullName}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 0.5 }}>
              {home?.title}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 520, lineHeight: 1.7 }}
          >
            {home?.bio}
          </Typography>

          <Stack
            sx={{
              flexDirection: "row",
              gap: 1,
            }}
          >
            {home?.githubLink && (
              <IconButton
                component="a"
                href={home.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { borderColor: "text.primary" },
                }}
              >
                <GitHubIcon />
              </IconButton>
            )}
            {home?.linkedInLink && (
              <IconButton
                component="a"
                href={home.linkedInLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { borderColor: "text.primary" },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            )}
            {home?.email && (
              <IconButton
                component="a"
                href={`mailto:${home.email}`}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { borderColor: "text.primary" },
                }}
              >
                <EmailIcon />
              </IconButton>
            )}
           
          </Stack> 
          <Button
              href="/Test_CV.pdf"
              variant="outlined"
            >
              Download CV
            </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
