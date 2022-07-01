import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { isLoggedIn,isAdmin,doLogout } from '../service/Auth'; 

export default function MyAppBar() {
  const [filter, setFilter] = useState("");
  const cartArray = useSelector(state=> state.cart.cartItems);
  //console.log(cartArray);
  const navigate=useNavigate();

  useEffect(()=>{
    let searchParams=new URLSearchParams();
      if(filter){
        searchParams.set("name",filter);
      }
      if(isLoggedIn()){
        navigate({
          pathname:"/products",
          search:searchParams.toString()
        })
      }
  },[filter])
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large" 
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Neostore E-Shop
          </Typography>
          {isLoggedIn() && 
          <div>
            <SearchIcon/> 
            <InputBase placeholder="Search" 
             value={filter} 
             onChange={(event) => setFilter(event.target.value)} />

            </div>}
          {!isLoggedIn() && (
            <>
            <Button color="inherit" onClick={()=> navigate("/") }>Login</Button>
            <Button color="inherit" onClick={()=> navigate("/signup")}>SignUp</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
            <Button color="inherit" onClick={()=> navigate("/") }>Home</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
            <Button color="inherit" onClick={()=> navigate("/cart") }>Cart<span className="badge">({cartArray.length})</span></Button>
            </>
          )}
          {isLoggedIn() && isAdmin() && (
            <>
            <Button color="inherit" onClick={()=> navigate("/addproduct") }>Add product</Button>
            </>
          )}
          {isLoggedIn() && (
            <>
            <Button color="inherit" onClick={doLogout}>Logout</Button>
            </>
          )}
 
        </Toolbar>
      </AppBar>
    </Box>
  );
}
