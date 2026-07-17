import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      
        <Button variant="contained" onClick={() => navigate("create-project")}>
          New Project
        </Button>
      

    </Box>
  );
}
