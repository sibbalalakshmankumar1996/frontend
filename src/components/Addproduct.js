import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postAddProduct } from '../service/Products';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function Addproduct() {
  const [state, setState] = useState({});
  const navigate = useNavigate();

  const handler = event => {
    let {name,value}=event.target;
    setState({...state,[name]:value})
  }

const handleSubmit = event =>{
  event.preventDefault();
  postAddProduct(state)
  .then(res=>{
    if(res.data){
      alert("New product added");
      navigate('/products')
    }
  })
}

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add product
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="category"
                label="category"
                id="category"
                autoComplete="category"
                onChange={handler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="price"
                id="price"
                autoComplete="price"
                onChange={handler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="description"
                id="description"
                autoComplete="description"
                onChange={handler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="manufacturer"
                label="manufacturer"
                id="manufacturer"
                autoComplete="manufacturer"
                onChange={handler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="availableItems"
                label="availableItems"
                id="availableItems"
                autoComplete="availableItems"
                onChange={handler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="imageURL"
                label="imageURL"
                id="imageURL"
                autoComplete="imageURL"
                onChange={handler}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  )
}
