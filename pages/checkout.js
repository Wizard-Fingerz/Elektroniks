import React, { useState } from 'react';
import { Grid, Container, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import CartTable from '../components/CartTable';
import OrderSummary from '../components/OrderSummary';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_BASE_URL } from '@/utils/constants';
import JumboBody from '../components/JumboBody';

const CheckoutPage = () => {
    const [shippingAddress, setShippingAddress] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const [billingAddress, setBillingAddress] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });
    const router = useRouter();
    const cartItems = router.query.cartItems ? JSON.parse(router.query.cartItems) : [];
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
  

    const [paymentMethod, setPaymentMethod] = useState('');

    const handleShippingAddressChange = (event) => {
        const { name, value } = event.target;
        setShippingAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const checkoutInfo = {
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          order_items: cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
          total: total,
        };
      
        const token = localStorage.getItem('token');
        fetch(`${API_BASE_URL}/checkout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(checkoutInfo),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Checkout successful:', data);
            const paymentLink = data.payment_link;
            window.open(paymentLink, '_blank'); // Open the payment link in a new tab
            // Redirect to a success page or display a success message
          })
          .catch((error) => {
            console.error('Checkout failed:', error);
            // Display an error message to the user
          });
      };

    return (
        <>
        <Header />
        <JumboBody scenario="checkout" />

        <Grid container spacing={2} sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            
            <Container maxWidth="lg" sx={{ py: 4 }}>

                <CartTable cartItems={cartItems} />
                {/* <OrderSummary cartItems={cartItems} /> */}
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Shipping Address
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Street Address"
                                name="streetAddress"
                                value={shippingAddress.streetAddress}
                                onChange={handleShippingAddressChange}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="City"
                                name="city"
                                value={shippingAddress.city}
                                onChange={handleShippingAddressChange}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="State"
                                name="state"
                                value={shippingAddress.state}
                                onChange={handleShippingAddressChange}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Zip Code"
                                name="zipCode"
                                value={shippingAddress.zipCode}
                                onChange={handleShippingAddressChange}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Country"
                                name="country"
                                value={shippingAddress.country}
                                onChange={handleShippingAddressChange}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
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
                
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Payment Method
                    </Typography>
                    <Select
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        sx={{ width: '100%' }}
                    >
                        <MenuItem value="flutterwave">Flutterwave</MenuItem>
                        <MenuItem value="paypal">PayPal</MenuItem>
                        <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                    </Select>
                </Grid>
                
                <Grid item xs={12} mt={5}>
    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ width: '100%' }}>
        Place Order
    </Button>
</Grid>
            </Container>
            

        </Grid>
        <Footer/>
        </>
    );
};

export default CheckoutPage;