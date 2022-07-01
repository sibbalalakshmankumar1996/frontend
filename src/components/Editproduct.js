import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import { useNavigate, useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getProductByid, updateProductDetails } from '../service/Products';

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





export default function Editproduct() {

  const [editData, setEditData] = useState({name:'', category:'', price:'', description:'', manufacturer:'', availableItems:'', imageURL:''})
  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(()=>{
    getProductByid(id)
    .then(res=>{
      setEditData(res.data)
    })
    .catch(err=> console.log(err))


  },[])
  console.log(editData);

  const handler = event =>{
    const {name, value} = event.target;
    setEditData({...editData, [name]:value})

  }
  

  const handleUpdatedData = event =>{
    event.preventDefault();
    updateProductDetails(id, editData)
    .then(res=>{
      if(res){
        alert("Product Edited")
        navigate(`/product-details/${id}`)
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
            <Box component="form" onSubmit={handleUpdatedData} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                value={editData.name}
                autoComplete="name"
                autoFocus
                onChange={handler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="category"
                value={editData.category}
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
                value={editData.price}
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
                value={editData.description}
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
                value={editData.manufacturer}
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
                value={editData.availableItems}
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
                value={editData.imageURL}
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
                Update
              </Button>
              
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  )
}
