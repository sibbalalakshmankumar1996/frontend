import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import {deleteProduct} from '../service/Products'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isAdmin } from '../service/Auth';
import { addToCart } from '../redux/cartReducer';


export default function PerPageProducts(props) {
    const {products, getUpdatedData} = props
    const [proData, setProData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const delProduct = (id) =>{
        if(window.confirm("Do you want to delete a product?"))
        {
          deleteProduct(id)
        .then(res=>{
          if(res.data){
            alert("product deleted");
            //console.log(proData);
            //let data = proData.filter(pro=>pro._id !==id)
            getUpdatedData();
            
          }
        })
        }
      }
    
      const handleAddToCart = (product)=>{
        dispatch(addToCart(product))
    
      }
      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

          {products?.map((product)=>

          <Grid item xs={4} key={product._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.imageURL}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Category : {product.category} <br/>
                Price : {product.price}<br/>
                Avail Items : {product.availableItems}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=> navigate(`/product-details/${product._id}`)}>Info</Button>
                <Button size="small" onClick={()=> handleAddToCart(product)}>Add to Cart</Button>
                {isAdmin()?<Button size="small" onClick={()=> delProduct(product._id)}>Delete</Button>:''}
              </CardActions>
            </Card>
          </Grid>
          )}
        </Grid>
      </Box>
  )
}
