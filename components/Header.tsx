import { SignedIn, SignedOut } from "@clerk/nextjs";
// import Link from "next/link";
import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" component="div">
            Flashify
          </Typography>
        </Link>

        <div style={{ display: "flex", gap: "8px" }}>
          <SignedOut>
            <Link href="/sign-in">
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button color="inherit">Sign Up</Button>
            </Link>

            <Link
              href="/sign-in"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button color="inherit">Login</Button>
            </Link>
            <Link
              href="/sign-up"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button color="inherit">Sign up</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/generate"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button color="inherit">Generate</Button>
            </Link>
            <Link
              href="/flashcards"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button color="inherit">View</Button>
            </Link>
          </SignedIn>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
