import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { fetchDonors, deleteDonor } from "../features/donors/donorSlice";
import { fetchRequests, deleteRequest } from "../features/requests/requestSlice";
import Navbar from "../components/layout/Navbar";

const TABS = ["Overview", "Donors", "Requests"];

const BLOOD_COLORS = {
  "A+": "#dc2626", "A-": "#b91c1c",
  "B+": "#2563eb", "B-": "#1d4ed8",
  "AB+": "#7c3aed", "AB-": "#6d28d9",
  "O+": "#059669", "O-": "#047857",
};

const DEFAULT_DONORS = [
  { id: "dd1", name: "Ali Hassan",      bloodGroup: "O+",  city: "Karachi",   contactNumber: "03001234567", available: true,  age: 25 },
  { id: "dd2", name: "Sara Khan",       bloodGroup: "A+",  city: "Lahore",    contactNumber: "03111234567", available: true,  age: 30 },
  { id: "dd3", name: "Usman Tariq",     bloodGroup: "B-",  city: "Islamabad", contactNumber: "03211234567", available: false, age: 28 },
  { id: "dd4", name: "Fatima Zahra",    bloodGroup: "AB+", city: "Peshawar",  contactNumber: "03311234567", available: true,  age: 22 },
  { id: "dd5", name: "Bilal Ahmed",     bloodGroup: "O-",  city: "Quetta",    contactNumber: "03411234567", available: true,  age: 35 },
  { id: "dd6", name: "Ayesha Siddiqui", bloodGroup: "A-",  city: "Multan",    contactNumber: "03511234567", available: false, age: 27 },
];

