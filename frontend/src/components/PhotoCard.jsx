import { useState } from 'react';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import CommentsModal from "./CommentsModal.jsx";

export default function PhotoCard({ p }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(p.likes);
  const [liked, setLiked] = useState(
    user ? p.likedBy?.includes(user._id) : false
  );

  async function toggleLike() {
    if (!user) return;
    try {
      const r = liked ? await api.unlike(p._id) : await api.like(p._id);
      setLikes(r.likes);
      setLiked(!liked);
    } catch (e) {
      console.error(e);
    }
  }

  // fungsi share
  function shareToInstagram() {
    const url = encodeURIComponent(window.location.origin + "/photos/" + p._id);
    window.open(`https://www.instagram.com/?url=${url}`, "_blank");
  }

  function shareToTikTok() {
    const url = encodeURIComponent(window.location.origin + "/photos/" + p._id);
    window.open(`https://www.tiktok.com/share?url=${url}`, "_blank");
  }

  function shareToPinterest() {
    const url = encodeURIComponent(window.location.origin + "/photos/" + p._id);
    const media = encodeURIComponent(p.thumbUrl);
    const desc = encodeURIComponent(p.caption || "Check this photo!");
    window.open(
      `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}`,
      "_blank"
    );
  }

  return (
    <div style={{border:'1px solid #ddd',borderRadius:12,overflow:'hidden'}}>
      <img src={p.thumbUrl} alt={p.caption||'photo'} style={{width:'100%',display:'block'}}/>
      <div style={{padding:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontWeight:600}}>{p.caption||'Untitled'}</div>
          <div style={{fontSize:12,opacity:.7}}>
            {(p.tags||[]).map(t=>`#${t}`).join(' ')}
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button
            disabled={!user}
            onClick={toggleLike}
            style={{
              color: liked ? "red" : "black",
              cursor: user ? "pointer" : "not-allowed",
            }}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </button>
          <CommentsModal photoId={p._id} />

          {/* Tombol share */}
          <button onClick={shareToInstagram}>📷 IG</button>
          <button onClick={shareToTikTok}>🎵 TikTok</button>
          <button onClick={shareToPinterest}>📌 Pinterest</button>
        </div>
      </div>
    </div>
  );
}