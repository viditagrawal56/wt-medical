import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="container flex justify-around items-start wrap mx-auto mt-8">
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty <Link to="/shop">Go to shop</Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-[80%]">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart </h1>

            {cartItems.map((item) => (
              <div
                key={cartItems._id}
                className="flex items-enter mb-[1rem] pb-2"
              >
                <div className="w-[5rem] h-[5rem]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 ml-4">
                  <Link to={`/product/${item._id}`} className="text-cyan-500">
                    {item.name}
                  </Link>

                  <div className="mt-2 text-black">{item.brand}</div>
                  <div className="mt-2 text-black">₹ {item.price}</div>
                </div>

                <div className="w-24">
                  <select  className="w-full p-1 rounded text-black" value={item.qty} onChange={(e)=>addToCartHandler(item,Number(e.target.value))}>
                    {[...Array(item.countInStock).keys()],map(x)=>{
                      <option key={x+1} value={x+1}>{x+1}</option>
                    })}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
