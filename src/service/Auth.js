import { MAIN_API } from "../env";
import jwt_decode from 'jwt-decode';

import axios from "axios";
function userSignUp(data){
    return axios.post(`${MAIN_API}users`,data);
}
function loginUser(data){
    return axios.post(`${MAIN_API}auth`, data)
}
function isLoggedIn(){
    let data = localStorage.getItem('_token');
    //console.log(data); 
    //faWQiOiI2MmE5OGFjNmM1MTk1YjA1NDQwNjc3NGMiLCJuYW1lIjoibHVja3kga3VtYXIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjU1MzYxOTk4fQ.SYSMopUCeBqe2Zg12X35NsRJdust5o3dhGrSWaENozg
    if(data){
        return true 
    }
    return false 
}
function getToken(){
    return localStorage.getItem('_token');
}
function getUser(){
    try{
        //console.log(jwt_decode(localStorage.getItem("_token"))); 
        //{iat: 1655361998 isAdmin: false, name: "lucky kumar" _id: "62a98ac6c5195b054406774c"}
        // here jwt_decode is decoding the token
     return jwt_decode(localStorage.getItem("_token"))
    }
    catch(ex){
        return null;
    }
}
function isAdmin(){
    //console.log(!getUser()?false:getUser().isAdmin); ---> false
    return !getUser()?false:getUser().isAdmin;
}
function doLogout(){
    localStorage.removeItem('_token');
    window.location="/";
    

}
export {userSignUp, loginUser, isLoggedIn, getToken, getUser, isAdmin, doLogout};