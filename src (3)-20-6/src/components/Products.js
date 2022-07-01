import React,{useState,useEffect} from 'react'
import { getProducts ,deleteProduct,searchProducts} from '../service/Product'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../service/Auth';
import { useLocation } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function Products(props) {
  const [proData,setProData]=useState([]);
  const navigate=useNavigate();
  const location=useLocation();
  useEffect(()=>{
    searchProducts(location.search)
    .then(res=>{
      if(res.data.err==0){
      
        
        (res.data.prodata)
      }
    })
  },[location.search])
  useEffect(()=>{
   getProducts()
   .then(res=>{
    if(res.data.err==0){
      console.log(res.data.prodata)
      setProData(res.data.prodata)
    }
   })
  },[])
  const delPro=(id)=>{
    if(window.confirm("Do u want to delete ?"))
    {
      deleteProduct(id)
      .then(res=>{
        if(res.data){
          alert("Product Deleted");
          let data=proData.filter(pro=> pro._id!=id);
          setProData(data);
        }
      })
    }
  }
  return (
    <Container>
      <h2> Products</h2>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
       
       
          {proData?.map(pro=>
           <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }} key={pro.id}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={pro.imageURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pro.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category : {pro.category} <br/>
          Price : {pro.price}<br/>
          Avail Items : {pro.availableItems}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> navigate(`/product-details/${pro._id}`) }>Info</Button>
        <Button size="small">Add To Cart</Button>
        {isAdmin()?<Button size="small" onClick={()=> delPro(pro._id)}>Delete</Button>:''}
      </CardActions>
        </Card>
        </Grid>
         )}
      
       
       
      </Grid>
    </Box>
    </Container>
  )
}
