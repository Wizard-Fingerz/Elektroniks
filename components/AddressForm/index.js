import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';

const AddressForm = () => {
  const [address, setAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API or update local storage with new address
    // For demo purposes, just log the address to console
    console.log('New address:', address);
  };

  return (
    <Grid container spacing={2} sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Address Information
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Street Address"
          name="streetAddress"
          value={address.streetAddress}
          onChange={handleInputChange}
          error={errors.streetAddress}
          helperText={errors.streetAddress && 'Invalid street address'}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="City"
          name="city"
          value={address.city}
          onChange={handleInputChange}
          error={errors.city}
          helperText={errors.city && 'Invalid city'}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="State"
          name="state"
          value={address.state}
          onChange={handleInputChange}
          error={errors.state}
          helperText={errors.state && 'Invalid state'}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Zip Code"
          name="zipCode"
          value={address.zipCode}
          onChange={handleInputChange}
          error={errors.zipCode}
          helperText={errors.zipCode && 'Invalid zip code'}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Country"
          name="country"
          value={address.country}
          onChange={handleInputChange}
          error={errors.country}
          helperText={errors.country && 'Invalid country'}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ width: '100%' }}>
          Add/Change Address
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddressForm;