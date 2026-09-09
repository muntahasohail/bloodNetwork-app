import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import Navbar from "../components/layout/Navbar";

const actions = [
  { icon:"🩸", label:"Register as Donor", desc:"Join our donor community",  path:"/donate",      color:"#dc2626", bg:"#fef2f2", border:"#fecaca" },
  { icon:"🚨", label:"Request Blood",      desc:"Post an urgent request",    path:"/requests",    color:"#ea580c", bg:"#fff7ed", border:"#fed7aa" },
  { icon:"🔍", label:"Search Donors",      desc:"Find available donors",     path:"/donors",      color:"#7c3aed", bg:"#faf5ff", border:"#ddd6fe" },
  { icon:"📄", label:"My Requests",        desc:"View & manage requests",    path:"/my-requests", color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc" },
];

const quickStats = [
  { icon:"💉", val:"A+",     label:"Blood Group" },
  { icon:"🏅", val:"3",      label:"Donations" },
  { icon:"❤️", val:"Active", label:"Status" },
  { icon:"📍", val:"Lahore", label:"City" },
];

export default function UserDashboard() {
  const { user } = useSelector((s) => s.auth);
  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes orbDrift {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(55px,-38px) scale(1.15); }
          66%      { transform:translate(-38px,28px) scale(0.88); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-60px,45px) scale(1.2); }
        }
        @keyframes gridMove {
          0%   { transform:translate3d(0,0,0); }
          100% { transform:translate3d(36px,36px,0); }
        }
        @keyframes pulse {
          0%,100% { box-shadow:0 0 0 0 rgba(220,38,38,0.35); }
          50%      { box-shadow:0 0 0 12px rgba(220,38,38,0); }
        }
        @keyframes shimmer {
          0%   { background-position:-400px 0; }
          100% { background-position:400px 0; }
        }
        @keyframes spinRing {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }

        .ud-card {
          background:#fff;
          border-radius:18px;
          padding:26px 22px;
          cursor:pointer;
          transition:all 0.25s cubic-bezier(.34,1.56,.64,1);
          animation:fadeUp 0.5s ease both;
          display:flex; flex-direction:column; gap:16px;
          position:relative; overflow:hidden;
          border:1.5px solid #f1f5f9;
          box-shadow:0 4px 20px rgba(0,0,0,0.05);
        }
        .ud-card:hover {
          transform:translateY(-8px) scale(1.02);
          box-shadow:0 20px 50px rgba(0,0,0,0.1);
        }
        .ud-stat-chip {
          background:#fff;
          border:1px solid #f1f5f9;
          border-radius:14px;
          padding:18px 16px;
          text-align:center;
          animation:fadeUp 0.5s ease both;
          transition:transform 0.22s, box-shadow 0.22s;
          box-shadow:0 2px 12px rgba(0,0,0,0.04);
        }
        .ud-stat-chip:hover { transform:translateY(-4px); box-shadow:0 10px 28px rgba(0,0,0,0.08); }
        .ud-logout {
          background:linear-gradient(135deg,#dc2626,#7f1d1d);
          color:#fff; border:none; border-radius:12px;
          padding:13px 36px; font-size:0.92rem; font-weight:800;
          cursor:pointer; letter-spacing:0.04em;
          transition:all 0.22s;
          box-shadow:0 6px 20px rgba(220,38,38,0.35);
          font-family:inherit;
        }
        .ud-logout:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(220,38,38,0.5); }
      `}</style>

      <Navbar />

      {/* Animated background */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden", background:"linear-gradient(160deg,#fafafa 0%,#fff5f5 50%,#f8f5ff 100%)" }}>
        <div style={{ position:"absolute", inset:"-36px", opacity:0.06, backgroundImage:"linear-gradient(rgba(220,38,38,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.15) 1px,transparent 1px)", backgroundSize:"36px 36px", animation:"gridMove 8s linear infinite" }} />
        <div style={{ position:"absolute", width:650, height:650, borderRadius:"50%", background:"radial-gradient(circle,rgba(220,38,38,0.07),transparent 70%)", top:"-180px", left:"-180px", animation:"orbDrift 14s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(127,29,29,0.05),transparent 70%)", bottom:"-130px", right:"-130px", animation:"orbDrift2 18s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.04),transparent 70%)", top:"40%", left:"55%", animation:"orbDrift 22s ease-in-out infinite reverse" }} />
      </div>

      <div style={{ position:"relative", zIndex:1, maxWidth:1040, margin:"0 auto", padding:"36px 24px 60px" }}>

        {/* Banner */}
        <div style={s.banner}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"28px 28px", borderRadius:20 }} />
          <div style={{ position:"absolute", width:160, height:160, borderRadius:"50%", border:"2px dashed rgba(255,255,255,0.12)", top:"50%", right:36, animation:"spinRing 10s linear infinite" }} />
          <div style={{ position:"absolute", width:220, height:220, borderRadius:"50%", border:"1px dashed rgba(255,255,255,0.07)", top:"50%", right:6, animation:"spinRing 16s linear infinite reverse" }} />

          <div style={{ display:"flex", alignItems:"center", gap:22, zIndex:1 }}>
            <div style={s.avatar}>
              <span style={{ fontSize:"1.5rem", fontWeight:900, color:"#dc2626" }}>{initials}</span>
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", animation:"pulse 2.5s ease-in-out infinite" }} />
            </div>
            <div>
              <p style={s.greeting}>Good day 👋</p>
              <h1 style={s.bannerName}>
                Welcome,{" "}
                <span style={{ background:"linear-gradient(90deg,#fca5a5,#fff,#fca5a5)", backgroundSize:"400px 100%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"shimmer 2.5s linear infinite" }}>
                  {user?.name ?? "User"}
                </span>
              </h1>
              <p style={s.bannerSub}>What would you like to do today?</p>
            </div>
          </div>
          <div style={s.bannerBadge}>🩸 Donor</div>
        </div>

        {/* Quick stats */}
        <div style={s.statsGrid}>
          {quickStats.map(({ icon, val, label }, i) => (
            <div className="ud-stat-chip" key={label} style={{ animationDelay:`${i*0.07}s` }}>
              <div style={{ fontSize:"1.4rem", marginBottom:6 }}>{icon}</div>
              <p style={{ color:"#0f172a", fontWeight:800, fontSize:"1.05rem", margin:"0 0 2px" }}>{val}</p>
              <p style={{ color:"#94a3b8", fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"0.08em", margin:0 }}>{label}</p>
            </div>
          ))}
        </div>

        <p style={s.sectionLabel}>⚡ Quick Actions</p>

        {/* Action cards */}
        <div style={s.grid}>
          {actions.map(({ icon, label, desc, path, color, bg, border }, i) => (
            <div key={label} className="ud-card"
              style={{ animationDelay:`${i*0.09}s`, borderColor:border }}
              onClick={() => navigate(path)}
            >
              <div style={{ position:"absolute", width:90, height:90, borderRadius:"50%", background:`radial-gradient(circle,${color}18,transparent 70%)`, bottom:-20, right:-20 }} />
              <div style={{ width:52, height:52, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", background:bg, border:`1.5px solid ${border}`, fontSize:"1.6rem" }}>
                {icon}
              </div>
              <div>
                <p style={{ fontWeight:800, fontSize:"1rem", color:"#0f172a", margin:"0 0 4px" }}>{label}</p>
                <p style={{ fontSize:"0.83rem", color:"#64748b", margin:0 }}>{desc}</p>
              </div>
              <span style={{ fontSize:"1rem", fontWeight:900, color, alignSelf:"flex-end", background:bg, width:30, height:30, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:`1.5px solid ${border}` }}>→</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ textAlign:"center", marginTop:12 }}>
          <button className="ud-logout" onClick={() => { dispatch(logoutUser()); navigate("/login"); }}>
            🚪 Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

const s = {
  banner: {
    background:"linear-gradient(135deg,#b91c1c 0%,#7f1d1d 55%,#3b0a0a 100%)",
    borderRadius:20, padding:"32px 36px",
    display:"flex", justifyContent:"space-between", alignItems:"center",
    marginBottom:24, position:"relative", overflow:"hidden",
    animation:"fadeUp 0.4s ease both",
    boxShadow:"0 12px 40px rgba(185,28,28,0.3)",
  },
  avatar: {
    width:68, height:68, borderRadius:"50%",
    background:"linear-gradient(135deg,#fff,#fecaca)",
    display:"flex", alignItems:"center", justifyContent:"center",
    flexShrink:0, position:"relative",
    boxShadow:"0 0 0 4px rgba(220,38,38,0.25)",
  },
  greeting:   { color:"rgba(255,255,255,0.65)", fontSize:"0.78rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 4px" },
  bannerName: { color:"#fff", fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:900, margin:"0 0 5px", letterSpacing:"-0.03em" },
  bannerSub:  { color:"rgba(255,255,255,0.75)", fontSize:"0.85rem", margin:0 },
  bannerBadge:{ background:"rgba(255,255,255,0.15)", color:"#fff", borderRadius:999, padding:"7px 18px", fontSize:"0.8rem", fontWeight:800, letterSpacing:"0.06em", border:"1px solid rgba(255,255,255,0.25)", backdropFilter:"blur(8px)", zIndex:1 },
  statsGrid:  { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:14, marginBottom:32 },
  sectionLabel:{ fontSize:"0.75rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", color:"#dc2626", marginBottom:16 },
  grid:       { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:18, marginBottom:36 },
};
