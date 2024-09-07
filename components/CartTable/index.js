import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { API_BASE_URL } from '@/utils/constants';

const CartTable = ({ cartItems }) => {


  const handleRemoveItem = async (item) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/cart-items/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        console.log(`Item ${item.title} removed from cart`);
        // You may want to update the cart items state here
      } else {
        console.error(`Error removing item ${item.title} from cart`);
      }
    } catch (error) {
      console.error(`Error removing item ${item.title} from cart:`, error);
    }
  };


  return (
    <Table sx={{ minWidth: 700 }} aria-label="cart table">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }} align="center">Quantity</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }} align="right">Price</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }} align="right">Subtotal</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }} align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(cartItems) && cartItems.map((item, index) => (
          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{item.product.title}</TableCell>
            <TableCell align="center">{item.quantity}</TableCell>
            <TableCell align="right">NGN {item.price}</TableCell>
            <TableCell align="right">NGN {item.quantity * item.price}</TableCell>
            <TableCell align="center">
              <button
                onClick={() => handleRemoveItem(item)}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Remove
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CartTable;