import { SignOut } from "@clerk/nextjs";
import {
  Container,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

const SignOutPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 3,
        }}
      >
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Are you sure you want to sign out?
        </Typography>
        <SignOut />
      </Box>
    </Container>
  );
};

export default SignOutPage;
