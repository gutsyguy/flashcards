"use client";

import { useUser } from "@clerk/nextjs";
// import {database} from ""
import { db } from "../../firebase";
import { collection, getDoc, doc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
// import Flashcards from "../../components/Flashcards";
import Flashcards from "../../components/Flashcards";

const Generate = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flippedFlashcards, setFlippedFlashcards] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-up')
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("Failed to generate flashcards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (id) => {
    setFlippedFlashcards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a collection name");
      return;
    }

    if (!user || !user.id) {
      console.error("User ID is not available");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard with the same name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      if (!flashcard.id) {
        console.error("Flashcard is missing an ID");
        return;
      }
      const cardDocRef = doc(colRef, flashcard.id);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  if (!isLoaded) {
    return <></>
  }

  if (!isSignedIn) {
    return <></>
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Generate Flashcards</Typography>
        <Paper sx={{ p: 4, width: "100%" }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Flashcards Preview</Typography>
          <Flashcards flashcards={flashcards} />
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcards collection
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Generate;
