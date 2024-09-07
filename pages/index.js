import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import JumboBody from '../components/JumboBody';

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in status
  const [isSignedUp, setIsSignedUp] = useState(false); // Track sign-up status
  const [error, setError] = useState(null); // Track error status

  // Check if user is already signed in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  // Handle user sign-up
  const handleSignUp = async () => {
    try {
      // Here you would handle sign-up logic
      // On successful sign-up:
      setIsSignedUp(true);
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle user sign-in
  const handleSignIn = async () => {
    try {
      // Here you would handle sign-in logic
      // On successful sign-in:
      setIsSignedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  // Add a button to trigger the sign-up process
  const SignUpButton = () => (
    <button onClick={handleSignUp}>Sign Up</button>
  );

  // Add a button to trigger the sign-in process
  const SignInButton = () => (
    <button onClick={handleSignIn}>Sign In</button>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Display Welcome Back message if signed in, Join Community message if not signed up, or Sign In message if not signed in */}
        <JumboBody scenario={isSignedIn ? 'welcomeBack' : isSignedUp ? 'joinCommunity' : 'signUp'} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {/* {!isSignedUp && <SignUpButton />} */}
        {/* {!isSignedIn && <SignInButton />} */}
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <MainContent />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;