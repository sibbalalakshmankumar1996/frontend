import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import {useSelector} from 'react-redux';
import { useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  

export default function Checkout() {
    const [cardValue, setCardValue] = useState({number:'', errorMsg:''});
    const cartAmount = useSelector(state=> state.cart)
    const navigate=useNavigate();

    const handler= event=> {
        const {name, value} = event.target;
        setCardValue({...cardValue, [name]:value})
    }
    const handleUpdatedData = event =>{
        event.preventDefault();
        let cardRegex = /^[0-9]{16,16}$/

        if(cardValue.number!==''){
            setCardValue({...cardValue, errorMsg:''})
            console.log(cardRegex.test(cardValue.number))

            if(cardRegex.test(cardValue.number)){
                navigate("/success")
            }
            else{
                setCardValue({...cardValue, errorMsg:"Enter valid 16 digit number"})
            }

        }
        else{
            setCardValue({...cardValue, errorMsg:"Fill the input field"})
        }
        

    }

  return (
    <Container>
    <h1>Checkout</h1>
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
              Card Details
            </Typography>
            <Box component="form" onSubmit={handleUpdatedData} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="16 Digits Card Number"
                name="number"
                autoComplete="name"
                autoFocus
                onChange={handler}
              />
              {cardValue.errorMsg!=='' &&
                 <p style={{color:'red'}}>{cardValue.errorMsg}</p>}
              <span><b>Order Total: ₹ {cartAmount.cartTotalAmount}</b></span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Checkout
              </Button>
              
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  )
}
