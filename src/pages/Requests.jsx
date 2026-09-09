import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests, addRequest, fulfillRequest, updateRequest } from "../features/requests/requestSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BLOOD_COLORS = {
  "A+": "#dc2626", "A-": "#b91c1c",
  "B+": "#2563eb", "B-": "#1d4ed8",
  "AB+": "#7c3aed", "AB-": "#6d28d9",
  "O+": "#059669", "O-": "#047857",
};

const DEFAULT_REQUESTS = [
  { id: "d1", patientName: "Hassan Mirza",  bloodGroup: "O-", hospitalName: "City Hospital",       city: "Karachi",   contactNumber: "03331234567", fulfilled: false, createdAt: "2025-07-01T10:00:00.000Z" },
  { id: "d2", patientName: "Fatima Zahra",  bloodGroup: "B+", hospitalName: "Life Care Hospital",  city: "Lahore",    contactNumber: "03441234567", fulfilled: false, createdAt: "2025-06-28T08:30:00.000Z" },
  { id: "d3", patientName: "Usman Tariq",   bloodGroup: "A+", hospitalName: "Shifa International", city: "Islamabad", contactNumber: "03211234567", fulfilled: false, createdAt: "2025-07-03T09:00:00.000Z" },
];

const EMPTY_FORM = { patientName: "", bloodGroup: "", city: "", hospitalName: "", contactNumber: "" };

