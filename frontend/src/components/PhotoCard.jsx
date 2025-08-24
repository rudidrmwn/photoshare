import { useState } from 'react';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
export default function PhotoCard({ p }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(p.likes);
  async function like() { try { const r = await api.like(p._id); setLikes(r.likes); } catch(e){} }
  return (
    <div style={{border:'1px solid #ddd',borderRadius:12,overflow:'hidden'}}>
      <img src={p.thumbUrl} alt={p.caption||'photo'} style={{width:'100%',display:'block'}}/>
      <div style={{padding:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontWeight:600}}>{p.caption||'Untitled'}</div>
          <div style={{fontSize:12,opacity:.7}}>{(p.tags||[]).map(t=>`#${t}`).join(' ')}</div>
        </div>
        <div>
          <button disabled={!user} onClick={like}>❤️ {likes}</button>
        </div>
      </div>
    </div>
  );
}
