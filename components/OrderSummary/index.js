import React from 'react';
import { Typography, Box, Grid, Button } from '@mui/material';
import { useRouter } from 'next/router';

const OrderSummary = ({ cartItems }) => {
  const router = useRouter();
  let subtotal = 0;

  if (Array.isArray(cartItems)) {
    subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }
  
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f7f7f7', borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ marginBottom: 1 }}>Order Summary</Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography>Subtotal:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography>NGN {subtotal.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Tax (8%):</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography>NGN {tax.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="h6">NGN {total.toFixed(2)}</Typography>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2, padding: '10px 20px' }}
        onClick={() => router.push({
          pathname: '/checkout',
          query: { cartItems: JSON.stringify(cartItems) },
        })}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default OrderSummary;