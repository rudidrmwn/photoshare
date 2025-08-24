import { useEffect, useState, useCallback } from 'react';
import { api } from '../api/client.js';
import PhotoCard from '../components/PhotoCard.jsx';
import InfiniteScrollAnchor from '../components/InfiniteScrollAnchor.jsx';
export default function FeedLatest() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [done, setDone] = useState(false);
  const load = useCallback(async ()=>{
    if (done) return;
    const { items: next, total } = await api.latest(page);
    setItems(prev=>[...prev, ...next]);
    setPage(p=>p+1);
    if ((items.length + next.length) >= total) setDone(true);
  }, [page, done, items.length]);
  useEffect(()=>{ load(); }, []);
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',gap:12,padding:12}}>
      {items.map(p => <PhotoCard key={p._id} p={p} />)}
      {!done && <InfiniteScrollAnchor onIntersect={load} />}
    </div>
  );
}
