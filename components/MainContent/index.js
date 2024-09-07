import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Toolbar,
  List, ListItem, ListItemText, ListSubheader, useMediaQuery, useTheme
} from '@mui/material';
import { API_BASE_URL } from '@/utils/constants';

const MainContent = () => {
  const [categories, setCategories] = useState([]);
  const [marketingMessages, setMarketingMessages] = useState({});
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [filteredCategory, setFilteredCategory] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch categories, marketing messages, and products from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/`);
        const data = await response.json();
        // Extract names and descriptions
        const categoryNames = data.map(category => category.name);
        const messages = data.reduce((acc, category) => {
          acc[category.name] = category.description;
          return acc;
        }, {});

        setCategories(categoryNames);
        setMarketingMessages(messages);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();
        console.log(data)
        setProducts(data || []); // Safely set products or an empty array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = filteredCategory
    ? products.filter((product) => product.category.name === filteredCategory)
    : products;

  const handleCategoryClick = (category) => {
    setFilteredCategory(category);
  };

  // const handleCardClick = (productId) => {
  //   console.log('Navigating to product with ID:', productId);
  //   router.push(`/products/${productId}`);
  // };


  const marketingMessage = marketingMessages[filteredCategory] || '';

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: 8, // Adjust the top margin to accommodate the AppBar
        display: 'flex',
        height: 'calc(100vh - 64px)', // Adjust height to fit the viewport
        flexDirection: isMobile ? 'column' : 'row'
      }}
    >
      <Toolbar />
      {isMobile ? (
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <Typography variant="h6" sx={{ p: 2 }}>
                  Categories
                </Typography>
                {categories.map((text, index) => (
                  <Button
                    key={index}
                    fullWidth
                    variant={filteredCategory === text ? 'contained' : 'text'}
                    color="inherit"
                    size="small"
                    sx={{ p: 1, textTransform: 'capitalize' }}
                    onClick={() => handleCategoryClick(text)}
                  >
                    {text}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={10}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                  {filteredCategory || 'All Products'}
                </Typography>
                {filteredCategory && (
                  <Typography variant="h6" color="text.secondary" paragraph>
                    {marketingMessages[filteredCategory]}
                  </Typography>
                )}
                <Grid container spacing={3}>
                  {filteredProducts.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>

                      <Card sx={{ maxWidth: 240, width: '100%' }}>
                        <CardMedia
                          component="img"
                          image={product.image} // Use fetched product image
                          alt={product.title}
                          sx={{ width: '100%', height: '140px', objectFit: 'cover' }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {product.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            NGN {product.price}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary" onClick={() => router.push(`/products/${product.id}`)}>
                            View Details
                          </Button>
                        </CardActions>
                      </Card>

                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <>
          <Box sx={{ width: 240, flexShrink: 0, overflowY: 'auto' }}>
            <List
              sx={{
                '& .MuiListItem-root': {
                  padding: '8px 16px',
                },
                '& .MuiListItemText-root': {
                  fontSize: '14px',
                },
                '@media (max-width: 600px)': {
                  width: '100%',
                  padding: '0 16px',
                },
              }}
            >
              <ListSubheader>Categories</ListSubheader>
              {categories.map((text, index) => (
                <ListItem button key={index} onClick={() => handleCategoryClick(text)}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ flexGrow: 1, ml: 3, overflowY: 'auto' }}>
            <Typography variant="h4" gutterBottom>
              {filteredCategory || 'All Products'}
            </Typography>
            {filteredCategory && (
              <Typography variant="h6" color="text.secondary" paragraph>
                {marketingMessage}
              </Typography>
            )}
            <Grid container spacing={3}>
              {filteredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={product.image} // Use fetched product image
                      alt={product.title}
                      sx={{ width: '100%', height: '140px', objectFit: 'cover' }} // Responsive styles
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        NGN {product.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => router.push(`/products/${product.id}`)}>
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MainContent;
