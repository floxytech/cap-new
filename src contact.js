import React, { useState } from 'react';
import { sendContact } from '../api';

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await sendContact(form);
    setStatus(res.message || 'Sent');
    alert('Message sent — check ' + (res.data ? 'backend logs or email' : 'email server'));
  }

  return (
    <div>
      <h2>Contact Us</h2>
      <p>Phone: +254706787860</p>
      <p>Email: kennmuasya49@gmail.com</p>
      <form onSubmit={handleSubmit}>
        <div><input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
        <div><input required placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
        <div><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
        <div><textarea required placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} /></div>
        <button type="submit">Send</button>
      </form>
      {status && <div>{status}</div>}
    </div>
  );
}