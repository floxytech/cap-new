import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => { fetchProducts().then(setProducts); }, []);

  // a 'trending' burner (first 6)
  const trending = products.slice(0,6);

  return (
    <div>
      <section style={{marginBottom:20}}>
        <h2>Welcome to Caperone Enterprises Store</h2>
        <p>Sign up or login to place orders. (For demo, there is no real auth.)</p>
      </section>

      <section>
        <h3>Trending</h3>
        <div className="product-grid">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section style={{marginTop:24}}>
        <h3>Browse all Products</h3>
        <p><a href="/products">See all products</a></p>
      </section>
    </div>
  );
}