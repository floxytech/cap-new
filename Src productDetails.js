import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../api';
import { CartContext } from '../App';

export default function ProductDetail(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(()=>{ fetchProduct(id).then(setProduct); }, [id]);
  if(!product) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{width:600, maxWidth:'100%'}}/>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: KES {product.price.toLocaleString()}</p>
      <button onClick={() => { addToCart(product,1); navigate('/cart'); }}>Add to cart</button>
    </div>
  );
}