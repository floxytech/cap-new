import React, { useContext, useState } from 'react';
import { CartContext } from '../App';
import { createOrder } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const { cart, setCart } = useContext(CartContext);
  const [customer, setCustomer] = useState({ name:'', email:'', phone:'' });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const total = cart.reduce((s,i)=>s + i.price*i.qty, 0);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const payload = {
      items: cart.map(i=>({ id:i.id, title:i.title, price:i.price, qty:i.qty })),
      customer,
      paymentMethod,
      paymentData: paymentMethod==='mpesa' ? { phone: customer.phone } : { account: '000123456' }
    };
    setStatus('processing');
    const res = await createOrder(payload);
    if(res.success){
      setStatus('completed');
      // clear cart
      localStorage.removeItem('cart');
      // redirect to thank you or order summary
      navigate('/');
      alert('Order placed: ' + res.order.id + '\nPayment status: ' + JSON.stringify(res.order.paymentResult));
    } else {
      setStatus('error');
      alert('Order failed');
    }
  }

  if(cart.length===0) return <div>No items in cart.</div>;

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input required value={customer.name} onChange={e=>setCustomer({...customer, name:e.target.value})} />
        </div>
        <div>
          <label>Email</label>
          <input required value={customer.email} onChange={e=>setCustomer({...customer, email:e.target.value})} />
        </div>
        <div>
          <label>Phone (for M-Pesa)</label>
          <input required value={customer.phone} onChange={e=>setCustomer({...customer, phone:e.target.value})} />
        </div>
        <div>
          <label>Payment Method</label>
          <select value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)}>
            <option value="mpesa">M-Pesa (Mock)</option>
            <option value="bank">Bank Transfer (Mock)</option>
          </select>
        </div>
        <div>
          <h3>Total: KES {total.toLocaleString()}</h3>
          <button type="submit">Pay & Place Order</button>
        </div>
      </form>
      {status && <div>Status: {status}</div>}
    </div>
  );
}