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
  { id: "dd1", name: "Ali Hassan",     bloodGroup: "O+", city: "Karachi",   contactNumber: "03001234567", available: true,  age: 25 },
  { id: "dd2", name: "Sara Khan",      bloodGroup: "A+", city: "Lahore",    contactNumber: "03111234567", available: true,  age: 30 },
  { id: "dd3", name: "Usman Tariq",    bloodGroup: "B-", city: "Islamabad", contactNumber: "03211234567", available: false, age: 28 },
  { id: "dd4", name: "Fatima Zahra",   bloodGroup: "AB+",city: "Peshawar",  contactNumber: "03311234567", available: true,  age: 22 },
  { id: "dd5", name: "Bilal Ahmed",    bloodGroup: "O-", city: "Quetta",    contactNumber: "03411234567", available: true,  age: 35 },
  { id: "dd6", name: "Ayesha Siddiqui",bloodGroup: "A-", city: "Multan",    contactNumber: "03511234567", available: false, age: 27 },
];

const DEFAULT_REQUESTS = [
  { id: "dr1", patientName: "Hassan Mirza",   bloodGroup: "O-", hospitalName: "City Hospital",       city: "Karachi",   contactNumber: "03331234567", fulfilled: false, createdAt: "2025-07-01T10:00:00.000Z" },
  { id: "dr2", patientName: "Fatima Zahra",   bloodGroup: "B+", hospitalName: "Life Care Hospital",  city: "Lahore",    contactNumber: "03441234567", fulfilled: false, createdAt: "2025-06-28T08:30:00.000Z" },
  { id: "dr3", patientName: "Usman Tariq",    bloodGroup: "A+", hospitalName: "Shifa International", city: "Islamabad", contactNumber: "03211234567", fulfilled: true,  createdAt: "2025-07-03T09:00:00.000Z" },
  { id: "dr4", patientName: "Zara Malik",     bloodGroup: "AB-",hospitalName: "Aga Khan Hospital",   city: "Karachi",   contactNumber: "03551234567", fulfilled: false, createdAt: "2025-07-05T11:00:00.000Z" },
  { id: "dr5", patientName: "Kamran Sheikh",  bloodGroup: "O+", hospitalName: "PIMS Hospital",       city: "Islamabad", contactNumber: "03661234567", fulfilled: true,  createdAt: "2025-06-20T07:00:00.000Z" },
];

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((s) => s.auth);
  const { donors }   = useSelector((s) => s.donors);
  const { requests } = useSelector((s) => s.requests);
  const [tab, setTab] = useState("Overview");
  const [confirmAction, setConfirmAction] = useState(null);

  // ADMIN-01: role guard
  useEffect(() => {
    if (role && role !== "admin") navigate("/");
  }, [role, navigate]);

  useEffect(() => {
    dispatch(fetchDonors());
    dispatch(fetchRequests());
  }, [dispatch]);

  // merge defaults with firestore (firestore wins on same id)
  const firestoreDonorIds   = new Set(donors.map((d) => d.id));
  const firestoreRequestIds = new Set(requests.map((r) => r.id));
  const allDonors   = [...DEFAULT_DONORS.filter((d) => !firestoreDonorIds.has(d.id)),   ...donors];
  const allRequests = [...DEFAULT_REQUESTS.filter((r) => !firestoreRequestIds.has(r.id)), ...requests];

  // ADMIN-05: stats
  const bgDist = allDonors.reduce((acc, d) => {
    if (d.bloodGroup) acc[d.bloodGroup] = (acc[d.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  const handleDelete = ({ type, id }) => {
    if (type === "request") {
      dispatch(deleteRequest(id));
    } else {
      dispatch(deleteDonor(id));
    }
    setConfirmAction(null);
  };

  if (!user || role !== "admin") return null;

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes adminOrb1 {
          0%,100% { transform:translate(0,0) scale(1); }
          40%      { transform:translate(60px,-40px) scale(1.2); }
          70%      { transform:translate(-30px,30px) scale(0.85); }
        }
        @keyframes adminOrb2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-70px,50px) scale(1.25); }
        }
        @keyframes adminOrb3 {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(40px,60px) scale(1.1); }
          66%      { transform:translate(-40px,-20px) scale(0.9); }
        }
        @keyframes spinRingAdmin {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes adminGridDrift {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(-10px,8px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .adm-tab { padding:10px 22px; border-radius:10px; border:none; cursor:pointer;
          font-weight:700; font-size:0.88rem; transition:all 0.18s; }
        .adm-tab.active  { background:#dc2626; color:#fff; box-shadow:0 4px 14px rgba(220,38,38,0.35); }
        .adm-tab:not(.active) { background:#f3f4f6; color:#374151; }
        .adm-tab:not(.active):hover { background:#fee2e2; color:#dc2626; }

        /* stat card */
        .stat-card { background:#fff; border-radius:18px; padding:26px 22px;
          border:1.5px solid #f3f4f6; box-shadow:0 4px 18px rgba(0,0,0,0.06);
          animation:fadeUp 0.35s ease both; transition:transform 0.2s,box-shadow 0.2s; }
        .stat-card:hover { transform:translateY(-4px); box-shadow:0 12px 30px rgba(0,0,0,0.1); }

        /* donor card */
        .donor-card { background:#fff; border-radius:18px; overflow:hidden;
          border:1.5px solid #f3f4f6; box-shadow:0 4px 18px rgba(0,0,0,0.07);
          animation:fadeUp 0.35s ease both; transition:transform 0.2s,box-shadow 0.2s; display:flex; flex-direction:column; }
        .donor-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(0,0,0,0.11); }

        /* request card */
        .req-card { background:#fff; border-radius:18px; overflow:hidden;
          border:1.5px solid #f3f4f6; box-shadow:0 4px 18px rgba(0,0,0,0.07);
          animation:fadeUp 0.35s ease both; transition:transform 0.2s,box-shadow 0.2s; display:flex; flex-direction:column; }
        .req-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(0,0,0,0.11); }

        .del-btn { background:#fee2e2; color:#dc2626; border:none; border-radius:8px;
          padding:7px 16px; font-weight:700; font-size:0.8rem; cursor:pointer; transition:all 0.18s; }
        .del-btn:hover { background:#dc2626; color:#fff; }

        .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.45);
          display:flex; align-items:center; justify-content:center; z-index:999; }
        .modal { background:#fff; border-radius:18px; padding:36px 32px;
          max-width:360px; width:90%; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.2); }
      `}</style>

      <Navbar />
      {/* Animated background orbs */}
      <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize:"32px 32px", opacity:0.3, animation:"adminGridDrift 18s linear infinite" }} />
        <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(220,38,38,0.10),transparent 70%)", top:"-150px", left:"-150px", animation:"adminOrb1 12s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(127,29,29,0.09),transparent 70%)", bottom:"-100px", right:"-100px", animation:"adminOrb2 15s ease-in-out infinite" }} />
        <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(185,28,28,0.07),transparent 70%)", top:"45%", left:"45%", animation:"adminOrb3 18s ease-in-out infinite" }} />
      </div>
      <div style={{ ...s.page, position:"relative", zIndex:1 }}>

        {/* Banner */}
        <div style={s.banner}>
          <div>
            <p style={s.tag}>🛡️ Admin Panel</p>
            <h1 style={s.title}>Dashboard Overview</h1>
            <p style={s.sub}>Full system control — donors, requests & statistics.</p>
          </div>
          <div style={{ position:"relative", width:100, height:100, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize: "4rem", opacity: 0.2 }}>⚙️</span>
            <div style={{ position:"absolute", width:80, height:80, borderRadius:"50%", border:"2px dashed rgba(255,255,255,0.25)", top:"50%", left:"50%", animation:"spinRingAdmin 8s linear infinite" }} />
            <div style={{ position:"absolute", width:110, height:110, borderRadius:"50%", border:"1.5px dashed rgba(255,255,255,0.12)", top:"50%", left:"50%", animation:"spinRingAdmin 14s linear infinite reverse" }} />
          </div>
        </div>

        {/* Tabs + Logout */}
        <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap", alignItems: "center" }}>
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
            <p style={{...s.label,fontSize:"0.999rem"}}>Summary Statistics</p>
            <div style={s.statsGrid}>
              {[
                { icon: "🩸", label: "Total Donors",    value: allDonors.length,                              color: "#dc2626" },
                { icon: "🚨", label: "Total Requests",  value: allRequests.length,                            color: "#b91c1c" },
                { icon: "✅", label: "Active Requests", value: allRequests.filter((r) => !r.fulfilled).length, color: "#059669" },
                { icon: "✔️", label: "Fulfilled",       value: allRequests.filter((r) => r.fulfilled).length,  color: "#7c3aed" },
              ].map(({ icon, label, value, color }, i) => (
                <div className="stat-card" key={label} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div style={{ ...s.iconBox, background: color + "18" }}>
                    <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                  </div>
                  <p style={{ fontSize: "2.2rem", fontWeight: 900, color, margin: "10px 0 4px" }}>{value}</p>
                  <p style={s.statLabel}>{label}</p>
                </div>
              ))}
            </div>

            <p style={{ ...s.label, marginTop: 36,fontSize:"0.999rem" }}>🩸 Blood Group Distribution</p>
            <div style={s.statsGrid}>
              {Object.entries(bgDist).sort().map(([bg, count], i) => (
                <div className="stat-card" key={bg} style={{ animationDelay: `${i * 0.06}s`, display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: (BLOOD_COLORS[bg] || "#dc2626") + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontWeight: 900, fontSize: "1rem", color: BLOOD_COLORS[bg] || "#dc2626" }}>{bg}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "1.8rem", fontWeight: 900, color: BLOOD_COLORS[bg] || "#dc2626", margin: 0 }}>{count}</p>
                    <p style={s.statLabel}>donors</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── DONORS ── */}
        {tab === "Donors" && (
          <>
            <p style={s.label}>All Registered Donors ({allDonors.length})</p>
            <div style={s.cardsGrid}>
              {allDonors.map((d, i) => {
                const color = BLOOD_COLORS[d.bloodGroup] || "#dc2626";
                return (
                  <div className="donor-card" key={d.id} style={{ animationDelay: `${i * 0.06}s` }}>
                    {/* Card top strip */}
                    <div style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, padding: "20px 20px 14px", position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "6px 14px" }}>
                          <span style={{ color: "#fff", fontWeight: 600, fontSize: "1.5rem" }}>{d.bloodGroup || "?"}</span>
                        </div>
                        <span style={{ background: d.available ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                          {d.available ? "✅ Available" : "⏸ Unavailable"}
                        </span>
                      </div>
                      <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", margin: "12px 0 0" }}>{d.name || d.fullName || "—"}</p>
                    </div>
                    {/* Card body */}
                    <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 8, fontSize:"1.3rem",color:"black" }}>
                      <div style={s.infoRow}><span>📍</span><span>{d.city || "—"}</span></div>
                      <div style={s.infoRow}><span>📞</span><span>{d.contactNumber || d.phone || "—"}</span></div>
                      {d.age && <div style={s.infoRow}><span>👤 </span><span>{d.age} years old</span></div>}
                      <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", justifyContent: "flex-end" }}>
                        <button className="del-btn" onClick={() => setConfirmAction({ type: "donor", id: d.id })}>🗑 Delete</button>
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
            <p style={s.label}>🚨 Active Requests ({allRequests.filter((r) => !r.fulfilled).length})</p>
            <div style={s.cardsGrid}>
              {allRequests.filter((r) => !r.fulfilled).map((r, i) => (
                <RequestCard key={r.id} r={r} delay={i * 0.06} onDelete={(id) => setConfirmAction({ type: "request", id })} />
              ))}
              {allRequests.filter((r) => !r.fulfilled).length === 0 && (
                <p style={{ color: "#9ca3af" }}>No active requests.</p>
              )}
            </div>

            <p style={{ ...s.label, marginTop: 36 }}>✔ Fulfilled Requests ({allRequests.filter((r) => r.fulfilled).length})</p>
            <div style={s.cardsGrid}>
              {allRequests.filter((r) => r.fulfilled).map((r, i) => (
                <RequestCard key={r.id} r={r} delay={i * 0.06} onDelete={(id) => setConfirmAction({ type: "request", id })} />
              ))}
              {allRequests.filter((r) => r.fulfilled).length === 0 && (
                <p style={{ color: "#9ca3af" }}>No fulfilled requests yet.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {confirmAction && (
        <div className="overlay" onClick={() => setConfirmAction(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p style={{ fontSize: "2.5rem", margin: "0 0 10px" }}>🗑️</p>
            <p style={{ fontWeight: 800, fontSize: "1.15rem", margin: "0 0 8px", color: "#111827" }}>
              {confirmAction.type === "request" ? "Delete Request?" : "Delete Donor?"}
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.88rem", margin: "0 0 28px" }}>
              {confirmAction.type === "request"
                ? "This will permanently remove the request entry. This action cannot be undone."
                : "This will permanently remove the donor entry. This action cannot be undone."}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
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
  const color = r.fulfilled ? "#9ca3af" : (BLOOD_COLORS[r.bloodGroup] || "#dc2626");

  return (
    <div className="req-card" style={{ animationDelay: `${delay}s` }}>
      {/* Top strip */}
      <div style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, padding: "20px 20px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "6px 14px" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: "1.3rem" }}>{r.bloodGroup || "?"}</span>
          </div>
          <span style={{ background: r.fulfilled ? "rgba(255,255,255,0.25)" : "rgba(220,38,38,0.35)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
            {r.fulfilled ? "✔ Fulfilled" : "🚨 Urgent"}
          </span>
        </div>
        <p style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", margin: "12px 0 0" }}>{r.patientName || "—"}</p>
      </div>
      {/* Body */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={s.infoRow}><span>🏥</span><span>{r.hospitalName || "—"}</span></div>
        <div style={s.infoRow}><span>📍</span><span>{r.city || "—"}</span></div>
        <div style={s.infoRow}><span>📞</span><span>{r.contactNumber || "—"}</span></div>
        {r.createdAt && (
          <div style={s.infoRow}><span>📅</span><span>{new Date(r.createdAt).toLocaleDateString()}</span></div>
        )}
        <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", justifyContent: "flex-end" }}>
          <button className="del-btn" onClick={() => onDelete(r.id)}>🗑 Delete</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page:       { maxWidth: 1200, margin: "0 auto", padding: "40px 24px" },
  banner:     { background: "linear-gradient(135deg,#b91c1c 0%,#7f1d1d 60%,#450a0a 100%)", borderRadius: 22, padding: "34px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 },
  tag:        { color: "#fff", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 6px" },
  title:      { color: "#fff", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, margin: "0 0 6px", letterSpacing: "-0.02em" },
  sub:        { color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", margin: 0 },
  label:      { fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#dc2626", margin: "0 0 16px" },
  statsGrid:  { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 18, marginBottom: 8 },
  cardsGrid:  { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20, marginBottom: 12 },
  iconBox:    { width: 50, height: 50, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center" },
  statLabel:  { fontSize: "0.76rem", color: "#6b7280", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" },
  infoRow:    { display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#374151" },
  logoutBtn:  { marginLeft: "auto", background: "#dc2626", border: "none", borderRadius: 10, padding: "10px 22px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" },
  cancelBtn:  { background: "#f3f4f6", border: "none", borderRadius: 10, padding: "11px 24px", fontWeight: 700, cursor: "pointer", color: "#374151", fontSize: "0.9rem" },
  confirmBtn: { background: "#dc2626", border: "none", borderRadius: 10, padding: "11px 24px", fontWeight: 700, cursor: "pointer", color: "#fff", fontSize: "0.9rem" },
};
