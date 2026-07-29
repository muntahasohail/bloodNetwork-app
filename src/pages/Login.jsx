import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { BiFontFamily } from "react-icons/bi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((s) => s.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter email and password");
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate(result.payload.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes floatDrop {
          0%,100% { transform:translateY(0) rotate(0deg); }
          50%      { transform:translateY(-18px) rotate(8deg); }
        }
        .auth-input {
          width:100%; padding:14px 16px; border-radius:12px;
          border:1.5px solid #e5e7eb; font-size:0.95rem;
          outline:none; transition:border-color 0.2s, box-shadow 0.2s;
          background:#fafafa; box-sizing:border-box;
        }
        .auth-input:focus { border-color:#dc2626; box-shadow:0 0 0 3px rgba(220,38,38,0.1); background:#fff; }
        .auth-btn {
          width:100%; padding:15px; border-radius:12px; border:none;
          background:linear-gradient(135deg,#dc2626,#991b1b);
          color:#fff; font-size:1rem; font-weight:800; cursor:pointer;
          box-shadow:0 8px 24px rgba(220,38,38,0.35);
          transition:transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          letter-spacing:0.03em;
        }
        .auth-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(220,38,38,0.4); }
        .auth-btn:disabled { opacity:0.6; cursor:not-allowed; }
      `}</style>

      <div style={s.page}>
        {/* Left panel */}
        <div style={s.left}>
          <span style={s.floatDrop1}>🩸</span>
          <span style={s.floatDrop2}>🩸</span>
          <span style={s.floatDrop3}>❤️</span>
          <div style={s.leftContent}>
            <div style={s.brandRow}>
              <span style={s.brandIcon}>🩸</span>
              <span style={{color:"#ffff" , fontSize:"2.6rem", fontWeight:900, color:"#fff", letterSpacing:"0.02em" }}>Blood Network</span>
            </div>
            <h2 style={s.leftHeading}>Save Lives.<br/>Donate Blood.</h2>
            <p style={s.leftSub}>Pakistan's first AI-powered blood donation network. Connecting donors and patients in minutes.</p>
            <div style={s.leftStats}>
              {[["10K+","Lives Saved"],["3 min","Avg Match"],["50+","Cities"]].map(([v,l])=>(
                <div key={l} style={s.statItem}>
                  <span style={s.statVal}>{v}</span>
                  <span style={s.statLbl}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={s.right}>
          <div style={s.card}>
            <h1 style={s.cardTitle}>Welcome back 👋</h1>
            <p style={s.cardSub}>Sign in to your BloodNetwork account</p>

            <form onSubmit={handleLogin} style={s.form}>
              <div style={s.fieldWrap}>
                <label style={s.label}>Email Address</label>
                <input className="auth-input" type="email" placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div style={s.fieldWrap}>
                <label style={s.label}>Password</label>
                <input className="auth-input" type="password" placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {isError && <p style={s.error}>{message}</p>}
              <button className="auth-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "🩸 Sign In"}
              </button>
            </form>

            <p style={s.switchText}>
              Don't have an account?{" "}
              <Link to="/register" style={s.switchLink}>Create one →</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const s = {
  page:       { display:"flex", minHeight:"100vh" },
  left:       { flex:1, background:"linear-gradient(135deg,#dc2626 0%,#7f1d1d 60%,#450a0a 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 48px", position:"relative", overflow:"hidden" },
  leftContent:{ position:"relative", zIndex:1, maxWidth:400 },
  brandRow:   { display:"flex", alignItems:"center", gap:10, marginBottom:32 },
  brandIcon:  { fontSize:"2.2rem", filter:"drop-shadow(0 0 10px rgba(255,255,255,0.4))" },
  brandName:  { fontSize:"2.2rem", fontWeight:900, color:"#fff",fontFamily: "'Bodoni Moda SC', serif", letterSpacing:"0.02em" },
  leftHeading:{ fontSize:"2.3rem", fontWeight:900, color:"#fff", lineHeight:1.2, margin:"0 0 16px", letterSpacing:"-0.02em" },
  leftSub:    { fontSize:"1.4rem", color:"rgba(255,255,255,0.75)", lineHeight:1.75, margin:"0 0 36px" },
  leftStats:  { display:"flex", gap:32 },
  statItem:   { display:"flex", flexDirection:"column", gap:2 },
  statVal:    { fontSize:"1.8rem", fontWeight:900, color:"#fff" },
  statLbl:    { fontSize:"0.95rem", color:"rgba(255,255,255,0.6)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.07em" },
  floatDrop1: { position:"absolute", top:"10%", right:"8%", fontSize:"3rem", opacity:0.12, animation:"floatDrop 4s ease-in-out infinite" },
  floatDrop2: { position:"absolute", bottom:"15%", left:"5%", fontSize:"2rem", opacity:0.1, animation:"floatDrop 5s ease-in-out infinite" },
  floatDrop3: { position:"absolute", top:"50%", right:"15%", fontSize:"1.5rem", opacity:0.1, animation:"floatDrop 3.5s ease-in-out infinite" },
  right:      { flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"#fafafa", padding:"40px 24px" },
  card:       { background:"#fff", borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:440, boxShadow:"0 8px 48px rgba(0,0,0,0.1)", animation:"fadeUp 0.5s ease" },
  cardTitle:  { fontSize:"1.8rem", fontWeight:900, color:"#111827", margin:"0 0 6px", letterSpacing:"-0.02em" },
  cardSub:    { fontSize:"0.95rem", color:"#6b7280", margin:"0 0 32px" },
  form:       { display:"flex", flexDirection:"column", gap:20 },
  fieldWrap:  { display:"flex", flexDirection:"column", gap:6 },
  label:      { fontSize:"0.85rem", fontWeight:700, color:"#374151" },
  error:      { background:"#fef2f2", border:"1px solid #fecaca", color:"#dc2626", borderRadius:8, padding:"10px 14px", fontSize:"0.85rem", margin:0 },
  switchText: { textAlign:"center", fontSize:"0.9rem", color:"#6b7280", marginTop:24 },
  switchLink: { color:"#dc2626", fontWeight:700, textDecoration:"none" },
};
