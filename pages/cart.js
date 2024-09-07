import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  Divider,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import JumboBody from '../components/JumboBody';
import CartTable from '../components/CartTable';
import OrderSummary from '../components/OrderSummary';
import Footer from '../components/Footer';
import { API_BASE_URL } from '@/utils/constants';
import AddressForm from '../components/AddressForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
  },
});

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState({
    streetAddress: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (id) => {
    setSelectedProduct(cartItems.find((item) => item.id === id));
    setOpenModal(true);
  };

  const handleApplyCoupon = () => {
    // TO DO: implement coupon logic
  };

  const handleCalculateShipping = () => {
    // TO DO: implement shipping logic
  };

  const handleCheckout = () => {
    // TO DO: implement checkout logic
  };

  const handleAddressChange = () => {
    setShowAddressForm(true);
  };

  const handleSaveAddress = (newAddress) => {
    setDefaultAddress(newAddress);
    setShowAddressForm(false);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/cart-items/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <JumboBody scenario="startShopping" />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {cartItems && (
            <>
              <CartTable cartItems={cartItems} />
              <Divider sx={{ mt: 2, mb: 2 }} />
              <OrderSummary cartItems={cartItems} />
            </>
          )}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default CartPage;