import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'
import { Card, CardMedia, Grid} from '@mui/material';
import { getProductByid } from '../service/Products';
import { addToCart } from '../redux/cartReducer';
import { useNavigate } from 'react-router-dom';

export default function Productdetails() {
  const [product, setProduct] = useState({});
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=>{
        getProductByid(id)
        .then(res=>{
            console.log(res.data)
            setProduct(res.data);
        })
        .catch(err => console.log(err))

    },[id])

    const handleAddToCart = product =>{
      dispatch(addToCart(product));
    }
    const onUpdateProduct = (id)=>{
        navigate(`/editproduct/${id}`)
    }

  return (
    <>
    <div style={{ display: "flex", justifyContent: "space-evenly", margin: "40px 40px" }}>
    <Grid item xs={3}>
                    <Card sx={{ maxWidth: "500px" }} >
                        <CardMedia
                            component="img"
                            alt={product.name}
                            image={product.imageURL}
                            height="250"
                        />
                    </Card>
                </Grid>
                <div>
                    <ul style={{ listStyleType: "none", fontSize: "24px",fontWeight:"bolder", maxWidth:"600px"}}>
                        <li >
                            Product Name: <span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.name}</span>
                        </li>
                        <li>
                            Price:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>₹{product.price}</span> 
                        </li>
                        <li>
                            Category:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.category}</span> 
                        </li>
                        <li>
                            Description:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.description}</span> 
                        </li>
                        <li>
                            Manufacturer:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.manufacturer}</span> 
                        </li>
                        <li>
                            Available Items:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.availableItems}</span> 
                        </li>
                        <li>
                            <button className='btn btn-primary' onClick={()=> handleAddToCart(product)} >Add to cart</button>
                            <button className='btn btn-info m-2' onClick={()=>onUpdateProduct(product._id)}>Edit</button>
                            <button className='btn btn-warning m-2' onClick={()=> navigate("/")}>Back</button>
                        </li>
                    </ul>



                </div>
                

            </div>
    
    </>
  )
}
