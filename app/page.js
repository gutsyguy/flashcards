"use client";
import Image from "next/image";
// import getStripe from "@/utils/get-stripe";
import getStripe from "../utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";
import Link from "next/link";

export default function Home() {
  const HandleSubmit = async () => {
    try {
      const checkoutSection = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Some message" }),
      });

      if (!checkoutSection.ok) {
        const error = await checkoutSection.json();
        console.error("Error creating checkout session:", error.message);
        return;
      }

      const checkoutSectionJson = await checkoutSection.json();

      if (!checkoutSectionJson.id) {
        console.error("Session ID is null or undefined.");
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSectionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("HandleSubmit encountered an error:", error);
    }
  };

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard Saas</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <Box
        sx={{
          textAlign: "center",
          my: 4,
        }}
      >
        <Typography variant="h2" fontSize={64} fontWeight={400} gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" gutterBottom>
          {"  "} The easiest way to make flashcards from text
        </Typography>
        <Link href="/generate">
          <Button size="large" variant="contained" color="primary">
            Get Started
          </Button>
        </Link>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" components="h2" gutterBottom>
          Features
        </Typography>

        <Grid container spacing={12}>
          <Grid item xs={4} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy Input
            </Typography>
            <Typography variant="h6">
              {" "}
              Simply input your text and let out software do the rest{" "}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="h6" gutterBottom>
              Smart Flashcards
            </Typography>
            <Typography variant="h6">
              {" "}
              Our AI breaks down your text into concise flashcards for studying{" "}
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="h6" gutterBottom>
              Accessible Anywhere
            </Typography>
            <Typography variant="h6">
              Access your flashcards anywhere
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
