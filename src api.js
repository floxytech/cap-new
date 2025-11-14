const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export async function fetchProducts() {
  const res = await fetch(API + '/products');
  return res.json();
}
export async function fetchProduct(id) {
  const res = await fetch(API + '/products/' + id);
  return res.json();
}
export async function createOrder(payload) {
  const res = await fetch(API + '/orders/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
export async function sendContact(payload) {
  const res = await fetch(API + '/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}