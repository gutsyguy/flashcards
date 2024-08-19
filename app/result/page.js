'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Typography, Box } from '@mui/material';

const ResultPage = () => {
  const searchParams = useSearchParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session_id = searchParams.get('session_id');
      if (!session_id) {
        setError("No session ID provided.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/checkout-session?session_id=${session_id}`);
        if (!res.ok) {
          throw new Error("Failed to retrieve session.");
        }
        const sessionData = await res.json();
        setSession(sessionData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [searchParams]);

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h5" color="error">Error: {error}</Typography>;
  }

  if (!session) {
    return <Typography variant="h5" color="error">Session not found.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {session.payment_status === "paid" ? (
        <>
          <Typography variant="h4">Thank you for purchasing!</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>Your payment was successful.</Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">Payment not completed.</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>Your payment status is: {session.payment_status}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ResultPage;
