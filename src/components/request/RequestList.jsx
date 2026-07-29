import RequestCard from "./RequestCard";

const defaultRequests = [
  {
    id: "default-1",
    patientName: "Hassan Mirza",
    bloodGroup: "O-",
    hospitalName: "City Hospital",
    city: "Karachi",
    contactNumber: "03331234567",
    fulfilled: false,
    postedBy: "default",
    createdAt: "2025-07-01T10:00:00.000Z",
  },
  {
    id: "default-2",
    patientName: "Fatima Zahra",
    bloodGroup: "B+",
    hospitalName: "Life Care Hospital",
    city: "Lahore",
    contactNumber: "03441234567",
    fulfilled: false,
    postedBy: "default",
    createdAt: "2025-06-28T08:30:00.000Z",
  },
  {
    id: "default-3",
    patientName: "Usman Tariq",
    bloodGroup: "A+",
    hospitalName: "Shifa International",
    city: "Islamabad",
    contactNumber: "03211234567",
    fulfilled: false,
    postedBy: "default",
    createdAt: "2025-07-03T09:00:00.000Z",
  },
];

export default function RequestList({ requests = [], search }) {
  // merge default + firestore (firestore takes priority by id)
  const firestoreIds = new Set(requests.map((r) => r.id));
  const all = [
    ...defaultRequests.filter((d) => !firestoreIds.has(d.id)),
    ...requests,
  ];

  const isMatch = (r) => {
    if (!search) return false;
    const cityMatch = !search.city ||
      r.city?.toLowerCase().includes(search.city.toLowerCase());
    const bgMatch = !search.bloodGroup || r.bloodGroup === search.bloodGroup;
    return cityMatch && bgMatch;
  };

  const matched   = search ? all.filter((r) => isMatch(r) && !r.fulfilled) : [];
  const remaining = search ? all.filter((r) => !isMatch(r)) : all;
  const active    = remaining.filter((r) => !r.fulfilled);
  const fulfilled = remaining.filter((r) => r.fulfilled);

  return (
    <div>

      {/* Matched on top */}
      {matched.length > 0 && (
        <div style={s.matchSection}>
          <div style={s.matchHeader}>
            <span style={s.matchDot} />
            <span style={s.matchLabel}>🎯 {matched.length} Match{matched.length > 1 ? "es" : ""} Found</span>
          </div>
          <div style={s.grid}>
            {matched.map((r) => (
              <RequestCard key={r.id} request={r} highlighted />
            ))}
          </div>
        </div>
      )}

      {/* No match */}
      {search && matched.length === 0 && (
        <div style={s.noMatch}>
          <p style={{ fontSize: "2rem", margin: 0 }}>🔍</p>
          <p style={{ fontWeight: 700, color: "#374151", margin: "8px 0 4px" }}>No active requests match your search.</p>
          <p style={{ fontSize: "0.88rem", color: "#9ca3af", margin: 0 }}>Showing all other requests below.</p>
        </div>
      )}

      {/* Active */}
      {active.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={s.sectionLabel}>🚨 Active Requests ({active.length})</p>
          <div style={s.grid}>
            {active.map((r) => <RequestCard key={r.id} request={r} />)}
          </div>
        </div>
      )}

      {/* Fulfilled */}
      {fulfilled.length > 0 && (
        <div>
          <p style={{ ...s.sectionLabel, color: "#9ca3af" }}>✔ Fulfilled Requests ({fulfilled.length})</p>
          <div style={s.grid}>
            {fulfilled.map((r) => <RequestCard key={r.id} request={r} />)}
          </div>
        </div>
      )}

      {all.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
          <p style={{ fontSize: "3rem" }}>🩸</p>
          <p>No urgent requests at the moment.</p>
        </div>
      )}
    </div>
  );
}

const s = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 20,
  },
  matchSection: {
    background: "linear-gradient(135deg,#fff5f5,#fef2f2)",
    border: "2px solid #fca5a5",
    borderRadius: 18,
    padding: "20px 20px 24px",
    marginBottom: 32,
    boxShadow: "0 8px 32px rgba(220,38,38,0.12)",
  },
  matchHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  matchDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#dc2626",
    display: "inline-block",
    boxShadow: "0 0 0 4px rgba(220,38,38,0.2)",
  },
  matchLabel: {
    fontSize: "0.85rem",
    fontWeight: 800,
    color: "#dc2626",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  noMatch: {
    textAlign: "center",
    background: "#fff",
    border: "1.5px solid #e5e7eb",
    borderRadius: 14,
    padding: "28px 20px",
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: "0.8rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#dc2626",
    margin: "0 0 16px",
  },
};
