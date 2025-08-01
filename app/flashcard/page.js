"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import Flashcard from "../../components/Flashcards";
// import Flashcards from "../../components/Flashcards";
import Flashcards from "../../components/Flashcards";
import { db } from "../../firebase";
import { useSearchParams } from "next/navigation";

import {
  Container,
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Grid,
} from "@mui/material";

const FlashcardPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flippedFlashcards, setFlippedFlashcards] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    const GetFlashcard = async () => {
      if (!search || !user) return;
      const docRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(docRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    };
    GetFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlippedFlashcards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }
  return (
    <Container maxWidth="100vw">
      <Flashcards flashcards={flashcards} />
    </Container>
  );
};

export default FlashcardPage;
