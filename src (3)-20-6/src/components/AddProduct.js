import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postAddProduct} from '../service/Product';
import { useNavigate} from 'react-router-dom'
const theme = createTheme();
export default function AddProduct() {
    const [state,setState]=useState({});
    const navigate=useNavigate();
    const handler=(event)=>{
   const {name,value}=event.target;
   setState({...state,[name]:value})
    }
    const handleSubmit=(event)=>{
          event.preventDefault();
          postAddProduct(state)
          .then(res=>{
            if(res.data){
                alert("Product Added");
                navigate("/products")
            }
          })
    }

  return (
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
         Add Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handler}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="category"
            label="Category"
            name="category"
            autoComplete="category"
            autoFocus
            onChange={handler}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            autoComplete="price"
            autoFocus
            onChange={handler}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="description"
            name="description"
            autoComplete="description"
            autoFocus
            onChange={handler}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="manufacturer"
            label="manufacturer"
            name="manufacturer"
            autoComplete="manufacturer"
            autoFocus
            onChange={handler}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="availableItems"
            label="availableItems"
            name="availableItems"
            autoComplete="availableItems"
            autoFocus
            onChange={handler}
          />
            <TextField
            margin="normal"
            required
            fullWidth
            id="imageURL"
            label="imageURL"
            name="imageURL"
            autoComplete="imageURL"
            autoFocus
            onChange={handler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
     
    </Container>
  </ThemeProvider>
  )
}
