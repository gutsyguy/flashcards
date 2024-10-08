'use client'

import { useUser } from '@clerk/nextjs';
// import {database} from ""
import {db} from  '../../firebase'
import { collection, getDoc, doc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    Container, Box, Typography, TextField, Paper, Button, Card, CardActionArea,
    CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';


const Generate = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flippedFlashcards, setFlippedFlashcards] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))
        .catch((error) => console.error("Error generating flashcards:", error));
    };

    const handleCardClick = (id) => {
        setFlippedFlashcards((prev) => ({
            ...prev,
            [id]: !prev[id]
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
        const userDocRef = doc(collection(db, 'users'), user.id);
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
        router.push('/flashcards');
    };
    

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant='h4'>Generate Flashcards</Typography>
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
                    <Button variant="contained" color='primary' onClick={handleSubmit} fullWidth>Submit</Button>
                </Paper>
            </Box>

            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant='h5'>
                        Flashcards Preview
                    </Typography>
                    <Grid container spacing={3}>

                    {flashcards.map((flashcard, index) => (
    <Grid item key={flashcard.id || index} xs={12} sm={6} md={4}>
        <Card>
            <CardActionArea onClick={() => handleCardClick(flashcard.id || index)}>
                <CardContent>
                    <Box sx={{
                        perspective: "1000px",
                        '& > div': {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "200px",
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                            transform: flippedFlashcards[flashcard.id || index] ? "rotateY(180deg)" : "rotateY(0deg)"
                        },
                        '& > div > div': {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box"
                        },
                        '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)'
                        }
                    }}>
                        <div>
                            <div>
                                <Typography variant="h5" component="div">
                                    {flashcard.front}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h5" component="div">
                                    {flashcard.back}
                                </Typography>
                            </div>
                        </div>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
))}

                    </Grid>
                    <Box sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "center",
                    }}>
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
                        type='text'
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant='outlined'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Generate;
