import React, { useContext } from 'react';
import { CartContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart(){
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length===0 && <p>No items. <Link to="/products">Shop now</Link></p>}
      {cart.map(i => (
        <div key={i.id} style={{display:'flex', gap:12, alignItems:'center'}}>
          <img src={i.image} style={{width:90,height:60,objectFit:'cover'}}/>
          <div>
            <strong>{i.title}</strong>
            <div>Qty: {i.qty}</div>
            <div>{(i.price*i.qty).toLocaleString()}</div>
          </div>
          <button onClick={()=>removeFromCart(i.id)}>Remove</button>
        </div>
      ))}

      <h3>Total: KES {total.toLocaleString()}</h3>
      {cart.length>0 && <button onClick={()=>navigate('/checkout')}>Proceed to Checkout</button>}
    </div>
  );
}