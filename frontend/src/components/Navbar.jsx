import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav style={{display:'flex',gap:12,alignItems:'center',padding:12,borderBottom:'1px solid #eee'}}>
      <Link to="/">📷 PhotoShare</Link>
      <NavLink to="/latest">Latest</NavLink>
      <NavLink to="/popular">Popular</NavLink>
      <NavLink to="/upload">Upload</NavLink>
      <div style={{marginLeft:'auto'}}>
        {user ? (
          <>
            <span style={{marginRight:8}}>Hi, {user.username}</span>
            <button onClick={()=>{logout(); nav('/login');}}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" style={{marginLeft:8}}>Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
