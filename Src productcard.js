import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p>Category: {product.category}</p>
      <p>KES {product.price.toLocaleString()}</p>
      <Link to={`/products/${product.id}`}>View</Link>
    </div>
  );
}