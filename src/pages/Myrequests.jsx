import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRequests, fulfillRequest, deleteRequest, updateRequest } from "../features/requests/requestSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const BLOOD_COLORS = {
  "A+": "#dc2626",
  "A-": "#b91c1c",
  "B+": "#2563eb",
  "B-": "#1d4ed8",
  "AB+": "#7c3aed",
  "AB-": "#6d28d9",
  "O+": "#059669",
  "O-": "#047857",
};

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const EMPTY_EDIT_FORM = { patientName: "", bloodGroup: "", city: "", hospitalName: "", contactNumber: "" };

export default function MyRequests() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { myRequests, isLoading } = useSelector((s) => s.requests);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_EDIT_FORM);

  useEffect(() => {
    if (user?.uid || user?.email) {
      dispatch(fetchMyRequests(user));
    }
  }, [dispatch, user?.uid, user?.email]);

  const handleEditClick = (request) => {
    setEditingId(request.id);
    setEditForm({
      patientName: request.patientName || "",
      bloodGroup: request.bloodGroup || "",
      city: request.city || "",
      hospitalName: request.hospitalName || "",
      contactNumber: request.contactNumber || "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { patientName, bloodGroup, city, hospitalName, contactNumber } = editForm;
    if (!patientName || !bloodGroup || !city || !hospitalName || !contactNumber) {
      alert("Please fill all required fields.");
      return;
    }

    dispatch(updateRequest({
      id: editingId,
      data: { ...editForm, updatedAt: new Date().toISOString() },
    }));
    setEditingId(null);
    setEditForm(EMPTY_EDIT_FORM);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this blood request?")) {
      dispatch(deleteRequest(id));
    }
  };

  return (
    <>
      <Navbar />

      <div style={s.hero}>
        <div style={s.heroInner}>
          <span style={s.pill}>📄 My Activity</span>
          <h1 style={s.heading}>My Blood Requests</h1>
          <p style={s.sub}>Here are the requests you posted from your email account.</p>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.inner}>
          {!user ? (
            <div style={s.empty}>
              <p style={s.emptyTitle}>Please log in to see your requests.</p>
            </div>
          ) : isLoading ? (
            <p style={s.loading}>Loading your requests...</p>
          ) : myRequests.length === 0 ? (
            <div style={s.empty}>
              <span style={s.emptyIcon}>🩸</span>
              <p style={s.emptyTitle}>No requests yet</p>
              <p style={s.emptySub}>You haven’t posted any blood requests from your email account yet.</p>
            </div>
          ) : (
            <div style={s.grid}>
              {myRequests.map((request) => {
                const color = request.fulfilled ? "#9ca3af" : (BLOOD_COLORS[request.bloodGroup] || "#dc2626");
                return (
                  <div key={request.id} style={{ ...s.card, opacity: request.fulfilled ? 0.75 : 1 }}>
                    <div style={{ ...s.cardTop, background: color }}>
                      <span style={s.bloodBadge}>{request.bloodGroup || "?"}</span>
                      <span style={s.urgencyBadge}>{request.fulfilled ? "✔ Fulfilled" : "🚨 Urgent"}</span>
                    </div>

                    <div style={s.cardBody}>
                      <h4 style={s.patientName}>{request.patientName || "—"}</h4>
                      {[ ["🏥", request.hospitalName], ["📍", request.city], ["📞", request.contactNumber] ].map(([icon, val]) => (
                        <div key={icon} style={s.infoRow}><span>{icon}</span><span style={s.infoVal}>{val || "—"}</span></div>
                      ))}
                      {request.createdAt && <p style={s.date}>{new Date(request.createdAt).toLocaleDateString()}</p>}

                      <div style={s.btnRow}>
                        {!request.fulfilled ? (
                          <button style={s.fulfillBtn} onClick={() => dispatch(fulfillRequest(request.id))}>
                            ✔ Mark Fulfilled
                          </button>
                        ) : (
                          <button style={s.fulfilledBtn} disabled>
                            ✔ Fulfilled
                          </button>
                        )}
                        <button style={s.editBtn} onClick={() => handleEditClick(request)}>
                          ✏️ Edit
                        </button>
                        <button style={s.deleteBtn} onClick={() => handleDelete(request.id)}>
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {editingId && (
        <div style={s.modalOverlay}>
          <div style={s.modalCard}>
            <div style={s.modalHeader}>
              <h3 style={s.modalTitle}>Edit Blood Request</h3>
              <button style={s.closeBtn} onClick={() => setEditingId(null)}>✕</button>
            </div>

            <form onSubmit={handleEditSubmit} style={s.form}>
              <div style={s.formGrid}>
                <label style={s.label}>
                  Patient Name
                  <input style={s.input} name="patientName" value={editForm.patientName} onChange={handleEditChange} placeholder="Full name" />
                </label>
                <label style={s.label}>
                  Blood Group
                  <select style={s.input} name="bloodGroup" value={editForm.bloodGroup} onChange={handleEditChange}>
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map((group) => <option key={group} value={group}>{group}</option>)}
                  </select>
                </label>
              </div>

              <div style={s.formGrid}>
                <label style={s.label}>
                  Hospital Name
                  <input style={s.input} name="hospitalName" value={editForm.hospitalName} onChange={handleEditChange} placeholder="Hospital name" />
                </label>
                <label style={s.label}>
                  City
                  <input style={s.input} name="city" value={editForm.city} onChange={handleEditChange} placeholder="City" />
                </label>
              </div>

              <label style={s.label}>
                Contact Number
                <input style={s.input} name="contactNumber" value={editForm.contactNumber} onChange={handleEditChange} placeholder="03XXXXXXXXX" />
              </label>

              <div style={s.modalActions}>
                <button type="button" style={s.cancelBtn} onClick={() => setEditingId(null)}>Cancel</button>
                <button type="submit" style={s.submitBtn}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

const s = {
  hero: { background: "linear-gradient(135deg,#dc2626,#7f1d1d)", padding: "60px 24px 80px", textAlign: "center" },
  heroInner: { maxWidth: 700, margin: "0 auto" },
  pill: { display: "inline-block", background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 999, padding: "6px 18px", fontSize: "0.8rem", fontWeight: 700, marginBottom: 14 },
  heading: { fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", margin: "0 0 10px" },
  sub: { fontSize: "1rem", color: "rgba(255,255,255,0.8)", margin: 0 },
  body: { background: "#f9fafb", minHeight: "60vh", padding: "40px 24px" },
  inner: { maxWidth: 1100, margin: "0 auto" },
  loading: { textAlign: "center", color: "#6b7280", padding: "60px 0" },
  empty: { textAlign: "center", padding: "80px 0" },
  emptyIcon: { fontSize: "3rem", display: "block", marginBottom: 12 },
  emptyTitle: { fontSize: "1.15rem", fontWeight: 800, color: "#111827", margin: "0 0 8px" },
  emptySub: { color: "#6b7280", fontSize: "0.95rem", margin: 0 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 },
  card: { background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  cardTop: { padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  bloodBadge: { fontSize: "1.45rem", fontWeight: 900, color: "#fff", background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 10px" },
  urgencyBadge: { fontSize: "0.72rem", fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.2)", borderRadius: 999, padding: "4px 10px" },
  cardBody: { padding: "18px" },
  patientName: { fontSize: "1rem", fontWeight: 800, color: "#111827", margin: "0 0 10px" },
  infoRow: { display: "flex", gap: 8, alignItems: "center", fontSize: "0.88rem", color: "#4b5563", marginBottom: 6 },
  infoVal: { color: "#374151" },
  date: { fontSize: "0.75rem", color: "#9ca3af", margin: "8px 0 12px" },
  btnRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  fulfillBtn: { flex: 1, background: "#f0fdf4", border: "1.5px solid #86efac", color: "#16a34a", borderRadius: 8, padding: "8px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" },
  fulfilledBtn: { flex: 1, background: "#f3f4f6", border: "1px solid #d1d5db", color: "#6b7280", borderRadius: 8, padding: "8px", fontSize: "0.8rem", fontWeight: 700, cursor: "not-allowed" },
  editBtn: { flex: 1, background: "#eff6ff", border: "1.5px solid #bfdbfe", color: "#2563eb", borderRadius: 8, padding: "8px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" },
  deleteBtn: { flex: 1, background: "#fef2f2", border: "1.5px solid #fecaca", color: "#dc2626", borderRadius: 8, padding: "8px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(17,24,39,0.65)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 },
  modalCard: { width: "100%", maxWidth: 560, background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  modalTitle: { margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#111827" },
  closeBtn: { border: 0, background: "transparent", fontSize: "1.1rem", cursor: "pointer" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: "0.9rem", fontWeight: 700, color: "#374151" },
  input: { border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 12px", fontSize: "0.95rem" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 },
  cancelBtn: { border: "1px solid #d1d5db", background: "#fff", color: "#374151", borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontWeight: 700 },
  submitBtn: { border: 0, background: "#dc2626", color: "#fff", borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontWeight: 700 },
};