const DEFAULT_REQUESTS = [
  { id: "dr1", patientName: "Hassan Mirza",  bloodGroup: "O-",  hospitalName: "City Hospital",       city: "Karachi",   contactNumber: "03331234567", fulfilled: false, createdAt: "2025-07-01T10:00:00.000Z" },
  { id: "dr2", patientName: "Fatima Zahra",  bloodGroup: "B+",  hospitalName: "Life Care Hospital",  city: "Lahore",    contactNumber: "03441234567", fulfilled: false, createdAt: "2025-06-28T08:30:00.000Z" },
  { id: "dr3", patientName: "Usman Tariq",   bloodGroup: "A+",  hospitalName: "Shifa International", city: "Islamabad", contactNumber: "03211234567", fulfilled: true,  createdAt: "2025-07-03T09:00:00.000Z" },
  { id: "dr4", patientName: "Zara Malik",    bloodGroup: "AB-", hospitalName: "Aga Khan Hospital",   city: "Karachi",   contactNumber: "03551234567", fulfilled: false, createdAt: "2025-07-05T11:00:00.000Z" },
  { id: "dr5", patientName: "Kamran Sheikh", bloodGroup: "O+",  hospitalName: "PIMS Hospital",       city: "Islamabad", contactNumber: "03661234567", fulfilled: true,  createdAt: "2025-06-20T07:00:00.000Z" },
];

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((s) => s.auth);
  const { donors }     = useSelector((s) => s.donors);
  const { requests }   = useSelector((s) => s.requests);
  const [tab, setTab]  = useState("Overview");
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => { if (role && role !== "admin") navigate("/"); }, [role, navigate]);
  useEffect(() => { dispatch(fetchDonors()); dispatch(fetchRequests()); }, [dispatch]);

  const firestoreDonorIds   = new Set(donors.map((d) => d.id));
  const firestoreRequestIds = new Set(requests.map((r) => r.id));
  const allDonors   = [...DEFAULT_DONORS.filter((d) => !firestoreDonorIds.has(d.id)),   ...donors];
  const allRequests = [...DEFAULT_REQUESTS.filter((r) => !firestoreRequestIds.has(r.id)), ...requests];

  const bgDist = allDonors.reduce((acc, d) => {
    if (d.bloodGroup) acc[d.bloodGroup] = (acc[d.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  const handleDelete = ({ type, id }) => {
    if (type === "request") dispatch(deleteRequest(id));
    else dispatch(deleteDonor(id));
    setConfirmAction(null);
  };

  if (!user || role !== "admin") return null;

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbDrift1 {
          0%,100% { transform:translate(0,0) scale(1); }
          40%      { transform:translate(60px,-40px) scale(1.15); }
          70%      { transform:translate(-30px,30px) scale(0.88); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-60px,45px) scale(1.2); }
        }
        @keyframes orbDrift3 {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(35px,55px) scale(1.08); }
          66%      { transform:translate(-35px,-18px) scale(0.92); }
        }
        @keyframes spinRing {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes gridDrift {
          0%,100% { transform:translate3d(0,0,0); }
          50%      { transform:translate3d(-8px,6px,0); }
        }
        @keyframes shimmerBtn {
          0%   { background-position:-200px 0; }
          100% { background-position:200px 0; }
        }

        .adm-tab {
          padding:9px 20px; border-radius:10px; border:none; cursor:pointer;
          font-weight:700; font-size:0.85rem; transition:all 0.2s;
          letter-spacing:0.02em; font-family:inherit;
        }
        .adm-tab.active {
          background:linear-gradient(135deg,#dc2626,#991b1b);
          color:#fff; box-shadow:0 4px 16px rgba(220,38,38,0.4);
        }
        .adm-tab:not(.active) {
          background:#fff; color:#475569;
          border:1.5px solid #e2e8f0;
          box-shadow:0 2px 8px rgba(0,0,0,0.04);
        }
        .adm-tab:not(.active):hover { background:#fef2f2; color:#dc2626; border-color:#fecaca; }

        .stat-card {
          background:#fff; border-radius:16px; padding:24px 20px;
          border:1px solid #f1f5f9;
          box-shadow:0 4px 20px rgba(0,0,0,0.05);
          animation:fadeUp 0.35s ease both;
          transition:transform 0.22s, box-shadow 0.22s;
        }
        .stat-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(0,0,0,0.1); }

        .donor-card {
          background:#fff; border-radius:16px; overflow:hidden;
          border:1px solid #f1f5f9;
          box-shadow:0 4px 20px rgba(0,0,0,0.06);
          animation:fadeUp 0.35s ease both;
          transition:transform 0.22s, box-shadow 0.22s;
          display:flex; flex-direction:column;
        }
        .donor-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,0.1); }

        .req-card {
          background:#fff; border-radius:16px; overflow:hidden;
          border:1px solid #f1f5f9;
          box-shadow:0 4px 20px rgba(0,0,0,0.06);
          animation:fadeUp 0.35s ease both;
          transition:transform 0.22s, box-shadow 0.22s;
          display:flex; flex-direction:column;
        }
        .req-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,0.1); }

        .del-btn {
          background:#fef2f2; color:#dc2626; border:1.5px solid #fecaca;
          border-radius:8px; padding:7px 14px; font-weight:700;
          font-size:0.78rem; cursor:pointer; transition:all 0.18s;
          font-family:inherit;
        }
        .del-btn:hover { background:#dc2626; color:#fff; border-color:#dc2626; }

        .adm-overlay {
          position:fixed; inset:0; background:rgba(15,23,42,0.5);
          display:flex; align-items:center; justify-content:center;
          z-index:999; backdrop-filter:blur(4px);
          animation:fadeUp 0.2s ease;
        }
        .adm-modal {
          background:#fff; border-radius:20px; padding:40px 36px;
          max-width:360px; width:90%; text-align:center;
          box-shadow:0 24px 80px rgba(0,0,0,0.2);
          border:1px solid #f1f5f9;
        }
      `}</style>

      <Navbar />

      {/* Animated background */}
      <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none", background:"linear-gradient(160deg,#fafafa 0%,#fff5f5 50%,#f8f5ff 100%)" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(220,38,38,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.04) 1px,transparent 1px)", backgroundSize:"36px 36px", animation:"gridDrift 20s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(220,38,38,0.07),transparent 70%)", top:"-200px", left:"-200px", animation:"orbDrift1 14s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:550, height:550, borderRadius:"50%", background:"radial-gradient(circle,rgba(127,29,29,0.06),transparent 70%)", bottom:"-150px", right:"-150px", animation:"orbDrift2 18s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(185,28,28,0.05),transparent 70%)", top:"40%", left:"40%", animation:"orbDrift3 22s ease-in-out infinite" }} />
      </div>

      <div style={{ ...s.page, position:"relative", zIndex:1 }}>

        {/* Banner */}
        <div style={s.banner}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"28px 28px", borderRadius:20 }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={s.bannerTag}>🛡️ Admin Panel</div>
            <h1 style={s.bannerTitle}>Dashboard Overview</h1>
            <p style={s.bannerSub}>Full system control — donors, requests & statistics.</p>
          </div>
          <div style={{ position:"relative", zIndex:1, width:90, height:90, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:"3.2rem", opacity:0.3 }}>⚙️</span>
            <div style={{ position:"absolute", width:72, height:72, borderRadius:"50%", border:"2px dashed rgba(255,255,255,0.2)", top:"50%", left:"50%", animation:"spinRing 8s linear infinite" }} />
            <div style={{ position:"absolute", width:100, height:100, borderRadius:"50%", border:"1.5px dashed rgba(255,255,255,0.1)", top:"50%", left:"50%", animation:"spinRing 14s linear infinite reverse" }} />
          </div>
        </div>

        {/* Tabs + Logout */}
        <div style={{ display:"flex", gap:8, marginBottom:32, flexWrap:"wrap", alignItems:"center" }}>
          {TABS.map((t) => (
            <button key={t} className={`adm-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
              {t === "Overview" ? "📊" : t === "Donors" ? "🩸" : "🚨"} {t}
            </button>
          ))}
          <button style={s.logoutBtn} onClick={() => { dispatch(logoutUser()); navigate("/login"); }}>
            Sign Out
          </button>
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "Overview" && (
          <>
            <p style={s.sectionLabel}>Summary Statistics</p>
            <div style={s.statsGrid}>
              {[
                { icon:"🩸", label:"Total Donors",    value:allDonors.length,                              color:"#dc2626", bg:"#fef2f2" },
                { icon:"🚨", label:"Total Requests",  value:allRequests.length,                            color:"#b91c1c", bg:"#fff5f5" },
                { icon:"✅", label:"Active Requests", value:allRequests.filter((r) => !r.fulfilled).length, color:"#059669", bg:"#f0fdf4" },
                { icon:"✔️", label:"Fulfilled",       value:allRequests.filter((r) => r.fulfilled).length,  color:"#7c3aed", bg:"#faf5ff" },
              ].map(({ icon, label, value, color, bg }, i) => (
                <div className="stat-card" key={label} style={{ animationDelay:`${i*0.07}s` }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, border:`1px solid ${color}22` }}>
                    <span style={{ fontSize:"1.4rem" }}>{icon}</span>
                  </div>
                  <p style={{ fontSize:"2rem", fontWeight:900, color, margin:"0 0 4px", letterSpacing:"-0.03em" }}>{value}</p>
                  <p style={s.statLabel}>{label}</p>
                </div>
              ))}
            </div>

            <p style={{ ...s.sectionLabel, marginTop:36 }}>🩸 Blood Group Distribution</p>
            <div style={s.statsGrid}>
              {Object.entries(bgDist).sort().map(([bg, count], i) => {
                const color = BLOOD_COLORS[bg] || "#dc2626";
                return (
                  <div className="stat-card" key={bg} style={{ animationDelay:`${i*0.06}s`, display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:color+"15", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid ${color}30` }}>
                      <span style={{ fontWeight:900, fontSize:"0.95rem", color }}>{bg}</span>
                    </div>
                    <div>
                      <p style={{ fontSize:"1.7rem", fontWeight:900, color, margin:0, letterSpacing:"-0.03em" }}>{count}</p>
                      <p style={s.statLabel}>donors</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── DONORS ── */}
        {tab === "Donors" && (
          <>
            <p style={s.sectionLabel}>All Registered Donors ({allDonors.length})</p>
            <div style={s.cardsGrid}>
              {allDonors.map((d, i) => {
                const color = BLOOD_COLORS[d.bloodGroup] || "#dc2626";
                return (
                  <div className="donor-card" key={d.id} style={{ animationDelay:`${i*0.05}s` }}>
                    <div style={{ background:`linear-gradient(135deg,${color},${color}bb)`, padding:"20px 20px 16px", position:"relative", overflow:"hidden" }}>
                      <div style={{ position:"absolute", width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.1)", top:-20, right:-20 }} />
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative", zIndex:1 }}>
                        <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:10, padding:"5px 14px", backdropFilter:"blur(4px)" }}>
                          <span style={{ color:"#fff", fontWeight:900, fontSize:"1.4rem", letterSpacing:"0.02em" }}>{d.bloodGroup || "?"}</span>
                        </div>
                        <span style={{ background:d.available ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)", color:"#fff", fontSize:"0.72rem", fontWeight:700, padding:"4px 10px", borderRadius:20, border:"1px solid rgba(255,255,255,0.2)" }}>
                          {d.available ? "✅ Available" : "⏸ Unavailable"}
                        </span>
                      </div>
                      <p style={{ color:"#fff", fontWeight:800, fontSize:"1rem", margin:"12px 0 0", position:"relative", zIndex:1, textShadow:"0 1px 4px rgba(0,0,0,0.15)" }}>{d.name || d.fullName || "—"}</p>
                    </div>
                    <div style={{ padding:"16px 20px", flex:1, display:"flex", flexDirection:"column", gap:8 }}>
                      <div style={s.infoRow}><span style={s.infoIcon}>📍</span><span>{d.city || "—"}</span></div>
                      <div style={s.infoRow}><span style={s.infoIcon}>📞</span><span>{d.contactNumber || d.phone || "—"}</span></div>
                      {d.age && <div style={s.infoRow}><span style={s.infoIcon}>👤</span><span>{d.age} years old</span></div>}
                      <div style={{ marginTop:"auto", paddingTop:12, display:"flex", justifyContent:"flex-end" }}>
                        <button className="del-btn" onClick={() => setConfirmAction({ type:"donor", id:d.id })}>🗑 Delete</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── REQUESTS ── */}
        {tab === "Requests" && (
          <>
            <p style={s.sectionLabel}>🚨 Active Requests ({allRequests.filter((r) => !r.fulfilled).length})</p>
            <div style={s.cardsGrid}>
              {allRequests.filter((r) => !r.fulfilled).map((r, i) => (
                <RequestCard key={r.id} r={r} delay={i*0.05} onDelete={(id) => setConfirmAction({ type:"request", id })} />
              ))}
              {allRequests.filter((r) => !r.fulfilled).length === 0 && (
                <p style={{ color:"#94a3b8", fontSize:"0.9rem" }}>No active requests.</p>
              )}
            </div>

            <p style={{ ...s.sectionLabel, marginTop:36, color:"#64748b" }}>✔ Fulfilled Requests ({allRequests.filter((r) => r.fulfilled).length})</p>
            <div style={s.cardsGrid}>
              {allRequests.filter((r) => r.fulfilled).map((r, i) => (
                <RequestCard key={r.id} r={r} delay={i*0.05} onDelete={(id) => setConfirmAction({ type:"request", id })} />
              ))}
              {allRequests.filter((r) => r.fulfilled).length === 0 && (
                <p style={{ color:"#94a3b8", fontSize:"0.9rem" }}>No fulfilled requests yet.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {confirmAction && (
        <div className="adm-overlay" onClick={() => setConfirmAction(null)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ width:56, height:56, borderRadius:16, background:"#fef2f2", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:"1.8rem" }}>🗑️</div>
            <p style={{ fontWeight:800, fontSize:"1.1rem", margin:"0 0 8px", color:"#0f172a" }}>
              {confirmAction.type === "request" ? "Delete Request?" : "Delete Donor?"}
            </p>
            <p style={{ color:"#64748b", fontSize:"0.85rem", margin:"0 0 28px", lineHeight:1.6 }}>
              This will permanently remove the entry. This action cannot be undone.
            </p>
            <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button style={s.cancelBtn} onClick={() => setConfirmAction(null)}>Cancel</button>
              <button style={s.confirmBtn} onClick={() => handleDelete(confirmAction)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function RequestCard({ r, delay, onDelete }) {
  const color = r.fulfilled ? "#94a3b8" : (BLOOD_COLORS[r.bloodGroup] || "#dc2626");
  return (
    <div className="req-card" style={{ animationDelay:`${delay}s` }}>
      <div style={{ background:`linear-gradient(135deg,${color},${color}bb)`, padding:"20px 20px 16px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.1)", top:-20, right:-20 }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative", zIndex:1 }}>
          <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:10, padding:"5px 14px", backdropFilter:"blur(4px)" }}>
            <span style={{ color:"#fff", fontWeight:900, fontSize:"1.3rem" }}>{r.bloodGroup || "?"}</span>
          </div>
          <span style={{ background:r.fulfilled ? "rgba(255,255,255,0.22)" : "rgba(220,38,38,0.35)", color:"#fff", fontSize:"0.72rem", fontWeight:700, padding:"4px 10px", borderRadius:20, border:"1px solid rgba(255,255,255,0.2)" }}>
            {r.fulfilled ? "✔ Fulfilled" : "🚨 Urgent"}
          </span>
        </div>
        <p style={{ color:"#fff", fontWeight:800, fontSize:"1rem", margin:"12px 0 0", position:"relative", zIndex:1 }}>{r.patientName || "—"}</p>
      </div>
      <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:8 }}>
        <div style={s.infoRow}><span style={s.infoIcon}>🏥</span><span>{r.hospitalName || "—"}</span></div>
        <div style={s.infoRow}><span style={s.infoIcon}>📍</span><span>{r.city || "—"}</span></div>
        <div style={s.infoRow}><span style={s.infoIcon}>📞</span><span>{r.contactNumber || "—"}</span></div>
        {r.createdAt && <div style={s.infoRow}><span style={s.infoIcon}>📅</span><span>{new Date(r.createdAt).toLocaleDateString()}</span></div>}
        <div style={{ marginTop:"auto", paddingTop:12, display:"flex", justifyContent:"flex-end" }}>
          <button className="del-btn" onClick={() => onDelete(r.id)}>🗑 Delete</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:        { maxWidth:1200, margin:"0 auto", padding:"36px 24px 60px" },
  banner:      { background:"linear-gradient(135deg,#b91c1c 0%,#7f1d1d 55%,#3b0a0a 100%)", borderRadius:20, padding:"32px 36px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32, boxShadow:"0 12px 40px rgba(185,28,28,0.3)", overflow:"hidden", position:"relative" },
  bannerTag:   { color:"rgba(255,255,255,0.7)", fontSize:"0.75rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 8px" },
  bannerTitle: { color:"#fff", fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:900, margin:"0 0 6px", letterSpacing:"-0.03em" },
  bannerSub:   { color:"rgba(255,255,255,0.75)", fontSize:"0.88rem", margin:0 },
  sectionLabel:{ fontSize:"0.75rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", color:"#dc2626", margin:"0 0 16px" },
  statsGrid:   { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))", gap:16, marginBottom:8 },
  cardsGrid:   { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:18, marginBottom:12 },
  statLabel:   { fontSize:"0.72rem", color:"#94a3b8", fontWeight:700, margin:0, textTransform:"uppercase", letterSpacing:"0.07em" },
  infoRow:     { display:"flex", alignItems:"center", gap:10, fontSize:"0.85rem", color:"#475569" },
  infoIcon:    { fontSize:"0.95rem", flexShrink:0, width:20, textAlign:"center" },
  logoutBtn:   { marginLeft:"auto", background:"linear-gradient(135deg,#dc2626,#991b1b)", border:"none", borderRadius:10, padding:"9px 20px", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:"0.85rem", boxShadow:"0 4px 14px rgba(220,38,38,0.3)", fontFamily:"inherit" },
  cancelBtn:   { background:"#f8fafc", border:"1.5px solid #e2e8f0", borderRadius:10, padding:"11px 24px", fontWeight:700, cursor:"pointer", color:"#475569", fontSize:"0.88rem", fontFamily:"inherit" },
  confirmBtn:  { background:"linear-gradient(135deg,#dc2626,#991b1b)", border:"none", borderRadius:10, padding:"11px 24px", fontWeight:700, cursor:"pointer", color:"#fff", fontSize:"0.88rem", boxShadow:"0 4px 14px rgba(220,38,38,0.3)", fontFamily:"inherit" },
};
