import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsPanel from '../components/CommentsPanel.jsx';
export default function PhotoDetail(){
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  useEffect(()=>{ (async()=>{
    const res = await fetch(`/api/search?q=${id}`); const data = await res.json();
    setPhoto(data.items?.find(p=>p._id===id) || null);
  })(); }, [id]);
  if(!photo) return <div style={{padding:12}}>Loading...</div>;
  return (
    <div style={{display:'grid',gap:12,padding:12,gridTemplateColumns:'1.2fr 1fr'}}>
      <div>
        <img src={photo.url} alt={photo.caption||'photo'} style={{maxWidth:'100%'}}/>
        <div style={{marginTop:8}}><strong>{photo.caption}</strong></div>
        <div style={{opacity:.7}}>{(photo.tags||[]).map(t=>'#'+t).join(' ')}</div>
      </div>
      <CommentsPanel photoId={id} />
    </div>
  );
}
