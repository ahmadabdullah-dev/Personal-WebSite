import { Box, Container, Stack, Typography, IconButton } from "@mui/material";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useHome } from "../lib/hooks/useHome";

export default function Footer() {
  const { readHomeAsync } = useHome();
  const home = readHomeAsync.data?.value;

  return (
    <Box
      component="footer"
      sx={(theme) => ({
        backgroundColor: "background.default",
        borderTop: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 2.5 } }}>
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2.5, md: 0 },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} Abdullah
          </Typography>

          <Stack direction="row" spacing={0.5}>
            
            {home?.githubLink && (
              <IconButton
                component="a"
                href={home.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                disableRipple
                size="small"
                sx={{
                  color: "text.secondary",
                  borderRadius: 0,
                  "&:hover": { color: "text.primary" },
                }}
              >
                <GithubIcon />
              </IconButton>
            )}
            {home?.linkedInLink && (
              <IconButton
                component="a"
                href={home.linkedInLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                disableRipple
                size="small"
                sx={{
                  color: "text.secondary",
                  borderRadius: 0,
                  "&:hover": { color: "text.primary" },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              )}
              {home?.email && (
              <IconButton
                component="a"
                href={`mailto:${home.email}`}
                aria-label="Email"
                disableRipple
                size="small"
                sx={{
                  color: "text.secondary",
                  borderRadius: 0,
                  "&:hover": { color: "text.primary" },
                }}
              >
                <EmailIcon />
              </IconButton>
            )}
            
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
