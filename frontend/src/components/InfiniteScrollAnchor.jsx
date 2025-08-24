import { useEffect, useRef } from 'react';
export default function InfiniteScrollAnchor({ onIntersect }) {
  const ref = useRef(null);
  useEffect(()=>{
    const io = new IntersectionObserver((entries)=>{ 
      if(entries[0].isIntersecting) onIntersect(); }, { 
        rootMargin: '400px' 
      });
    if(ref.current) io.observe(ref.current); 
    return ()=>io.disconnect();
  }, [onIntersect]);
  return <div ref={ref} style={{ height: 1 }} />;
}
