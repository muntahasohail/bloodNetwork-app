import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../../features/requests/requestSlice";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const EMPTY = { patientName: "", bloodGroup: "", city: "", hospitalName: "", contactNumber: "" };

export default function RequestForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [form, setForm] = useState(EMPTY);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { patientName, bloodGroup, city, hospitalName, contactNumber } = form;
    if (!patientName || !bloodGroup || !city || !hospitalName || !contactNumber) {
      alert("Please fill all required fields.");
      return;
    }
    dispatch(addRequest({
      ...form,
      postedBy: user?.uid || user?.id,
      postedByEmail: user?.email || "",
      fulfilled: false,
      createdAt: new Date().toISOString(),
    }));
    setForm(EMPTY);
    setOpen(false);
  };

  return (
    <div className="req-form-wrapper">
      {!open ? (
        <button className="req-post-btn" onClick={() => setOpen(true)}>
          🩸 Post Urgent Blood Request
        </button>
      ) : (
        <div className="req-form-card">
          <div className="req-form-header">
            <h5>🚨 Urgent Blood Request</h5>
            <button className="req-close-btn" onClick={() => setOpen(false)}>✕</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid-2">
              <div className="mb-3">
                <label className="form-label">Patient Name <span className="required">*</span></label>
                <input className="form-control" name="patientName" value={form.patientName} onChange={handleChange} placeholder="Full name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Required Blood Group <span className="required">*</span></label>
                <select className="form-select" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="mb-3">
                <label className="form-label">Hospital Name <span className="required">*</span></label>
                <input className="form-control" name="hospitalName" value={form.hospitalName} onChange={handleChange} placeholder="e.g. Aga Khan Hospital" />
              </div>
              <div className="mb-3">
                <label className="form-label">City <span className="required">*</span></label>
                <input className="form-control" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Karachi" />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Contact Number <span className="required">*</span></label>
              <input className="form-control" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="03XXXXXXXXX" />
            </div>

            <div className="req-form-actions">
              <button type="button" className="req-cancel-btn" onClick={() => setOpen(false)}>Cancel</button>
              <button type="submit" className="req-submit-btn">Post Request</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
