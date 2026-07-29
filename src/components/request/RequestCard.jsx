import { useDispatch, useSelector } from "react-redux";
import { fulfillRequest } from "../../features/requests/requestSlice";

const BLOOD_COLORS = {
  "A+": "#dc2626", "A-": "#b91c1c",
  "B+": "#2563eb", "B-": "#1d4ed8",
  "AB+": "#7c3aed", "AB-": "#6d28d9",
  "O+": "#059669", "O-": "#047857",
};

export default function RequestCard({ request, highlighted }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const isOwner = user && (user.uid === request.postedBy || user.id === request.postedBy);
  const color = request.fulfilled ? "#9ca3af" : (BLOOD_COLORS[request.bloodGroup] || "#dc2626");

  return (
    <div style={{
      ...s.card,
      outline: highlighted ? "2.5px solid #dc2626" : "none",
      boxShadow: highlighted
        ? "0 8px 32px rgba(220,38,38,0.25)"
        : "0 4px 16px rgba(0,0,0,0.08)",
      opacity: request.fulfilled ? 0.75 : 1,
    }}>

      {/* Found tag */}
      {highlighted && <div style={s.foundTag}>✅ Found</div>}

      {/* Fulfilled ribbon */}
      {request.fulfilled && <div style={s.ribbon}>✔ Fulfilled</div>}

      {/* Top color bar */}
      <div style={{ ...s.top, background: color }}>
        <span style={s.bloodBadge}>{request.bloodGroup || "?"}</span>
        <span style={s.urgencyBadge}>
          {request.fulfilled ? "Fulfilled" : "🚨 Urgent"}
        </span>
      </div>

      {/* Body */}
      <div style={s.body}>
        <h5 style={s.patientName}>{request.patientName || "—"}</h5>

        <div style={s.infoRow}><span>🏥</span><span>{request.hospitalName || "—"}</span></div>
        <div style={s.infoRow}><span>📍</span><span>{request.city || "—"}</span></div>
        <div style={s.infoRow}><span>📞</span><span>{request.contactNumber || "—"}</span></div>

        {request.createdAt && (
          <p style={s.date}>{new Date(request.createdAt).toLocaleDateString()}</p>
        )}

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
          {isOwner && !request.fulfilled && (
            <button style={s.fulfillBtn} onClick={() => dispatch(fulfillRequest(request.id))}>
              ✔ Mark as Fulfilled
            </button>
          )}
          {isOwner && (
            <button style={s.editBtn} onClick={() => alert('Edit feature not wired yet')}>
              ✏️ Edit Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  card: {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  foundTag: {
    position: "absolute",
    top: 10,
    left: 12,
    background: "#16a34a",
    color: "#fff",
    fontSize: "0.72rem",
    fontWeight: 800,
    borderRadius: 999,
    padding: "3px 10px",
    zIndex: 2,
    boxShadow: "0 2px 8px rgba(22,163,74,0.35)",
  },
  ribbon: {
    position: "absolute",
    top: 12,
    right: -24,
    background: "#16a34a",
    color: "#fff",
    fontSize: "0.68rem",
    fontWeight: 700,
    padding: "3px 28px",
    transform: "rotate(35deg)",
    letterSpacing: "0.05em",
    zIndex: 2,
  },
  top: {
    padding: "16px 16px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bloodBadge: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#fff",
    background: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: "4px 12px",
  },
  urgencyBadge: {
    fontSize: "0.72rem",
    fontWeight: 600,
    background: "rgba(255,255,255,0.25)",
    color: "#fff",
    borderRadius: 999,
    padding: "4px 10px",
  },
  body: {
    padding: "16px",
  },
  patientName: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 10px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.85rem",
    color: "#4b5563",
    marginBottom: 6,
  },
  date: {
    fontSize: "0.75rem",
    color: "#9ca3af",
    margin: "8px 0 10px",
  },
  fulfillBtn: {
    width: "100%",
    background: "#f0fdf4",
    border: "1.5px solid #86efac",
    color: "#16a34a",
    borderRadius: 8,
    padding: "8px",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  editBtn: {
    width: "100%",
    background: "#eff6ff",
    border: "1.5px solid #93c5fd",
    color: "#1d4ed8",
    borderRadius: 8,
    padding: "8px",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};
