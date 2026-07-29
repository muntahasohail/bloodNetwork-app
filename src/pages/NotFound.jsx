import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={s.page}>
      <span style={s.drop}>🩸</span>
      <h1 style={s.code}>404</h1>
      <h2 style={s.title}>Page Not Found</h2>
      <p style={s.sub}>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" style={s.btn}>← Back to Home</Link>
    </div>
  );
}

const s = {
  page:  { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#fff5f5,#fff)", textAlign:"center", padding:24 },
  drop:  { fontSize:"4rem", marginBottom:8 },
  code:  { fontSize:"7rem", fontWeight:900, color:"#dc2626", margin:"0 0 8px", lineHeight:1, letterSpacing:"-0.04em" },
  title: { fontSize:"1.8rem", fontWeight:800, color:"#111827", margin:"0 0 12px" },
  sub:   { fontSize:"1rem", color:"#6b7280", margin:"0 0 32px", maxWidth:360, lineHeight:1.7 },
  btn:   { background:"linear-gradient(135deg,#dc2626,#991b1b)", color:"#fff", textDecoration:"none", borderRadius:999, padding:"14px 32px", fontWeight:800, fontSize:"0.95rem", boxShadow:"0 8px 24px rgba(220,38,38,0.3)" },
};
