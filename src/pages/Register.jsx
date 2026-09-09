import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((s) => s.auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Please fill all fields");
    const result = await dispatch(registerUser({ name, email, password, role: "user" }));
    if (registerUser.fulfilled.match(result)) navigate("/user/dashboard");
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes meshMove {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(40px,-30px) scale(1.1); }
          66%      { transform:translate(-30px,20px) scale(0.95); }
        }
        @keyframes meshMove2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-50px,40px) scale(1.15); }
        }
        @keyframes floatDrop {
          0%,100% { transform:translateY(0) rotate(0deg); opacity:0.15; }
          50%      { transform:translateY(-20px) rotate(10deg); opacity:0.25; }
        }
        @keyframes shimmerLine {
          0%   { background-position:0% 50%; }
          100% { background-position:200% 50%; }
        }
        .auth-input {
          width:100%; padding:13px 16px; border-radius:12px;
          border:1.5px solid #e2e8f0; font-size:0.92rem;
          outline:none; transition:all 0.22s;
          background:#f8fafc; box-sizing:border-box;
          color:#0f172a; font-family:inherit;
        }
        .auth-input:focus {
          border-color:#dc2626;
          box-shadow:0 0 0 4px rgba(220,38,38,0.08);
          background:#fff;
        }
        .auth-input::placeholder { color:#94a3b8; }
        .auth-btn {
          width:100%; padding:14px; border-radius:12px; border:none;
          background:linear-gradient(135deg,#dc2626 0%,#991b1b 100%);
          color:#fff; font-size:0.95rem; font-weight:800; cursor:pointer;
          box-shadow:0 6px 20px rgba(220,38,38,0.35);
          transition:all 0.22s; letter-spacing:0.04em;
          position:relative; overflow:hidden; font-family:inherit;
        }
        .auth-btn::after {
          content:""; position:absolute; top:0; left:0; right:0; bottom:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent);
          transform:translateX(-100%); transition:transform 0.5s;
        }
        .auth-btn:hover::after { transform:translateX(100%); }
        .auth-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 28px rgba(220,38,38,0.45); }
        .auth-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .auth-input-wrap { position:relative; }
        .pass-toggle {
          position:absolute; right:14px; top:50%; transform:translateY(-50%);
          background:none; border:none; cursor:pointer; color:#94a3b8;
          font-size:0.85rem; padding:0; transition:color 0.2s;
        }
        .pass-toggle:hover { color:#dc2626; }
      `}</style>

      <div style={s.page}>
        {/* Left panel */}
        <div style={s.left}>
          <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.12),transparent 70%)", top:"-100px", left:"-100px", animation:"meshMove 14s ease-in-out infinite" }} />
          <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.08),transparent 70%)", bottom:"-80px", right:"-80px", animation:"meshMove2 18s ease-in-out infinite" }} />
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"36px 36px", opacity:0.5 }} />

          <span style={{ position:"absolute", top:"8%", right:"10%", fontSize:"3.5rem", animation:"floatDrop 4s ease-in-out infinite" }}>🩸</span>
          <span style={{ position:"absolute", bottom:"12%", left:"6%", fontSize:"2.2rem", animation:"floatDrop 5.5s ease-in-out infinite" }}>🩸</span>
          <span style={{ position:"absolute", top:"52%", right:"18%", fontSize:"1.6rem", animation:"floatDrop 3.5s ease-in-out infinite" }}>❤️</span>

          <div style={s.leftContent}>
            <div style={s.brandRow}>
              <span style={{ fontSize:"2rem" }}>🩸</span>
              <span style={{ fontSize:"1.6rem", fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>Blood Network</span>
            </div>
            <h2 style={s.leftHeading}>Join the<br/>Life-Saving<br/>Community.</h2>
            <p style={s.leftSub}>Register today and become a hero. Your blood can save up to 3 lives with a single donation.</p>
            <div style={s.perks}>
              {["🩸 Free donor registration","📍 Location-based matching","🔒 Your data stays private","🚨 Get emergency alerts"].map(p => (
                <div key={p} style={s.perk}>{p}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={s.right}>
          <div style={s.card}>
            <div style={{ height:3, background:"linear-gradient(90deg,#dc2626,#f87171,#dc2626)", borderRadius:"12px 12px 0 0", margin:"-48px -40px 40px", backgroundSize:"200% 100%", animation:"shimmerLine 2s linear infinite" }} />

            <div style={{ marginBottom:28 }}>
              <h1 style={s.cardTitle}>Create account 🎉</h1>
              <p style={s.cardSub}>Start saving lives today</p>
            </div>

            <form onSubmit={handleSignup} style={s.form}>
              <div style={s.fieldWrap}>
                <label style={s.label}>Full Name</label>
                <input className="auth-input" type="text" placeholder="Muhammad Ali"
                  value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div style={s.fieldWrap}>
                <label style={s.label}>Email Address</label>
                <input className="auth-input" type="email" placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div style={s.fieldWrap}>
                <label style={s.label}>Password</label>
                <div className="auth-input-wrap">
                  <input className="auth-input" type={showPass ? "text" : "password"} placeholder="Min. 6 characters"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight:44 }} />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(p => !p)}>
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {isError && (
                <div style={s.error}><span>⚠️</span> {message}</div>
              )}
              <button className="auth-btn" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account…" : "🩸 Create Account"}
              </button>
            </form>

            <div style={s.divider}><span>or</span></div>

            <p style={s.switchText}>
              Already have an account?{" "}
              <Link to="/login" style={s.switchLink}>Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const s = {
  page:       { display:"flex", minHeight:"100vh" },
  left:       { flex:1, background:"linear-gradient(145deg,#dc2626 0%,#7f1d1d 55%,#3b0a0a 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 48px", position:"relative", overflow:"hidden" },
  leftContent:{ position:"relative", zIndex:1, maxWidth:380 },
  brandRow:   { display:"flex", alignItems:"center", gap:10, marginBottom:36 },
  leftHeading:{ fontSize:"2.4rem", fontWeight:900, color:"#fff", lineHeight:1.15, margin:"0 0 18px", letterSpacing:"-0.03em" },
  leftSub:    { fontSize:"1rem", color:"rgba(255,255,255,0.72)", lineHeight:1.8, margin:"0 0 28px" },
  perks:      { display:"flex", flexDirection:"column", gap:10 },
  perk:       { fontSize:"0.88rem", color:"rgba(255,255,255,0.88)", fontWeight:600, background:"rgba(255,255,255,0.1)", borderRadius:10, padding:"10px 16px", border:"1px solid rgba(255,255,255,0.15)", backdropFilter:"blur(4px)" },
  right:      { flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(160deg,#fafafa 0%,#fff5f5 100%)", padding:"40px 24px" },
  card:       { background:"#fff", borderRadius:20, padding:"48px 40px", width:"100%", maxWidth:420, boxShadow:"0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(220,38,38,0.06)", animation:"fadeUp 0.5s ease", border:"1px solid #f1f5f9" },
  cardTitle:  { fontSize:"1.65rem", fontWeight:900, color:"#0f172a", margin:"0 0 6px", letterSpacing:"-0.03em" },
  cardSub:    { fontSize:"0.88rem", color:"#64748b", margin:0 },
  form:       { display:"flex", flexDirection:"column", gap:18 },
  fieldWrap:  { display:"flex", flexDirection:"column", gap:6 },
  label:      { fontSize:"0.82rem", fontWeight:700, color:"#374151", letterSpacing:"0.02em" },
  error:      { display:"flex", alignItems:"center", gap:8, background:"#fef2f2", border:"1px solid #fecaca", color:"#dc2626", borderRadius:10, padding:"10px 14px", fontSize:"0.85rem" },
  divider:    { display:"flex", alignItems:"center", gap:12, margin:"20px 0 16px", color:"#cbd5e1", fontSize:"0.8rem", fontWeight:600 },
  switchText: { textAlign:"center", fontSize:"0.88rem", color:"#64748b" },
  switchLink: { color:"#dc2626", fontWeight:800, textDecoration:"none" },
};
