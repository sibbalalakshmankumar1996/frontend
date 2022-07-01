import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { removeFromCart, reduceCartQuantity, addToCart, getTotalAmount } from '../redux/cartReducer';


export default function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    dispatch(getTotalAmount())

  }, [cart])

  const handleRemoveCart = cartItem =>{
    dispatch(removeFromCart(cartItem))

  }
  const habdleReduceCart = cartItem =>{
    dispatch(reduceCartQuantity(cartItem))
  }
  const handleIncreaseCart = cartItem =>{
    dispatch(addToCart(cartItem))
  }

  console.log(cart)
  return (
    <>
      <div className='container'>
        <table className='table table-striped mt-3'>
          <thead>
            <tr>
              <th className='text-center'>Product</th>
              <th className='text-center'>Name</th>
              <th className='text-center'>Price</th>
              <th className='text-center'>Quantity</th>
              <th className='text-center'>subtotal</th>
              <th className='text-center'></th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((cartItem) =>
              <tr key={cartItem._id} className='text-center'>
                <td><img src={cartItem.imageURL} height={100} width={100} alt={cartItem.name} /></td>
                <td>{cartItem.name}</td>
                <td>{cartItem.price}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-secondary" onClick={()=> handleIncreaseCart(cartItem)} >+</button>
                    <button type="button" className="btn btn-light" style={{ width: "70px" }}>{cartItem.cartQuantity}</button>
                    <button type="button" className="btn btn-secondary" onClick={()=> habdleReduceCart(cartItem)} >-</button>
                  </div>
                </td>
                <td>
                  ₹ {cartItem.price * cartItem.cartQuantity}
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={()=> handleRemoveCart(cartItem)}>Delete</button>
                </td>
              </tr>
            )}
            <tr className='text-center'>
              <td></td>
              <td></td>
              <td><h4>Total: ₹ {cart.cartTotalAmount}</h4></td>
              <td></td>
              <td><button type="button" className="btn btn-info" onClick={()=>navigate("/checkout")}>Checkout</button></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

    </>
  )
}
