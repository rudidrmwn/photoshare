import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
export default function CommentsPanel({ photoId }){
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef(null);
  async function load(){
    const res = await fetch(`/api/photos/${photoId}/comments?page=1&limit=50`);
    const data = await res.json();
    setItems(data.items);
  }
  async function send(){
    const res = await fetch(`/api/photos/${photoId}/comments`, { method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ text }) });
    if(res.ok){ setText(''); }
  }
  useEffect(()=>{
    load();
    const s = io(); socketRef.current = s;
    s.emit('photo:join', photoId);
    s.on('comment:new', (c)=> setItems(prev=>[c, ...prev]));
    s.on('comment:delete', ({ id })=> setItems(prev=> prev.filter(x=>x._id!==id)) );
    return ()=>{ s.emit('photo:leave', photoId); s.close(); };
  }, [photoId]);
  return (
    <div style={{display:'grid',gap:8}}>
      <div style={{display:'flex',gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a comment..." style={{flex:1}}/>
        <button onClick={send} disabled={!text.trim()}>Send</button>
      </div>
      <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:8}}>
        {items.map(c=> (
          <li key={c._id} style={{border:'1px solid #eee',padding:8,borderRadius:8}}>
            <strong>@{c.user?.username||'user'}:</strong> {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
