import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MyAppBar from './components/MyAppBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Editproduct from './components/Editproduct';
import NotFound from './components/NotFound';
import Products from './components/Products';
import Addproduct from './components/Addproduct';
import Productdetails from './components/Productdetails';
import Checkout from './components/Checkout';
import Success from './components/Success';
import { isLoggedIn, isAdmin } from './service/Auth';
import Cart from './components/Cart';

function PrivateRoute({children}){
  const auth = isLoggedIn(); 
  return auth? children: <Navigate to="/" />

}
function AdminPrivateRoute({children}){
  const auth = isLoggedIn();
  const admin = isAdmin(); 
  return (auth && admin)? children:<Navigate to="/" />
}


 function App() {
  return (
    <>
      <Router>
        <MyAppBar />
        
        <section>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={< PrivateRoute>
            <Products/>
            </PrivateRoute>} />
            <Route path="/not-found" element={<NotFound/>} />
            <Route path="/editproduct/:id" element={<Editproduct/>} />

            <Route path="/addproduct" element={<AdminPrivateRoute>
              <Addproduct/>
            </AdminPrivateRoute>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/success" element={<Success/>} />
            <Route path="//product-details/:id" element={<PrivateRoute>
            <Productdetails/>
            </PrivateRoute>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </section>
        
      </Router>
      
    </>
  )
}
export default App 