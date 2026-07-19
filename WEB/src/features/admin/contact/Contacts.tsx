import { useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useContact } from "../../../lib/hooks/useContact";
import type { PaginationParams } from "../../../lib/types/common";

export default function Contacts() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 9,
  });
  const { getContactsAsync } = useContact(pagination);

  if (getContactsAsync.isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 8, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (getContactsAsync.isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
        {getContactsAsync.error.message}
       </Alert>
      </Container>
    );
  }

  const result = getContactsAsync.data;

  if (!result?.value) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          {result?.error ?? "Unable to load messages."}
        </Alert>
      </Container>
    );
  }

  const list = result.value;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Messages
      </Typography>

      {list.items.length === 0 ? (
        <Alert severity="info" variant="outlined">
          No messages found.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {list.items.map((c) => (
            <Grid
              key={`${c.email}-${c.sentAt}`}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ textTransform: "uppercase", mb: 1 }}
                  >
                    {c.fullName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {c.email}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {c.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(c.sentAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {list.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={list.totalPages}
            page={list.currentPage}
            onChange={(_, page) => setPagination((p) => ({ ...p, page }))}
            shape="rounded"
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
