'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '../../firebase'
import { useRouter } from 'next/navigation'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { Container } from '@mui/system'
import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'

const Flashcards = () => {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        const GetFlashcards = async () => {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)

            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collection = docSnap.data().flashcards || []
                setFlashcards(collection)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        GetFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography variant="h6">
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Flashcards
