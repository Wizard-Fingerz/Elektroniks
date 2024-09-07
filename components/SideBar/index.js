import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListSubheader, Box, Toolbar } from '@mui/material';

const Sidebar = () => {
  const categories = [
    'Shop Categories', 'Shop by Brand', 'Computers', 'Cameras & Camcorders', 'DIY Security System',
    'Electronics', 'Headphones & Headsets', 'Digital Signage', 'Phone Systems', 'Surveillance & Security',
    'Spy Gear', 'Daily Deals', 'Top Products', 'Free Shipping Deals', 'On Sale Offers', 'Most Key Search'
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListSubheader>Categories</ListSubheader>
          {categories.map((text, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
