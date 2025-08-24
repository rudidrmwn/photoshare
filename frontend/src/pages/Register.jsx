import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function Register(){
  const { register } = useAuth();
  const nav = useNavigate();
  const [u,setU]=useState(''); const [em,setEm]=useState(''); const [p,setP]=useState(''); const [e,setE]=useState('');
  async function onSubmit(ev){ ev.preventDefault(); try{ await register(u,em,p); nav('/'); }catch(err){ setE(err.message);} }
  return (
    <form onSubmit={onSubmit} style={{display:'grid',gap:8,padding:12,maxWidth:320}}>
      <input placeholder="username" value={u} onChange={e=>setU(e.target.value)} />
      <input placeholder="email" value={em} onChange={e=>setEm(e.target.value)} />
      <input type="password" placeholder="password" value={p} onChange={e=>setP(e.target.value)} />
      <button>Register</button>
      <div style={{color:'crimson'}}>{e}</div>
    </form>
  );
}
