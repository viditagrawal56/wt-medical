import React from "react";
import {Link,useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart, } from "../redux/features/cart/cartSlice";removeFromCart
const Cart = () => {

const navigate = useNavigate();
const dispatch=useDispatch();
const cart=useSelector((state)=> state.cart);

const {cartItems}=cart;




  return <>
  <div className="container flex justify-around items-start wrap mx-auto mt-8">
    {cartItems.length===0? (<div>
      Your cart is empty <Link to='/shop'>
        Go Back 
      </Link>):(
        <></>
      )}
    </div>)
  </div>
  </>;
};

export default Cart;
