import img8 from "../../assets/images/images 8.jpg";

const stats = [
  { icon: "🩸", value: "150+",  label: "Registered Donors" },
  { icon: "🚨", value: "35",    label: "Urgent Requests" },
  { icon: "🏥", value: "8",     label: "Blood Groups" },
  { icon: "📍", value: "20+",   label: "Cities Covered" },
];

export default function Stats() {
  return (
    <>
      <style>{`
        @keyframes statPop {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        .stat-card {
          text-align: center;
          padding: 36px 24px;
          border-radius: 20px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          transition: transform 0.2s, background 0.2s;
          animation: statPop 0.5s ease both;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          background: rgba(255,255,255,0.15);
        }
      `}</style>

      <section style={s.section}>
        <div style={s.headerWrap}>
          <span style={s.pill}>📊 Our Impact</span>
          <h2 style={s.heading}>Numbers That Matter</h2>
        </div>

        <div style={s.grid}>
          {stats.map(({ icon, value, label }, i) => (
            <div className="stat-card" key={label} style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={s.iconWrap}>{icon}</div>
              <p style={s.value}>{value}</p>
              <p style={s.label}>{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const s = {
  section: {
    backgroundImage: `linear-gradient(135deg, rgba(180,0,0,0.82) 100%, rgba(80,0,0,0.88) 100%, rgba(20,0,0,0.93) 100%), url(${img8})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "80px 24px",
  },
  headerWrap: {
    textAlign: "center",
    marginBottom: 48,
  },
  pill: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    border: "1.5px solid rgba(255,255,255,0.3)",
    color: "#fff",
    borderRadius: 999,
    padding: "6px 20px",
    fontSize: "0.99rem",
    fontWeight: 750,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  heading: {
    fontSize: "2.9rem",
    fontWeight: 900,
    color: "#fff",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 24,
    maxWidth: 900,
    margin: "0 auto",
  },
  iconWrap: {
    fontSize: "2.2rem",
    marginBottom: 14,
  },
  value: {
    fontSize: "2.8rem",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 6px",
    letterSpacing: "-0.02em",
  },
  label: {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.7)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    margin: 0,
  },
};
