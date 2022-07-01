import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getProductByid } from '../service/Product';
export default function ProductDetails() {
    const {id}=useParams();
    useEffect(()=>{
      getProductByid(id)
      .then(res=>{
        console.log(res.data)
      })
      .catch(err=> console.log(err))
    },[id])
  return (
    <div>ProductDetails</div>
  )
}
