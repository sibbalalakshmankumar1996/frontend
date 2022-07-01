import React, { useState, useEffect } from 'react'
import { getProducts,searchProducts } from '../service/Products'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import Paginationpage from './PaginationPage';
import PerPageProducts from './PerPageProducts';

export default function Products(props) {
  const [proData, setProData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  
  const location = useLocation();

  useEffect(()=>{
    searchProducts(location.search)
    .then(res=>{
      if(res.data.err==0){

        //console.log(res.data)
        setProData(res.data.prodata);
      }
    })

  },[location.search])

  useEffect(() => {
    getProducts()
      .then(res =>{
        if(res.data.err==0){
          //console.log(res.data.prodata)
          setProData(res.data.prodata)
        }
      })
      .catch(err => console.log(err));


  }, [])

  const getUpdatedData = ()=>{
    getProducts()
    .then(res=>{
      if(res.data.err==0){
        setProData(res.data.prodata)
      }
    })
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = proData.slice(indexOfFirstPost, indexOfLastPost)
  //console.log(currentProducts);

//change page 
  const paginate = pageNumber=> setCurrentPage(pageNumber);

  return (
    <Container>
      <h2 className="p-3">Products</h2>
      <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
                <Grid container spacing={3}>
                <PerPageProducts products={currentProducts} getUpdatedData = {getUpdatedData} />
                </Grid>
            </Box>
      
      <Paginationpage postsPerPage={postsPerPage} totalPosts={proData.length} paginate={paginate}  />
    </Container>

  )
}
