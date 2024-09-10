import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // add this state to store cart items
  const [token, setToken] = useState(null); // add this state to store token
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };



  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownOpen = (menu) => (event) => {
    setDropdownAnchorEl((prev) => ({ ...prev, [menu]: event.currentTarget }));
  };

  const handleDropdownClose = (menu) => () => {
    setDropdownAnchorEl((prev) => ({ ...prev, [menu]: null }));
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#1a1a40' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={handleHomeClick}
          >
            Elektroniks
          </Typography>
          <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              aria-controls="categories-menu"
              aria-haspopup="true"
              onClick={handleDropdownOpen('categories')}
              color="inherit"
            >
              Categories
            </Button>
            <Menu
              id="categories-menu"
              anchorEl={dropdownAnchorEl.categories}
              keepMounted
              open={Boolean(dropdownAnchorEl.categories)}
              onClose={handleDropdownClose('categories')}
            >
              <MenuItem onClick={() => handleDropdownClose('categories')}>Computers</MenuItem>
              <MenuItem onClick={() => handleDropdownClose('categories')}>Cameras & Camcorders</MenuItem>
              <MenuItem onClick={() => handleDropdownClose('categories')}>Electronics</MenuItem></Menu>
            <Button
              aria-controls="products-menu"
              aria-haspopup="true"
              onClick={handleDropdownOpen('products')}
              color="inherit"
            >
              Products
            </Button>
            <Menu
              id="products-menu"
              anchorEl={dropdownAnchorEl.products}
              keepMounted
              open={Boolean(dropdownAnchorEl.products)}
              onClose={handleDropdownClose('products')}
            >
              <MenuItem onClick={handleDropdownClose('products')}>New Arrivals</MenuItem>
              <MenuItem onClick={handleDropdownClose('products')}>Best Sellers</MenuItem>
              <MenuItem onClick={handleDropdownClose('products')}>On Sale</MenuItem>
            </Menu>
            <Button
              aria-controls="brands-menu"
              aria-haspopup="true"
              onClick={handleDropdownOpen('brands')}
              color="inherit"
            >
              Brands
            </Button>
            <Menu
              id="brands-menu"
              anchorEl={dropdownAnchorEl.brands}
              keepMounted
              open={Boolean(dropdownAnchorEl.brands)}
              onClose={handleDropdownClose('brands')}
            >
              <MenuItem onClick={handleDropdownClose('brands')}>Brand A</MenuItem>
              <MenuItem onClick={handleDropdownClose('brands')}>Brand B</MenuItem>
              <MenuItem onClick={handleDropdownClose('brands')}>Brand C</MenuItem>
            </Menu>
          </Box>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {token ? (
            <>
              <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>
                Become a Vendor
              </Button>
              <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} onClick={() => {
                localStorage.removeItem('token');
                router.push('/');
                window.location.reload();
              }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>
                Login
              </Button>
              <Button href="/register" color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 250 }}>
          <Toolbar>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem button onClick={() => handleDrawerClose()}>
              <Typography variant="h6">Categories</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('categories')}>
              <Typography>Computers</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('categories')}>
              <Typography>Cameras & Camcorders</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('categories')}>
              <Typography>Electronics</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('products')}>
              <Typography>New Arrivals</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('products')}>
              <Typography>Best Sellers</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('products')}>
              <Typography>On Sale</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('brands')}>
              <Typography>Brand A</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('brands')}>
              <Typography>Brand B</Typography>
            </ListItem>
            <ListItem button onClick={handleDropdownOpen('brands')}>
              <Typography>Brand C</Typography>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
