import { SignUp } from "@clerk/nextjs";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <Container maxWidth="100vw">

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <SignUp />
      </Box>
    </Container>
  );
};

export default SignUpPage;
