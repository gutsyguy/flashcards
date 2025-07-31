import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function Flashcards({ flashcards }) {
  const [flippedFlashcards, setFlippedFlashcards] = useState([]);

  const handleCardClick = (id) => {
    setFlippedFlashcards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle case when flashcards is undefined or not an array
  if (!flashcards || !Array.isArray(flashcards)) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No flashcards found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {flashcards.map((flashcard, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          {/* <Flashcard flashcard={flashcard} index={index} flippedFlashcards={flippedFlashcards} setFlippedFlashcards = {setFlippedFlashcards}/> */}
          <Card>
            <CardActionArea onClick={() => handleCardClick(index)}>
              <CardContent>
                <Box
                  sx={{
                    perspective: "1000px",
                    "& > div": {
                      transition: "transform 0.6s",
                      transformStyle: "preserve-3d",
                      position: "relative",
                      width: "100%",
                      height: "200px",
                      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                      transform: flippedFlashcards[index]
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    },
                    "& > div > div": {
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 2,
                      boxSizing: "border-box",
                    },
                    "& > div > div:nth-of-type(2)": {
                      transform: "rotateY(180deg)",
                    },
                  }}
                >
                  <div>
                    <div>
                      <Typography variant="h5" component="div">
                        {flashcard.front}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        style={{ fontSize: "12px" }}
                        variant="h5"
                        component="div"
                      >
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
  );
}

export default Flashcards;
