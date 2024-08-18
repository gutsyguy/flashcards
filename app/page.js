import Image from "next/image";
// import getStripe from "@/utils/get-stripe";
import getStripe from "../utils/get-stripe";
import { SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import Head from "next/head";
import { AppBar, Button, Toolbar, Typography, Container, Box, Grid } from "@mui/material";
import Link from "next/link";


export default function Home() {
  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard Saas</title>
        <meta name = "description" content="Create flashcards from your text"/>

      </Head>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>Flashcard Saas</Typography>
            <SignedOut>
              <Link href='/sign-in'>
                <Button color={"inherit"}>Login</Button>
              </Link>
              <Link href='/sign-up'>
                <Button color="inherit">Sign Up</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Button> User</Button>
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box sx={{
          textAlign: "center", 
          my: 4
        }}>
          <Typography variant="h2" gutterBottom>Welcome to flashcard SAAS</Typography>
          <Typography variant="h5" gutterBottom>{'  '} "The easiest way to make flashcards from text</Typography>
          <Button variant="contained" color="primary" sx={{mt: 2}}>get started</Button>
        </Box>

        <Box sx = {{my: 6}}>
          <Typography variant="h4" components= "h2" gutterBottom>
            Features
          </Typography>

          <Grid container spacing = {12}>
            <Grid item xs ={4} md={4}>
            <Typography variant="h6" gutterBottom>Easy Input</Typography> 
              <Typography variant= "h6"> {" "} Simply input your text and let out software do the rest  </Typography>  
            </Grid>
            <Grid item xs ={4} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography> 
              <Typography variant= "h6"> Our AI breaks down your text into concise flashcards for studying  </Typography>  
            </Grid>
            <Grid item xs ={4} md={4}>
              <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography> 
              <Typography variant= "h6">Access your flashcards anywhere</Typography>  
            </Grid>
          </Grid>
        </Box>
        <Box  textAlign={"center"}>
          <Typography variant="h4" gutterBottom>Pricing</Typography> 

          <Grid container spacing = {12}>
            <Grid item xs ={4} md={4}>
              <Box sx={{
                p:3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2
              }}>

              <Typography variant="h5" gutterBottom>Basic</Typography> 
              <Typography variant="h6" gutterBottom>$4.99 / month</Typography> 
              <Typography variant="h5" gutterBottom> {" "} Access to basic flashcard features and limited storage   </Typography>  
              <Button variant="contained" color = "primary" >Choose Basic</Button>
              </Box>

            </Grid>
            <Grid item xs ={4} md={4}>
              <Box sx={{
                p:3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2
              }}>

              <Typography variant="h5" gutterBottom>Basic</Typography> 
              <Typography variant="h6" gutterBottom>$9.99 / month</Typography> 
              <Typography variant="h5" gutterBottom> {" "} Unlimited flashcards and storage, with priority support   </Typography>  
              <Button variant="contained" color = "primary" >Choose Pro</Button>
              </Box>

            </Grid> 

            <Grid item xs ={4} md={4}>
              <Box sx={{
                p:3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2
              }}>

              <Typography variant="h5" gutterBottom>Basic</Typography> 
              <Typography variant="h6" gutterBottom>$4.99 / month</Typography> 
              <Typography variant="h5" gutterBottom> {" "} Access to basic flashcard features and limited storage   </Typography>  
              <Button variant="contained" color = "primary" >Choose basic</Button>
              </Box>

            </Grid>
            
          </Grid>
        </Box>

    </Container>
  );
}
