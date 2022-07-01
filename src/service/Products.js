import { MAIN_API } from "../env";
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function postAddProduct(data){
    return axios.post(`${MAIN_API}products`, data);
}
function getProducts(){
    return axios.get(`${MAIN_API}products`);
}
function getProductByid(id){
    return axios.get(`${MAIN_API}products/${id}`)
}
function deleteProduct(id){
    return axios.delete(`${MAIN_API}products/${id}`)
}
function searchProducts(ser){
    return axios.get(`${MAIN_API}products/${ser}`)
}
function updateProductDetails(id,data){
    return axios.put(`${MAIN_API}products/${id}`, data)
  
  }

export {postAddProduct, getProducts, getProductByid, deleteProduct, searchProducts, updateProductDetails}
