import React from 'react'
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { useNavigate} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Success() {
    const navigate=useNavigate();
  return (
      <Container>
      <h2>Order has been placed Successfully!</h2>
      <Stack sx={{ width: '100%' }} spacing={2}>
      
      <Alert variant="filled" severity="success" style={{margin:"8px"}}>
        You will receive notification by email with order details.
      </Alert>
    </Stack>
    <Button variant="contained" color="secondary" onClick={()=> navigate("/products")} className="margin:12px" style={{margin:"12px"}}>
      Go an order some more
    </Button>

      </Container>
  )
}
