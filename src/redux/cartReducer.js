import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    cartItems:localStorage.getItem('myCartItems')?JSON.parse(localStorage.getItem('myCartItems')):[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
};

const cartSlice = createSlice({
    name:"cartSlicer",
    initialState,
    reducers:{
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex((item)=> item._id === action.payload._id);

            console.log(action.payload.id)
            console.log(itemIndex);
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1 
            }
            else{
                const tempProduct = {...action.payload, cartQuantity:1}
                state.cartItems.push(tempProduct);
            }
            localStorage.setItem('myCartItems', JSON.stringify(state.cartItems));
        
            
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(cartItem=> cartItem._id!== action.payload._id)
            state.cartItems = nextCartItems;
            localStorage.setItem("myCartItems", JSON.stringify(state.cartItems))
        },
        reduceCartQuantity(state, action){

            const itemIndex = state.cartItems.findIndex(cartItem=> cartItem._id ===action.payload._id); 
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1 
            }
            else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(cartItem=> cartItem._id!== action.payload._id)
            state.cartItems = nextCartItems;
            localStorage.setItem("myCartItems", JSON.stringify(state.cartItems))
            }
        },
        getTotalAmount(state, action){
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {price, cartQuantity} = cartItem; 
                const totalPrice = price * cartQuantity; 

                cartTotal.total += totalPrice; 
                cartTotal.quantity += cartQuantity;

                return cartTotal 
            }, 
            {
                total:0,
                quantity:0
            }
            );
            state.cartTotalAmount = total;
            state.cartTotalQuantity = quantity;

        }
    },
})

export const {addToCart, removeFromCart, reduceCartQuantity, getTotalAmount} = cartSlice.actions;
export  default cartSlice.reducer; 

//we can have multiple slices also 
