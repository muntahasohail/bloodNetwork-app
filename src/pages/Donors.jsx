import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonors } from "../features/donors/donorSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BLOOD_COLORS = {
  "A+": "#dc2626", "A-": "#b91c1c",
  "B+": "#2563eb", "B-": "#1d4ed8",
  "AB+": "#7c3aed", "AB-": "#6d28d9",
  "O+": "#059669", "O-": "#047857",
};

const DEFAULT_DONORS = [
  { id: "dd1", fullName: "Ali Khan",    bloodGroup: "O+", city: "Karachi",   contactNumber: "03001234567", cnic: "42101-1234567-1", availability: true },
  { id: "dd2", fullName: "Ahmed Raza",  bloodGroup: "B-", city: "Lahore",    contactNumber: "03111234567", cnic: "35202-9876543-2", availability: true },
  { id: "dd3", fullName: "Sara Noor",   bloodGroup: "A+", city: "Islamabad", contactNumber: "03221234567", cnic: "61101-5554443-3", availability: true },
  { id: "dd4", fullName: "Usman Malik", bloodGroup: "AB+",city: "Karachi",   contactNumber: "03331234567", cnic: "42201-1111111-4", availability: true },
  { id: "dd5", fullName: "Hina Baig",   bloodGroup: "O-", city: "Lahore",    contactNumber: "03441234567", cnic: "35301-2222222-5", availability: true },
];

const maskCnic = (cnic = "") => {
  const p = cnic.split("-");
  return p.length === 3 ? `*****-${p[1]}-*` : "*****-*******-*";
};

export default function Donors() {
  const dispatch = useDispatch();
  const { donors } = useSelector((s) => s.donors);
  const [filters, setFilters] = useState({ city: "", bloodGroup: "" });
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => { dispatch(fetchDonors()); }, [dispatch]);

  // merge defaults + firestore
  const firestoreIds = new Set(donors.map((d) => d.id));
  const allDonors = [
    ...DEFAULT_DONORS.filter((d) => !firestoreIds.has(d.id)),
    ...donors,
  ];

  const handleSearch = () => {
    const filtered = allDonors.filter((d) => {
      const cityMatch = !filters.city || d.city?.toLowerCase().includes(filters.city.toLowerCase());
      const bgMatch   = !filters.bloodGroup || d.bloodGroup === filters.bloodGroup;
      return cityMatch && bgMatch && d.availability === true;
    });
    setResults(filtered);
    setSearched(true);
  };

  const handleClear = () => {
    setFilters({ city: "", bloodGroup: "" });
    setSearched(false);
    setResults([]);
  };

  const DonorCard = ({ donor }) => {
    const color = BLOOD_COLORS[donor.bloodGroup] || "#dc2626";
    return (
      <div style={cs.card}>
        <div style={{ ...cs.top, background: color }}>
          <span style={cs.bloodBadge}>{donor.bloodGroup}</span>
          <span style={{ ...cs.availBadge, background: donor.availability ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)" }}>
            {donor.availability ? "● Available" : "● Unavailable"}
          </span>
        </div>
        <div style={cs.body}>
          <p style={cs.name}>{donor.fullName || donor.name || "—"}</p>
          <div style={cs.row}><span>📍</span><span>{donor.city || "—"}</span></div>
          <div style={cs.row}><span>📞</span><span>{donor.contactNumber || "—"}</span></div>
          <div style={cs.row}><span>🪪</span><span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#9ca3af" }}>{maskCnic(donor.cnic)}</span></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div style={s.hero}>
        <div style={s.heroInner}>
          <span style={s.pill}>🔍 Donor Search</span>
          <h1 style={s.heading}>Find a Blood Donor</h1>
          <p style={s.sub}>Search by city and blood group to find available donors near you instantly.</p>
        </div>
        <div style={s.curve}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.inner}>

          {/* Search bar */}
          <div style={s.searchBox}>
            <input
              style={s.input}
              placeholder="🔍  Search by city..."
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <select
              style={s.select}
              value={filters.bloodGroup}
              onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
            >
              <option value="">All Blood Groups</option>
              {BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}
            </select>
            <button style={s.searchBtn} onClick={handleSearch}>Search</button>
            {searched && <button style={s.clearBtn} onClick={handleClear}>✕ Clear</button>}
          </div>

          {/* Results */}
          {searched && (
            <div>
              <div style={s.meta}>
                <span style={{ fontSize: "0.9rem", color: "#6b7280", fontWeight: 600 }}>
                  {results.length} available donor{results.length !== 1 ? "s" : ""} found
                </span>
              </div>

              {results.length === 0 ? (
                <div style={s.empty}>
                  <p style={{ fontSize: "3rem", margin: 0 }}>🩸</p>
                  <p style={{ fontWeight: 700, color: "#374151", margin: "8px 0 4px" }}>No available donors match your search.</p>
                  <p style={{ fontSize: "0.88rem", color: "#9ca3af", margin: 0 }}>Try a different city or blood group.</p>
                </div>
              ) : (
                <div style={s.grid}>
                  {results.map((donor) => <DonorCard key={donor.id} donor={donor} />)}
                </div>
              )}
            </div>
          )}

          {/* Prompt before search */}
          {!searched && (
            <div style={s.prompt}>
              <p style={{ fontSize: "3rem", margin: 0 }}>🔍</p>
              <p style={{ fontWeight: 700, color: "#374151", margin: "8px 0 4px" }}>Search for a donor</p>
              <p style={{ fontSize: "0.88rem", color: "#9ca3af", margin: 0 }}>Enter a city or select a blood group and click Search.</p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

const s = {
  hero:      { background: "linear-gradient(135deg,#dc2626,#7f1d1d)", padding: "60px 24px 80px", textAlign: "center", position: "relative" },
  heroInner: { maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 },
  pill:      { display: "inline-block", background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 999, padding: "6px 20px", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 },
  heading:   { fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", margin: "0 0 12px" },
  sub:       { fontSize: "1rem", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.7 },
  curve:     { position: "absolute", bottom: 0, left: 0, right: 0 },
  body:      { background: "#f9fafb", minHeight: "60vh", padding: "40px 24px" },
  inner:     { maxWidth: 1100, margin: "0 auto" },
  searchBox: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", background: "#fff", borderRadius: 16, padding: "16px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", marginBottom: 28, border: "1.5px solid #fef2f2" },
  input:     { flex: 2, minWidth: 160, padding: "11px 16px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: "0.95rem", outline: "none" },
  select:    { flex: 1, minWidth: 140, padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: "0.95rem", outline: "none", background: "#fff" },
  searchBtn: { padding: "11px 28px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#dc2626,#991b1b)", color: "#fff", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 14px rgba(220,38,38,0.3)" },
  clearBtn:  { padding: "11px 18px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "#fff", color: "#6b7280", fontWeight: 700, cursor: "pointer" },
  meta:      { marginBottom: 16 },
  grid:      { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 },
  empty:     { textAlign: "center", padding: "60px 0" },
  prompt:    { textAlign: "center", padding: "60px 0" },
};

const cs = {
  card:       { background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" },
  top:        { padding: "18px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  bloodBadge: { fontSize: "1.5rem", fontWeight: 800, color: "#fff", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 12px" },
  availBadge: { fontSize: "0.72rem", fontWeight: 600, color: "#fff", borderRadius: 999, padding: "4px 10px" },
  body:       { padding: "16px" },
  name:       { fontSize: "1rem", fontWeight: 700, color: "#111827", margin: "0 0 10px" },
  row:        { display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#4b5563", marginBottom: 6 },
};
