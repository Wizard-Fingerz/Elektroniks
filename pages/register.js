import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, TextField, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
// import logo from '../assets/logo.png';
import Image from 'next/image';
import Header from '../components/Header';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../utils/constants';
import JumboBody from '../components/JumboBody';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    let isValid = true;
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!phone_number) {
      setPhoneNumberError('Phone number is required');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    if (!isValid) return;

    const regData = { 
      username, 
      email, 
      phone_number, 
      password 
    };

    try {
      const response = await fetch(`${API_BASE_URL}/customer/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        console.error('Register failed');
        alert('Incorrect Register details.');
      }
    } catch (error) {
      alert('Registration Error, please try again.');
      console.error('Network error:', error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <JumboBody scenario={'signUp'} />
    

    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        
        <form onSubmit={handleSubmit} style={{ width: '100%', mt: 1 }}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone_number"
            label="Phone Number"
            name="phone_number"
            type="tel"
            autoComplete="tel"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={!!phoneNumberError}
            helperText={phoneNumberError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, mb: 2, bgcolor: '#1a1a40', color: 'white'  }}
          >
            Agree & Join
          </Button>
        </form>

        <Typography variant="body2" align="center" color="textSecondary">
          or
        </Typography>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          size="large"
          sx={{ mt: 2, mb: 2,bgcolor: '#1a1a40', color: 'white' }}
          
        >
          Continue with Google
        </Button>
        <Box mt={2}>
          <Typography variant="body2" align="center">
            Already on Elektroniks?{' '}
            <Link href="/login" variant="body2">
              Sign in
            </Link>
          </Typography>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Looking to create a page for a business?{' '}
            <Link href="#" variant="body2">
              Get help
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
    
    <Footer />
    </Box>
  );
};

export default RegisterForm;
