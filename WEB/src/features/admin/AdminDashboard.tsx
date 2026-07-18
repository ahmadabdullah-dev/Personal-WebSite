import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => navigate("create-project")}
        sx={{ maxWidth: { xs: "100%", sm: 220 } }}
      >
        New Project
      </Button>
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={() => navigate("delete-project")}
        sx={{ maxWidth: { xs: "100%", sm: 220 } }}
      >
        Delete Project
      </Button>
    </Box>
  );
}
