const maskCnic = (cnic = "") => {
  // expects format: 42101-1234567-1
  const parts = cnic.split("-");
  if (parts.length === 3) return `*****-${parts[1]}-*`;
  return "*****-*******-*";
};

const BLOOD_COLORS = {
  "A+": "#dc2626", "A-": "#b91c1c",
  "B+": "#2563eb", "B-": "#1d4ed8",
  "AB+": "#7c3aed", "AB-": "#6d28d9",
  "O+": "#059669", "O-": "#047857",
};

export default function DonorCard({ donor }) {
  const bgColor = BLOOD_COLORS[donor.bloodGroup] || "#dc2626";

  return (
    <div className="donor-card">
      <div className="donor-card-top" style={{ background: bgColor }}>
        <span className="donor-blood-badge">{donor.bloodGroup || "?"}</span>
        <span className={`donor-avail-badge ${donor.availability ? "avail-yes" : "avail-no"}`}>
          {donor.availability ? "● Available" : "● Unavailable"}
        </span>
      </div>

      <div className="donor-card-body">
        <h5 className="donor-name">{donor.fullName || donor.name || "—"}</h5>

        <div className="donor-info-row">
          <span>📍</span>
          <span>{donor.city || "—"}</span>
        </div>
        <div className="donor-info-row">
          <span>📞</span>
          <span>{donor.contactNumber || "—"}</span>
        </div>
        <div className="donor-info-row donor-cnic">
          <span>🪪</span>
          <span>{maskCnic(donor.cnic)}</span>
        </div>
      </div>
    </div>
  );
}
