import React from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import MyAppBar from './components/MyAppBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
export default function App() {
  return (
    <>
      <Router>
        <MyAppBar/>
        <section>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/addproduct" element={<AddProduct/>}/>
              <Route path="/product-details/:id" element={<ProductDetails/>}/>
          </Routes>
        </section>
      </Router>
    </>
  )
}
