import { useState } from 'react';
export default function Upload() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('');
  async function onSubmit(e) {
    e.preventDefault(); if (!file) return;
    try {
      console.log('Uploading', file, caption, tags);
      setStatus('Uploading...');
      const fd = new FormData();
      fd.append('photo', file);
      fd.append('caption', caption);
      fd.append('tags', tags);
      const res = await fetch('/api/photos/upload', { 
      method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: fd });
    
      if (!res.ok) throw new Error((await res.json()).error || 'Upload failed');
      setStatus('Uploaded!');
    } catch(e) { setStatus(e.message); }
  }
  return (
    <form onSubmit={onSubmit} style={{display:'grid',gap:8,padding:12,maxWidth:480}}>
      <input type="file" accept="image/jpeg,image/png" onChange={(e)=>setFile(e.target.files[0])} />
      <input placeholder="Caption" value={caption} onChange={e=>setCaption(e.target.value)} />
      <input placeholder="Tags" value={tags} onChange={e=>setTags(e.target.value)} />
      <button type="submit">Upload</button>
      <div>{status}</div>
    </form>
  );
}