export default function Requests() {
  const dispatch  = useDispatch();
  const { requests } = useSelector((s) => s.requests);
  const { user }     = useSelector((s) => s.auth);

  const [query,       setQuery]       = useState({ city: "", bloodGroup: "" });
  const [search,      setSearch]      = useState(null);
  const [formOpen,    setFormOpen]    = useState(false);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [editRequest, setEditRequest] = useState(null);

  useEffect(() => { dispatch(fetchRequests()); }, [dispatch]);

  // merge defaults + firestore
  const firestoreIds = new Set(requests.map((r) => r.id));
  const all = [
    ...DEFAULT_REQUESTS.filter((d) => !firestoreIds.has(d.id)),
    ...requests,
  ];

  const isMatch = (r) => {
    if (!search) return false;
    const cityOk = !search.city || r.city?.toLowerCase().includes(search.city.toLowerCase());
    const bgOk   = !search.bloodGroup || r.bloodGroup === search.bloodGroup;
    return cityOk && bgOk;
  };

  const matched   = search ? all.filter((r) => isMatch(r) && !r.fulfilled) : [];
  const remaining = search ? all.filter((r) => !isMatch(r)) : all;
  const active    = remaining.filter((r) => !r.fulfilled);
  const done      = remaining.filter((r) => r.fulfilled);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { patientName, bloodGroup, city, hospitalName, contactNumber } = form;
    if (!patientName || !bloodGroup || !city || !hospitalName || !contactNumber)
      return alert("Please fill all required fields.");

    if (editRequest) {
      dispatch(updateRequest({ id: editRequest.id, data: form }));
    } else {
      dispatch(addRequest({ ...form, fulfilled: false, postedBy: user?.uid, createdAt: new Date().toISOString() }));
    }

    setForm(EMPTY_FORM);
    setEditRequest(null);
    setFormOpen(false);
  };

  const Card = ({ r, highlighted }) => {
    const color = r.fulfilled ? "#9ca3af" : (BLOOD_COLORS[r.bloodGroup] || "#dc2626");
    const isOwner = user && user.uid === r.postedBy;
    return (
      <div style={{
        ...cs.card,
        opacity: r.fulfilled ? 0.7 : 1,
        boxShadow: highlighted
          ? "0 12px 40px rgba(220,38,38,0.25), 0 0 0 2px #dc2626"
          : "0 6px 28px rgba(15,23,42,0.09)",
      }}>
        {highlighted && <div style={cs.foundTag}>✅ Match Found</div>}
        {r.fulfilled && <div style={cs.fulfilledRibbon}>Fulfilled</div>}

        {/* Banner */}
        <div style={{ ...cs.banner, background: `linear-gradient(135deg,${color},${color}cc)` }}>
          <div style={cs.bannerGlow} />
          <span style={cs.bloodBadge}>{r.bloodGroup || "?"}</span>
          <span style={cs.urgBadge}>{r.fulfilled ? "✔ Done" : "🚨 Urgent"}</span>
        </div>

        {/* Body */}
        <div style={cs.body}>
          <p style={cs.name}>{r.patientName || "—"}</p>
          <div style={cs.infoRow}><span style={cs.infoIcon}>🏥</span><span>{r.hospitalName || "—"}</span></div>
          <div style={cs.infoRow}><span style={cs.infoIcon}>📍</span><span>{r.city || "—"}</span></div>
          <div style={cs.infoRow}><span style={cs.infoIcon}>📞</span><span>{r.contactNumber || "—"}</span></div>
          {r.createdAt && (
            <p style={cs.date}>🗓 {new Date(r.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</p>
          )}
          {isOwner && !r.fulfilled && (
            <button style={cs.fulfillBtn} onClick={() => dispatch(fulfillRequest(r.id))}>✔ Mark as Fulfilled</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={s.hero}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"32px 32px", opacity:0.5 }} />
        <span style={s.pill}>🚨 Urgent Requests</span>
        <h1 style={s.heading}>Blood Requests</h1>
        <p style={s.sub}>Post an urgent request or help fulfill one. Every second counts.</p>
        <div style={s.curve}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.inner}>

          {/* Search */}
          <div style={s.searchBox}>
            <input style={s.input} placeholder="🔍 Search by city..." value={query.city}
              onChange={(e) => setQuery({ ...query, city: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && setSearch({ ...query })} />
            <select style={s.select} value={query.bloodGroup}
              onChange={(e) => setQuery({ ...query, bloodGroup: e.target.value })}>
              <option value="">All Blood Groups</option>
              {BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}
            </select>
            <button style={s.searchBtn} onClick={() => setSearch({ ...query })}>Search</button>
            {search && <button style={s.clearBtn} onClick={() => { setQuery({ city: "", bloodGroup: "" }); setSearch(null); }}>✕ Clear</button>}
          </div>

          {/* Post button */}
          {!formOpen && (
            <button style={s.postBtn} onClick={() => {
              setForm(EMPTY_FORM);
              setEditRequest(null);
              setFormOpen(true);
            }}>
              🩸 Post Urgent Blood Request
            </button>
          )}

          {/* Post form */}
          {formOpen && (
            <div style={s.formCard}>
              <div style={s.formHeader}>
                <span style={{ fontWeight: 800, color: "#fff" }}>
                  {editRequest ? "✏️ Edit Blood Request" : "🚨 New Blood Request"}
                </span>
                <button style={s.closeBtn} onClick={() => {
                  setFormOpen(false);
                  setEditRequest(null);
                  setForm(EMPTY_FORM);
                }}>✕</button>
              </div>
              <form onSubmit={handleFormSubmit} style={s.formBody}>
                <div style={s.formGrid}>
                  {[["patientName","Patient Name","text","Muhammad Ali"],["bloodGroup","Blood Group","select",""],["hospitalName","Hospital Name","text","e.g. Aga Khan"],["city","City","text","e.g. Karachi"],["contactNumber","Contact","tel","03XXXXXXXXX"]].map(([name, label, type, ph]) => (
                    <div key={name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151" }}>{label} *</label>
                      {type === "select"
                        ? <select style={s.formInput} name={name} value={form[name]} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}>
                            <option value="">Select</option>
                            {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                          </select>
                        : <input style={s.formInput} type={type} name={name} placeholder={ph} value={form[name]} onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                      }
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
                  <button type="button" style={s.cancelBtn} onClick={() => {
                    setFormOpen(false);
                    setEditRequest(null);
                    setForm(EMPTY_FORM);
                  }}>Cancel</button>
                  <button type="submit" style={s.submitBtn}>{editRequest ? "Save Changes" : "Post Request"}</button>
                </div>
              </form>
            </div>
          )}

          <div style={{ marginTop: 32 }}>
            {/* Matched */}
            {matched.length > 0 && (
              <div style={s.matchSection}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={s.matchDot} />
                  <span style={s.matchLabel}>🎯 {matched.length} Match{matched.length > 1 ? "es" : ""} Found</span>
                </div>
                <div style={s.grid}>{matched.map((r) => <Card key={r.id} r={r} highlighted />)}</div>
              </div>
            )}

            {search && matched.length === 0 && (
              <div style={s.noMatch}>
                <p style={{ fontSize: "2rem", margin: 0 }}>🔍</p>
                <p style={{ fontWeight: 700, margin: "8px 0 4px" }}>No active requests match your search.</p>
              </div>
            )}

            {/* Active */}
            {active.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <p style={s.secLabel}>🚨 Active Requests ({active.length})</p>
                <div style={s.grid}>{active.map((r) => <Card key={r.id} r={r} />)}</div>
              </div>
            )}

            {/* Fulfilled */}
            {done.length > 0 && (
              <div>
                <p style={{ ...s.secLabel, color: "#9ca3af" }}>✔ Fulfilled ({done.length})</p>
                <div style={s.grid}>{done.map((r) => <Card key={r.id} r={r} />)}</div>
              </div>
            )}

            {all.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                <p style={{ fontSize: "3rem" }}>🩸</p>
                <p>No requests yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const s = {
  hero:      { background: "linear-gradient(145deg,#dc2626 0%,#7f1d1d 55%,#3b0a0a 100%)", padding: "64px 24px 88px", textAlign: "center", position: "relative", overflow:"hidden" },
  pill:      { display: "inline-block", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 999, padding: "6px 20px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, backdropFilter:"blur(8px)" },
  heading:   { fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", margin: "0 0 12px", letterSpacing:"-0.03em" },
  sub:       { fontSize: "0.95rem", color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.8 },
  curve:     { position: "absolute", bottom: 0, left: 0, right: 0 },
  body:      { background: "linear-gradient(160deg,#fafafa 0%,#fff5f5 100%)", minHeight: "60vh", padding: "40px 24px" },
  inner:     { maxWidth: 1100, margin: "0 auto" },
  searchBox: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", background: "#fff", borderRadius: 16, padding: "16px 20px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", marginBottom: 20, border: "1px solid #f1f5f9" },
  input:     { flex: 2, minWidth: 160, padding: "11px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", outline: "none", fontFamily:"inherit" },
  select:    { flex: 1, minWidth: 140, padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", outline: "none", background: "#fff", fontFamily:"inherit" },
  searchBtn: { padding: "11px 28px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#dc2626,#991b1b)", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily:"inherit" },
  clearBtn:  { padding: "11px 18px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b", fontWeight: 700, cursor: "pointer", fontFamily:"inherit" },
  postBtn:   { background: "linear-gradient(135deg,#dc2626,#991b1b)", color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontWeight: 800, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 16px rgba(220,38,38,0.35)", marginBottom: 8, fontFamily:"inherit" },
  formCard:  { background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(220,38,38,0.1)", marginBottom: 24, border:"1px solid #f1f5f9" },
  formHeader:{ background: "linear-gradient(135deg,#dc2626,#991b1b)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  closeBtn:  { background: "rgba(255,255,255,0.18)", border: "none", color: "#fff", borderRadius: 6, width: 28, height: 28, cursor: "pointer", fontSize: "0.9rem" },
  formBody:  { padding: "24px" },
  formGrid:  { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 },
  formInput: { padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: "0.88rem", outline: "none", width: "100%", boxSizing: "border-box", fontFamily:"inherit" },
  cancelBtn: { background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "10px 20px", fontWeight: 600, color: "#64748b", cursor: "pointer", fontFamily:"inherit" },
  submitBtn: { background: "linear-gradient(135deg,#dc2626,#991b1b)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontFamily:"inherit" },
  grid:      { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 },
  matchSection: { background: "linear-gradient(135deg,#fff5f5,#fef2f2)", border: "1.5px solid #fecaca", borderRadius: 18, padding: "20px 20px 24px", marginBottom: 32, boxShadow: "0 8px 32px rgba(220,38,38,0.1)" },
  matchDot:  { width: 10, height: 10, borderRadius: "50%", background: "#dc2626", display: "inline-block", boxShadow: "0 0 0 4px rgba(220,38,38,0.2)" },
  matchLabel:{ fontSize: "0.82rem", fontWeight: 800, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.08em" },
  noMatch:   { textAlign: "center", background: "#fff", border: "1px solid #f1f5f9", borderRadius: 14, padding: "28px 20px", marginBottom: 28 },
  secLabel:  { fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#dc2626", margin: "0 0 16px" },
};

const cs = {
  card: {
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease",
    border: "1px solid #f1f5f9",
  },
  foundTag: {
    position: "absolute",
    top: 12,
    left: 14,
    background: "linear-gradient(135deg,#16a34a,#15803d)",
    color: "#fff",
    fontSize: "0.72rem",
    fontWeight: 800,
    borderRadius: 999,
    padding: "4px 12px",
    zIndex: 3,
    boxShadow: "0 4px 12px rgba(22,163,74,0.35)",
    letterSpacing: "0.04em",
  },
  fulfilledRibbon: {
    position: "absolute",
    top: 14,
    right: -24,
    background: "#6b7280",
    color: "#fff",
    fontSize: "0.68rem",
    fontWeight: 800,
    padding: "4px 32px",
    transform: "rotate(35deg)",
    letterSpacing: "0.06em",
    zIndex: 3,
  },
  banner: {
    padding: "20px 20px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  bannerGlow: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    top: -30,
    right: -20,
    filter: "blur(16px)",
    pointerEvents: "none",
  },
  bloodBadge: {
    fontSize: "2rem",
    fontWeight: 900,
    color: "#fff",
    fontFamily: "'Cormorant Garamond', serif",
    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
    position: "relative",
    zIndex: 1,
  },
  urgBadge: {
    fontSize: "0.72rem",
    fontWeight: 800,
    background: "rgba(255,255,255,0.22)",
    backdropFilter: "blur(4px)",
    color: "#fff",
    borderRadius: 999,
    padding: "5px 12px",
    border: "1px solid rgba(255,255,255,0.3)",
    letterSpacing: "0.04em",
    position: "relative",
    zIndex: 1,
  },
  body: {
    padding: "18px 20px 20px",
  },
  name: {
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 14px",
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: "-0.01em",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: "0.9rem",
    color: "#475569",
    marginBottom: 8,
    lineHeight: 1.4,
  },
  infoIcon: {
    fontSize: "1rem",
    flexShrink: 0,
    width: 22,
    textAlign: "center",
  },
  date: {
    fontSize: "0.78rem",
    color: "#94a3b8",
    margin: "10px 0 14px",
    letterSpacing: "0.02em",
  },
  fulfillBtn: {
    width: "100%",
    background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    border: "1.5px solid #86efac",
    color: "#16a34a",
    borderRadius: 10,
    padding: "10px",
    fontSize: "0.88rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
    letterSpacing: "0.02em",
  },
};
