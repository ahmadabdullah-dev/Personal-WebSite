import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";


const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ahmadabdullah-dev", icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/ahmadabdullah-dev", icon: GithubIcon },
];

export default function Footer() {
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
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                disableRipple
                size="small"
                sx={{
                  color: "text.secondary",
                  borderRadius: 0,
                  "&:hover": { color: "text.primary" },
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
