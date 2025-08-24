

const API_BASE = 'http://localhost:4000';
export function getToken() { return localStorage.getItem('token'); }
export function setToken(t) { localStorage.setItem('token', t); }
export function clearToken() { localStorage.removeItem('token'); }
async function request(path, { method = 'GET', body, auth } = {}) {
  const headers = {};

  if (!(body instanceof FormData)) 
    headers['Content-Type'] = 'application/json';
  if (auth) headers['Authorization'] = `Bearer ${getToken()}`;
  const res = await fetch(`${API_BASE}${path}`, { 
    method, headers, body: body && !(body instanceof FormData) ? JSON.stringify(body) : body 
  });

  console.log("get Token :   " + getToken());
  if (!res.ok) 
    throw new Error((await res.json()).error || 'Request failed');
  return res.json();
}
export const api = {
  signup: (d) => request('/api/auth/signup', { method: 'POST', body: d }),
  signin: (d) => request('/api/auth/signin', { method: 'POST', body: d }),
  latest: (p=1) => request(`/api/feed/latest?page=${p}&limit=20`),
  popular: (p=1) => request(`/api/feed/popular?page=${p}&limit=20`),
  search: (q, p=1) => request(`/api/search?q=${encodeURIComponent(q)}&page=${p}`),
  like: (id) => request(`/api/photos/${id}/like`, { method: 'POST', auth: true }),
  unlike: (id) => request(`/api/photos/${id}/unlike`, { method: 'POST', auth: true }),
};
