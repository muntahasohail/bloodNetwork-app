const features = [
  { icon: "🩸", title: "Easy Donor Registration",    desc: "Register as a donor in under 2 minutes with our simple, guided form." },
  { icon: "🔍", title: "Smart Donor Search",          desc: "Search by blood group and city to find the nearest available donor instantly." },
  { icon: "🚨", title: "Emergency Blood Requests",    desc: "Post urgent blood requests that notify nearby donors in real time." },
  { icon: "📍", title: "Location-Based Matching",     desc: "AI-powered matching connects patients with donors in their city within minutes." },
  { icon: "🔒", title: "Secure & Private",            desc: "Your data is protected. CNIC details are masked and never publicly exposed." },
  { icon: "📱", title: "Mobile Friendly",             desc: "Fully responsive design — works seamlessly on any device, anywhere." },
];

export default function Features() {
  return (
    <>
      <style>{`
        @keyframes fadeUpCard {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .feat-card {
          background: #fff;
          border-radius: 20px;
          padding: 36px 28px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          border: 1.5px solid #9d091e;
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
          animation: fadeUpCard 0.5s ease both;
        }
        .feat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(220,38,38,0.14);
          border-color: #fecaca;
        }
        .feat-card:hover .feat-icon-wrap {
          background: #f66161;
        }
        .feat-card:hover .feat-icon-wrap span {
          filter: brightness(10);
        }
        .feat-icon-wrap {
          width: 60px; height: 60px;
          background: #fef2f2;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: background 0.22s;
        }
      `}</style>

      <section style={s.section} id="features">
        <div style={s.headerWrap}>
          <span style={s.pill}>⚡ Why Choose Us</span>
          <h2 style={s.heading}>Everything You Need to Save a Life</h2>
          <p style={s.sub}>Powerful features built to make blood donation fast, safe, and accessible for everyone in Pakistan.</p>
        </div>

        <div style={s.grid}>
          {features.map(({ icon, title, desc }, i) => (
            <div className="feat-card" key={title} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="feat-icon-wrap">
                <span style={{ fontSize: "1.7rem" }}>{icon}</span>
              </div>
              <h3 style={s.cardTitle}>{title}</h3>
              <p style={s.cardDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const s = {
  section: {
    background: "linear-gradient(160deg, #fff5f5 0%, #ffffff 50%, #fef2f2 100%)",
    padding: "80px 24px",
  },
  headerWrap: {
    textAlign: "center",
    marginBottom: 52,
  },
  pill: {
    display: "inline-block",
    background: "#fef2f2",
    border: "1.5px solid #fecaca",
    color: "#dc2626",
    borderRadius: 999,
    padding: "6px 20px",
    fontSize: "0.992rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  heading: {
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
    fontWeight: 900,
    color: "#111827",
    margin: "0 0 14px",
    letterSpacing: "-0.02em",
  },
  sub: {
    fontSize: "1rem",
    color: "#161616",
    maxWidth: 520,
    margin: "0 auto",
    lineHeight: 1.75,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
    maxWidth: 1100,
    margin: "0 auto",
  },
  cardTitle: {
    fontSize: "1.44rem",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 10px",
  },
  cardDesc: {
    fontSize: "0.9rem",
    color: "#303030",
    lineHeight: 1.7,
    margin: 0,
  },
};
