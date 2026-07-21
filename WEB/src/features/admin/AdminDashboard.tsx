import { Button, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import LogoutButton from "./auth/LogoutButton";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 2 }}>
        <LogoutButton />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("create-project")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          New Project
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("delete-project")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Delete Project
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("update-project")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Update Project
        </Button>

        <Divider sx={{ width: "100%", my: 1 }} />

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("create-home")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Create Home
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("update-home")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Update Home
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("delete-home")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Delete Home
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("add-home-files")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Add Home Files
        </Button>

        <Divider sx={{ width: "100%", my: 1 }} />

        <Button
          variant="contained"
          onClick={() => navigate("contacts")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Contacts
        </Button>

        <Divider sx={{ width: "100%", my: 1 }} />

        <Button
          variant="contained"
          onClick={() => navigate("create-skill")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Create Skill
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("delete-skill")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Delete Skill
        </Button>

        <Divider sx={{ width: "100%", my: 1 }} />

        <Button
          variant="contained"
          onClick={() => navigate("create-about")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Create About
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("update-about")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Update About
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("delete-about")}
          sx={{ flex: { xs: "1 1 100%", sm: "0 1 200px" } }}
        >
          Delete About
        </Button>
      </Box>
    </Box>
  );
}
