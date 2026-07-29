const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SearchDonor({ filters, onChange, onSearch }) {
  return (
    <div className="donor-filters" style={{ marginBottom: 20 }}>
      <input
        className="form-control"
        placeholder="🔍  Search by city..."
        value={filters.city}
        onChange={(e) => onChange({ ...filters, city: e.target.value })}
      />
      <select
        className="form-select"
        value={filters.bloodGroup}
        onChange={(e) => onChange({ ...filters, bloodGroup: e.target.value })}
      >
        <option value="">All Blood Groups</option>
        {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
      </select>
      <button
        onClick={onSearch}
        style={{
          background: 'linear-gradient(135deg,#dc2626,#b91c1c)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </div>
  );
}
