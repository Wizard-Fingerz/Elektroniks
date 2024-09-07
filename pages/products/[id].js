// pages/products/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Button,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Divider,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { API_BASE_URL } from '@/utils/constants';
import Header from '@/components/Header';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);




  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`${API_BASE_URL}/products/${id}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (id) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('You must be logged in to fetch reviews');
            return;
          }
          const response = await fetch(`${API_BASE_URL}/product-reviews/`, {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
          const data = await response.json();
          const productReviews = data.filter(review => review.product === parseInt(id));
          setReviews(productReviews);
        } catch (error) {
          console.error('Error fetching product reviews:', error);
        }
      }
    };

    fetchReviews();
  }, [id]);

  const handleAddReview = async (event) => {
    event.preventDefault();
    if (rating < 0 || rating > 5) {
      setError('Invalid rating value. Please enter a value between 0 and 5.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/product-reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          product: parseInt(id),
          rating: rating,
          review: review
        })
      });
      const data = await response.json();
      setReviews([...reviews, data]);
      setRating(0);
      setReview('');
    } catch (error) {
      setError('Error adding review');
    }
  };

  if (!product) return <Typography>Loading...</Typography>;

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('You must be logged in to add to cart');
        return;
      }
      const response = await fetch(`${API_BASE_URL}/cart-items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          product: parseInt(id),
          quantity: quantity,
          price: product.price
        })
      });
      const data = await response.json();
      console.log('Added to cart:', data);
      setAddedToCart(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleIncrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Grid container spacing={2} sx={{ mt: 10, p: 1 }}>

        <Grid item xs={12} sm={6} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{ height: 500, objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="h6">NGN {product.price}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Rating value={product.rating} readOnly />
            <Typography variant="body2">Rating: {product.rating} / 5</Typography>
            <Typography variant="body2">Reviews: {reviews.length}+</Typography>

            <Typography variant="body2">In Stock: {product.stock} left</Typography>
            <Typography variant="body2">Vendor: {product.vendor.name}</Typography>
            <Typography variant="body2">Vendor Rating: {product.vendor.rating} / 5</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <IconButton onClick={handleDecrementQuantity}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body2" sx={{ mx: 2 }}>
                {quantity}
              </Typography>
              <IconButton onClick={handleIncrementQuantity}>
                <AddIcon />
              </IconButton>
              {addedToCart ? (
                <Button variant="contained" onClick={() => router.push('/cart')} sx={{ ml: 2 }}>
                  View in Cart
                </Button>
              ) : (
                <Button variant="contained" onClick={handleAddToCart} sx={{ ml: 2 }}>
                  Add to Cart
                </Button>
              )}
            </Box>
          </CardContent>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">Comments</Typography>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <Box key={review.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 4 }}>
              <Typography variant="body1">{review.review}</Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2">Rating: {review.rating} / 5</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" sx={{ mb: 2 }}>No comments yet...</Typography>
        )}
      </Box>

      <Box sx={{ mt: 4, p: 2, border: '1px solid #ddd', borderRadius: 4 }}>
        <Typography variant="h6">Add a Review</Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Review"
          multiline
          rows={4}
          value={review}
          onChange={(event) => setReview(event.target.value)}
          sx={{ width: '100%', mb: 2 }}
        />
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button variant="contained" onClick={handleAddReview} sx={{ mt: 2 }}>
          Post Review
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;