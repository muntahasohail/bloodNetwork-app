import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerDonor } from "../features/donors/donorSlice";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function Donate() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { isLoading } = useSelector((s) => s.donors);

  const [formData, setFormData] = useState({
    fullName: "", cnic: "", bloodGroup: "", city: "",
    contactNumber: "", lastDonationDate: "", medicalNotes: "", availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.cnic || !formData.bloodGroup || !formData.city || !formData.contactNumber) {
      alert("Please fill all required fields.");
      return;
    }
    const result = await dispatch(registerDonor({ ...formData, uid: user?.uid }));
    if (registerDonor.fulfilled.match(result)) {
      alert("Registered successfully!");
      setFormData({ fullName: "", cnic: "", bloodGroup: "", city: "", contactNumber: "", lastDonationDate: "", medicalNotes: "", availability: true });
    }
  };

  return (
    <>
      <Navbar />
      <div className="donate-page">
        <div className="donate-card">

          {/* Card Header */}
          <div className="donate-card-header">
            <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 20 }}>
              <span className="donate-drop-icon">🩸</span>
              <div>
                <h2 className="donate-title">Donor Registration</h2>
                <p className="donate-subtitle">Join our life-saving community</p>
              </div>
            </div>
            <div style={ds.headerGlow} />
            <div style={ds.headerGlow2} />
          </div>

          <form className="donate-form" onSubmit={handleSubmit}>

            {/* Section: Personal Info */}
            <p className="form-section-label">Personal Information</p>
             <div className="form-divider">
              <span>Required Fields</span>
            </div>

            <div className="form-grid-2">
              <div className="mb-3">
                <label className="form-label">Full Name <span className="required">*</span></label>
                <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Muhammad Ali" />
              </div>
              <div className="mb-3">
                <label className="form-label">CNIC <span className="required">*</span></label>
                <input type="text" className="form-control" name="cnic" placeholder="42101-1234567-1" value={formData.cnic} onChange={handleChange} />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="mb-3">
                <label className="form-label">Blood Group <span className="required">*</span></label>
                <select className="form-select" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                  <option value="">Select Blood Group</option>
                  {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">City <span className="required">*</span></label>
                <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="Karachi" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Number <span className="required">*</span></label>
              <input type="tel" className="form-control" name="contactNumber" placeholder="03XXXXXXXXX" value={formData.contactNumber} onChange={handleChange} />
            </div>

            {/* Divider */}
            <div className="form-divider">
              <span>Optional Details</span>
            </div>

            <div className="form-grid-2">
              <div className="mb-3">
                <label className="form-label">Last Donation Date</label>
                <input type="date" className="form-control" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Medical Notes</label>
                <textarea className="form-control" rows="3" name="medicalNotes" value={formData.medicalNotes} onChange={handleChange} placeholder="Any relevant medical info..."></textarea>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="availability-row mb-4">
              <div>
                <p className="avail-title">Available to Donate</p>
                <p className="avail-sub">Toggle off if you are currently unavailable</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <button type="submit" className="donate-btn" disabled={isLoading}>
              {isLoading ? 'Registering...' : '🩸 Register as Donor'}
            </button>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

const ds = {
  headerGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    top: -80,
    right: -40,
    filter: "blur(24px)",
    pointerEvents: "none",
  },
  headerGlow2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    bottom: -40,
    left: 60,
    filter: "blur(16px)",
    pointerEvents: "none",
  },
};