import { useState } from "react";

const reviews = [
  {
    initial: "A",
    name: "Ahmed",
    location: "Islamabad, Pakistan",
    color: "#dc2626",
    story:
      "My uncle needed O-negative blood urgently for his operation at Shifa International Hospital in Islamabad. We were struggling to find a donor. I used E Blood — and within minutes, we connected with a matching donor who came straight to the hospital.",
  },
  {
    initial: "S",
    name: "Saima",
    location: "Lahore, Pakistan",
    color: "#7c3aed",
    story:
      "I needed urgent blood for my mother's surgery and was extremely worried. Someone told me about E Blood — I downloaded the app and within just a few minutes, I found a blood donor who came directly to the hospital. It helped me during one of the most difficult times.",
  },
  {
    initial: "U",
    name: "Usman",
    location: "Karachi, Pakistan",
    color: "#059669",
    story:
      "Our friend's daughter, a thalassemia patient, urgently needed O-positive blood. Time was critical. I used the E Blood app and we found a donor within minutes who came directly to help. The process was smooth, fast, and life-saving.",
  },
];

const PREVIEW_LENGTH = 120;

export default function Reviews() {
  const [expanded, setExpanded] = useState({});

  const toggle = (i) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  return (
    <section style={s.section}>

      {/* Header */}
      <div style={s.headerWrap}>
        <span style={s.pill}>💬 User Stories</span>
        <h2 style={s.heading}>Real Stories, Real Lives Saved</h2>
        <p style={s.sub}>
          Hear from the people whose lives were changed by the{" "}
          <span style={s.brand}>Eblood</span> community.
        </p>
      </div>

      {/* Cards */}
      <div style={s.grid}>
        {reviews.map((r, i) => (
          <div key={i} style={s.card}>

            {/* Big quote mark */}
            <div style={{ ...s.quoteMark, color: r.color + "20" }}>"</div>

            {/* Stars */}
            <div style={s.stars}>{"★★★★★"}</div>

            {/* Story text */}
            <p style={s.story}>
              {expanded[i] ? r.story : r.story.slice(0, PREVIEW_LENGTH) + "..."}
            </p>

            <button
              style={{ ...s.readMore, color: r.color }}
              onClick={() => toggle(i)}
            >
              {expanded[i] ? "Show Less ↑" : "Read More ↓"}
            </button>

            {/* Divider */}
            <div style={{ ...s.divider, background: r.color + "20" }} />

            {/* Author */}
            <div style={s.author}>
              <div style={{ ...s.avatar, background: r.color }}>
                {r.initial}
              </div>
              <div>
                <p style={s.authorName}>{r.name}</p>
                <p style={s.authorLocation}>📍 {r.location}</p>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div style={{ ...s.accentBar, background: r.color }} />
          </div>
        ))}
      </div>

      {/* Bottom stat strip */}
      <div style={s.statStrip}>
        {[["10,000+", "Lives Saved"], ["4.9★", "Average Rating"], ["3 min", "Avg. Donor Found"]].map(([val, label]) => (
          <div key={label} style={s.stat}>
            <span style={s.statVal}>{val}</span>
            <span style={s.statLabel}>{label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}

const s = {
  section: {
    background: "linear-gradient(160deg, #fff5f5 0%, #ffffff 60%, #f5f3ff 100%)",
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
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  heading: {
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
    fontWeight: 800,
    color: "#111827",
    margin: "0 0 14px",
  },
  sub: {
    fontSize: "1rem",
    color: "#6b7280",
    maxWidth: 480,
    margin: "0 auto",
    lineHeight: 1.7,
  },
  brand: {
    color: "#dc2626",
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 28,
    maxWidth: 1100,
    margin: "0 auto 52px",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "36px 30px 28px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  quoteMark: {
    position: "absolute",
    top: -10,
    right: 20,
    fontSize: "9rem",
    fontFamily: "Georgia, serif",
    lineHeight: 1,
    pointerEvents: "none",
    userSelect: "none",
  },
  stars: {
    color: "#f59e0b",
    fontSize: "1.1rem",
    letterSpacing: 2,
    marginBottom: 16,
  },
  story: {
    fontSize: "0.95rem",
    color: "#374151",
    lineHeight: 1.8,
    margin: "0 0 10px",
    position: "relative",
    zIndex: 1,
  },
  readMore: {
    background: "none",
    border: "none",
    fontWeight: 700,
    fontSize: "0.85rem",
    cursor: "pointer",
    padding: 0,
    marginBottom: 20,
  },
  divider: {
    height: 1.5,
    borderRadius: 999,
    marginBottom: 20,
  },
  author: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 800,
    fontSize: "1.2rem",
    flexShrink: 0,
  },
  authorName: {
    fontWeight: 700,
    fontSize: "0.95rem",
    color: "#111827",
    margin: 0,
  },
  authorLocation: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    margin: "3px 0 0",
  },
  accentBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  statStrip: {
    maxWidth: 700,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(220,38,38,0.10)",
    border: "1.5px solid #fecaca",
    display: "flex",
    justifyContent: "space-around",
    padding: "24px 16px",
    flexWrap: "wrap",
    gap: 16,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  statVal: {
    fontSize: "1.6rem",
    fontWeight: 800,
    color: "#dc2626",
  },
  statLabel: {
    fontSize: "0.82rem",
    color: "#6b7280",
    fontWeight: 600,
  },
};
