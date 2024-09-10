import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const JumboBody = ({ scenario }) => {
  const router = useRouter();

  const getMessage = (scenario) => {
    switch (scenario) {
      case 'welcomeBack':
        return {
          heading: 'You’re Back! What’s New?',
          body: 'We’ve got some exciting new arrivals, exclusive deals, and fresh content waiting for you. Take a look around and see what catches your eye!'
        };
      case 'joinCommunity':
        return {
          heading: 'Join Our Thriving Community!',
          body: 'Create an account today to unlock a world of benefits. Enjoy personalized shopping experiences, get the latest updates on products, and be the first to know about our special deals. Register now and start your journey with us!'
        };
      case 'exclusiveOffers':
        return {
          heading: 'Exclusive Offers Just for You!',
          body: 'Log in or register to unlock exclusive deals, discounts, and early access to our newest products. Don’t miss out on the best offers—sign up now and be part of the excitement!'
        };
      case 'personalizedExperience':
        return {
          heading: 'Experience Shopping Like Never Before!',
          body: 'By logging in or creating an account, you’ll get tailored recommendations, a seamless checkout experience, and special promotions just for you. Sign in or register to make the most of your shopping experience!'
        };
      case 'stayConnected':
        return {
          heading: 'Stay Connected with Us!',
          body: 'Create an account to receive the latest updates, news, and personalized offers directly to your inbox. Stay in the loop and never miss out on our amazing deals. Register now and connect with us!'
        };
      case 'secureAccess':
        return {
          heading: 'Secure and Easy Access to Your Account',
          body: 'Log in securely to access your account, manage your orders, and view your personalized recommendations. It’s quick and easy—just enter your credentials below to get started.'
        };
      case 'getStarted':
        return {
          heading: 'Get Started with Us Today!',
          body: 'Creating an account is simple and fast. Sign up now to enjoy personalized shopping, exclusive offers, and a streamlined checkout experience. Join us today and make your shopping easier and more enjoyable!'
        };
      case 'startShopping':
        return {
          heading: 'Here is your Shopping Cart!',
          body: 'Save the products you love in your cart and get ready to experience the best online shopping experience. Browse our collection, add items to your cart, and discover amazing products at unbeatable prices.'
        };
      case 'checkout':
        return {
          heading: 'Checkout',
          body: 'Review your order and complete your purchase. Make sure to check your order summary and payment details before submitting your order.'
        };

      case 'signUp':
        return {
          heading: 'Create Your Account',
          body: 'Sign up to access exclusive deals, track your orders, and more. Enter your email, password, and other details to get started.'
        };

      default:
        return {
          heading: '',
          body: ''
        };
    }
  };

  const { heading, body } = getMessage(scenario);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  const handleButtonClick = (action) => {
    if (action === 'login') {
      router.push('/login');
    } else if (action === 'register') {
      router.push('/register');
    }
  };

  return (
    <Box sx={{ p: 10, mt: 7, textAlign: 'center', backgroundColor: '#f4f4f4' }}>
      {heading && (
        <Typography variant="h3" gutterBottom>
          {heading}
        </Typography>
      )}
      {body && (
        <Typography variant="h6" color="text.secondary" paragraph>
          {body}
        </Typography>
      )}

      {!token && (
        <Box sx={{ mt: 2 }}>
          {scenario === 'welcomeBack' || scenario === 'exclusiveOffers' ? (
            <>
              <Button
                variant="contained"
                sx={{ bgcolor: '#1a1a40', my: 2, mr: 2 }}
                onClick={() => handleButtonClick('login')}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: '#1a1a40', my:2 }}
                onClick={() => handleButtonClick('register')}
              >
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ bgcolor: '#1a1a40', mr: 2 }}
                onClick={() => handleButtonClick('register')}
              >
                Register
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: '#1a1a40' }}
                onClick={() => handleButtonClick('login')}
              >
                Learn More
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default JumboBody;