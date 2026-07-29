import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import Navbar from "../components/layout/Navbar";

const actions = [
  { icon: "🩸", label: "Register as Donor", desc: "Join our donor community",  path: "/donate",      color: "#ef4444", glow: "rgba(239,68,68,0.35)" },
  { icon: "🚨", label: "Request Blood",      desc: "Post an urgent request",    path: "/requests",    color: "#f97316", glow: "rgba(249,115,22,0.35)" },
  { icon: "🔍", label: "Search Donors",      desc: "Find available donors",     path: "/donors",      color: "#a855f7", glow: "rgba(168,85,247,0.35)" },
  { icon: "📄", label: "My Requests",        desc: "View & manage requests",    path: "/my-requests", color: "#06b6d4", glow: "rgba(6,182,212,0.35)" },
];

const quickStats = [
  { icon: "💉", val: "A+",    label: "Blood Group" },
  { icon: "🏅", val: "3",     label: "Donations" },
  { icon: "❤️", val: "Active", label: "Status" },
  { icon: "📍", val: "Lahore", label: "City" },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 10 + 4,
  top: Math.random() * 100,
  left: Math.random() * 100,
  dur: Math.random() * 10 + 8,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.18 + 0.06,
}));

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
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes floatUp {
          0%   { transform:translateY(0px) rotate(0deg); opacity:0.12; }
          50%  { transform:translateY(-60px) rotate(180deg); opacity:0.22; }
          100% { transform:translateY(-120px) rotate(360deg); opacity:0; }
        }
        @keyframes orbDrift {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(60px,-40px) scale(1.2); }
          66%      { transform:translate(-40px,30px) scale(0.85); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-70px,50px) scale(1.25); }
        }
        @keyframes spinRing {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes spinRingRev {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(-360deg); }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
          50%      { box-shadow: 0 0 0 14px rgba(220,38,38,0); }
        }
        @keyframes shimmer {
          0%   { background-position:-400px 0; }
          100% { background-position:400px 0; }
        }
        @keyframes gridMove {
          0%   { transform:translate3d(0,0,0); }
          100% { transform:translate3d(34px,34px,0); }
        }

        .ud-card {
          background: #fff;
          border: 1.5px solid #fee2e2;
          border-radius: 22px;
          padding: 28px 24px;
          cursor: pointer;
          backdrop-filter: blur(14px);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s, background 0.25s;
          animation: fadeUp 0.5s ease both;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
        }
        .ud-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 22px;
          opacity: 0;
          transition: opacity 0.3s;
          background: linear-gradient(135deg, rgba(255,255,255,0.07), transparent);
        }
        .ud-card:hover::after { opacity: 1; }
        .ud-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: #fca5a5;
          background: #fff7f7;
        }

        .ud-stat-chip {
          background: #fff;
          border: 1px solid #fee2e2;
          border-radius: 16px;
          padding: 18px 20px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: fadeUp 0.5s ease both;
          transition: transform 0.2s, background 0.2s;
        }
        .ud-stat-chip:hover {
          transform: translateY(-4px);
          background: #fff7f7;
        }

        .ud-logout {
          background: linear-gradient(135deg, #dc2626, #7f1d1d);
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 14px 40px;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px rgba(220,38,38,0.35);
        }
        .ud-logout:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(220,38,38,0.5);
        }
      `}</style>

      <Navbar />

      {/* ── Animated background ── */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden",
                    background:"#fff" }}>

        {/* Moving grid */}
        <div style={{ position:"absolute", inset:"-34px", opacity:0.07,
          backgroundImage:"linear-gradient(rgba(220,38,38,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.12) 1px,transparent 1px)",
          backgroundSize:"34px 34px", animation:"gridMove 6s linear infinite" }} />

        {/* Glowing orbs */}
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(220,38,38,0.07),transparent 70%)",
          top:"-150px", left:"-150px", animation:"orbDrift 12s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(127,29,29,0.05),transparent 70%)",
          bottom:"-120px", right:"-120px", animation:"orbDrift2 15s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(239,68,68,0.05),transparent 70%)",
          top:"45%", left:"55%", animation:"orbDrift 20s ease-in-out infinite reverse" }} />

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <div key={p.id} style={{
            position:"absolute",
            width: p.size, height: p.size,
            borderRadius:"50%",
            background:"rgba(220,38,38,0.2)",
            top:`${p.top}%`, left:`${p.left}%`,
            opacity: p.opacity,
            animation:`floatUp ${p.dur}s ${p.delay}s ease-in infinite`,
          }} />
        ))}
      </div>

      {/* ── Page content ── */}
      <div style={{ position:"relative", zIndex:1, maxWidth:1040, margin:"0 auto", padding:"40px 24px 60px" }}>

        {/* ── Banner ── */}
        <div style={s.banner}>
          {/* Spinning rings */}
          <div style={{ position:"absolute", width:160, height:160, borderRadius:"50%",
            border:"2px dashed rgba(255,255,255,0.15)",
            top:"50%", right:40, animation:"spinRing 10s linear infinite" }} />
          <div style={{ position:"absolute", width:220, height:220, borderRadius:"50%",
            border:"1px dashed rgba(255,255,255,0.08)",
            top:"50%", right:10, animation:"spinRingRev 16s linear infinite" }} />

          <div style={{ display:"flex", alignItems:"center", gap:24, zIndex:1 }}>
            {/* Avatar */}
            <div style={s.avatar}>
              <span style={{ fontSize:"1.6rem", fontWeight:900, color:"#dc2626" }}>{initials}</span>
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", animation:"pulse 2.5s ease-in-out infinite" }} />
            </div>
            <div>
              <p style={s.greeting}>Good day 👋</p>
              <h1 style={s.bannerName}>
                Welcome,{" "}
                <span style={{ background:"linear-gradient(90deg,#fca5a5,#fff,#fca5a5)", backgroundSize:"400px 100%",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                  animation:"shimmer 2.5s linear infinite" }}>
                  {user?.name ?? "User"}
                </span>
              </h1>
              <p style={s.bannerSub}>What would you like to do today?</p>
            </div>
          </div>

          <div style={s.bannerBadge}>🩸 Donor</div>
        </div>

        {/* ── Quick stats strip ── */}
        <div style={s.statsGrid}>
          {quickStats.map(({ icon, val, label }, i) => (
            <div className="ud-stat-chip" key={label} style={{ animationDelay:`${i*0.07}s` }}>
              <div style={{ fontSize:"1.5rem", marginBottom:6 }}>{icon}</div>
              <p style={{ color:"#111827", fontWeight:800, fontSize:"1.1rem", margin:"0 0 2px" }}>{val}</p>
              <p style={{ color:"#9ca3af", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.07em", margin:0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* ── Section label ── */}
        <p style={s.sectionLabel}>⚡ Quick Actions</p>

        {/* ── Action cards ── */}
        <div style={s.grid}>
          {actions.map(({ icon, label, desc, path, color, glow }, i) => (
            <div key={label} className="ud-card"
              style={{ animationDelay:`${i*0.09}s` }}
              onClick={() => navigate(path)}
            >
              {/* Glow blob */}
              <div style={{ position:"absolute", width:100, height:100, borderRadius:"50%",
                background:`radial-gradient(circle,${glow},transparent 70%)`,
                bottom:-20, right:-20, pointerEvents:"none" }} />

              <div style={{ width:54, height:54, borderRadius:16, display:"flex",
                alignItems:"center", justifyContent:"center",
                background:`linear-gradient(135deg,${color}22,${color}44)`,
                border:`1.5px solid ${color}55`, fontSize:"1.7rem" }}>
                {icon}
              </div>

              <div>
                <p style={{ fontWeight:800, fontSize:"1.08rem", color:"#111827", margin:"0 0 5px" }}>{label}</p>
                <p style={{ fontSize:"0.85rem", color:"#6b7280", margin:0 }}>{desc}</p>
              </div>

              <span style={{ fontSize:"1.2rem", fontWeight:900, color, alignSelf:"flex-end",
                background:`linear-gradient(135deg,${color}22,${color}44)`,
                width:32, height:32, borderRadius:"50%", display:"flex",
                alignItems:"center", justifyContent:"center" }}>→</span>
            </div>
          ))}
        </div>

        {/* ── Logout ── */}
        <div style={{ textAlign:"center", marginTop:16 }}>
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
    background: "linear-gradient(135deg,#b91c1c 0%,#7f1d1d 60%,#450a0a 100%)",
    border: "1.5px solid #991b1b",
    borderRadius: 24,
    padding: "36px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    backdropFilter: "blur(16px)",
    position: "relative",
    overflow: "hidden",
    animation: "fadeUp 0.4s ease both",
  },
  avatar: {
    width: 72, height: 72,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#fff,#fecaca)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    position: "relative",
    boxShadow: "0 0 0 4px rgba(220,38,38,0.3)",
  },
  greeting: {
    color: "#fff", fontSize: "0.85rem",
    fontWeight: 600, textTransform: "uppercase",
    letterSpacing: "0.08em", margin: "0 0 4px",
  },
  bannerName: {
    color: "#fff", fontSize: "clamp(1.6rem,3vw,2.2rem)",
    fontWeight: 900, margin: "0 0 6px", letterSpacing: "-0.02em",
  },
  bannerSub: {
    color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", margin: 0,
  },
  bannerBadge: {
    background: "linear-gradient(135deg,#dc2626,#7f1d1d)",
    color: "#fff", borderRadius: 999,
    padding: "8px 20px", fontSize: "0.82rem",
    fontWeight: 800, letterSpacing: "0.06em",
    boxShadow: "0 4px 16px rgba(220,38,38,0.4)",
    zIndex: 1,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
    gap: 16, marginBottom: 36,
  },
  sectionLabel: {
    fontSize: "0.99rem", fontWeight: 800,
    textTransform: "uppercase", letterSpacing: "0.12em",
    color: "#dc2626", marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: 20, marginBottom: 40,
  },
};
