import { SignIn } from '@clerk/nextjs'
import { AppBar, Container, Toolbar,Button, Typography,Box } from '@mui/material'
import React from 'react'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <Container maxWidth="100vw">
        <AppBar position = "static" sx = {{backgroundColor: "#3f51b5"}}>
            <Toolbar>
                <Typography variant = "h6" sx = {{flexGrow: 1}}>Flashcard Saas</Typography>
                <Button color = "inherit">
                    <Link href="/sign-in" passHref>Login</Link>
                </Button>
                <Button color = "inherit">
                    <Link href="/sign-up" passHref>Sign Up</Link>
                </Button>
            </Toolbar>
        </AppBar>


        <Box
            display = "flex"
            flexDirection = "column"
            alignItems = "center"
            justifyContent = "center"
            >
                <Typography variant = "h4">Sign In</Typography>
                <SignIn/>
        </Box>
    </Container>
  )
}

export default SignUpPage 