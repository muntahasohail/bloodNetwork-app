import { useState } from "react";
import { getBloodCompatibilityDetails } from "../../utils/bloodCompatibility.js";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const COLORS = {
  "A+":  { grad: "linear-gradient(135deg,#dc2626,#b91c1c)", light: "#fff5f5", accent: "#dc2626" },
  "A-":  { grad: "linear-gradient(135deg,#b91c1c,#7f1d1d)", light: "#fff1f1", accent: "#b91c1c" },
  "B+":  { grad: "linear-gradient(135deg,#2563eb,#1d4ed8)", light: "#eff6ff", accent: "#2563eb" },
  "B-":  { grad: "linear-gradient(135deg,#1d4ed8,#1e3a8a)", light: "#eef2ff", accent: "#1d4ed8" },
  "AB+": { grad: "linear-gradient(135deg,#7c3aed,#6d28d9)", light: "#f5f3ff", accent: "#7c3aed" },
  "AB-": { grad: "linear-gradient(135deg,#6d28d9,#4c1d95)", light: "#f3f0ff", accent: "#6d28d9" },
  "O+":  { grad: "linear-gradient(135deg,#059669,#047857)", light: "#ecfdf5", accent: "#059669" },
  "O-":  { grad: "linear-gradient(135deg,#047857,#065f46)", light: "#e8fdf5", accent: "#047857" },
};

export default function BloodCompatibility() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={s.section}>
      <style>{`
        @keyframes floatOrb { 0%,100%{transform:translate(0,0)} 50%{transform:translate(12px,-18px)} }
        .bc-card { transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease; }
        .bc-card:hover { transform: translateY(-10px) scale(1.02); }
        .bc-chip { transition: transform 0.15s ease; }
        .bc-chip:hover { transform: scale(1.12); }
      `}</style>

      <div style={{ ...s.orb, top: -80, left: -60, width: 320, height: 320, background: "radial-gradient(circle,rgba(220,38,38,0.18),transparent 70%)", animationDelay: "0s" }} />
      <div style={{ ...s.orb, bottom: -100, right: -80, width: 380, height: 380, background: "radial-gradient(circle,rgba(124,58,237,0.15),transparent 70%)", animationDelay: "-5s" }} />

      {/* Header */}
      <div style={s.header}>
        <div style={s.pill}>🩸 Safe Blood Matching</div>
        <h2 style={s.heading}>Blood Compatibility Guide</h2>
        <div style={s.headingLine} />
        <p style={s.sub}>
          A quick reference for donation and receiving compatibility.
          Always consult a healthcare professional for medical advice.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={s.grid}>
        {bloodGroups.map((group) => {
          const details = getBloodCompatibilityDetails(group);
          const color = COLORS[group];
          const isSpecial = details?.specialClassification && details.specialClassification !== "—";

          return (
            <div
              key={group}
              className="bc-card"
              style={{
                ...s.card,
                boxShadow: hovered === group
                  ? `0 24px 60px ${color.accent}30, 0 0 0 2px ${color.accent}40`
                  : "0 8px 32px rgba(15,23,42,0.08)",
              }}
              onMouseEnter={() => setHovered(group)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Top Banner */}
              <div style={{ ...s.banner, background: color.grad }}>
                <div style={s.bannerInner}>
                  <span style={s.groupLabel}>{group}</span>
                  {isSpecial && (
                    <span style={s.specialBadge}>★ Universal</span>
                  )}
                </div>
                <div style={{ ...s.bannerGlow, background: color.accent + "40" }} />
              </div>

              {/* Body */}
              <div style={s.body}>
                {/* Donates To */}
                <div style={s.section2}>
                  <div style={s.sectionTitle}>
                    <span style={{ ...s.dot, background: color.accent }} />
                    Donates To
                  </div>
                  <div style={s.chips}>
                    {details?.donateTo.map((g) => (
                      <span key={g} className="bc-chip" style={{ ...s.chip, background: color.light, color: color.accent, border: `1.5px solid ${color.accent}25` }}>
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={s.divider} />

                {/* Receives From */}
                <div style={s.section2}>
                  <div style={s.sectionTitle}>
                    <span style={{ ...s.dot, background: "#16a34a" }} />
                    Receives From
                  </div>
                  <div style={s.chips}>
                    {details?.receiveFrom.map((g) => (
                      <span key={g} className="bc-chip" style={{ ...s.chip, background: "#f0fdf4", color: "#16a34a", border: "1.5px solid #86efac50" }}>
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {isSpecial && (
                  <div style={{ ...s.specialRow, borderColor: color.accent + "30", background: color.light }}>
                    <span style={{ color: color.accent, fontWeight: 700, fontSize: "0.85rem" }}>
                      ★ {details.specialClassification}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div style={s.note}>
        <div style={s.noteIconWrap}>💡</div>
        <p style={s.noteText}>
          <strong>O−</strong> is the universal red cell donor &nbsp;·&nbsp;
          <strong>AB+</strong> is the universal recipient &nbsp;·&nbsp;
          <strong>AB−</strong> is the universal plasma donor
        </p>
      </div>
    </section>
  );
}

const s = {
  section: {
    position: "relative",
    background: "linear-gradient(160deg,#fdfcfb 0%,#fff 50%,#f8f5ff 100%)",
    padding: "96px 24px 80px",
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(10px)",
    animation: "floatOrb 12s ease-in-out infinite",
    pointerEvents: "none",
  },
  header: {
    textAlign: "center",
    marginBottom: 64,
    position: "relative",
    zIndex: 1,
  },
  pill: {
    display: "inline-block",
    background: "linear-gradient(135deg,#fef2f2,#fff5f5)",
    border: "1.5px solid #fecaca",
    color: "#dc2626",
    borderRadius: 999,
    padding: "8px 24px",
    fontSize: "0.993rem",
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 20,
    boxShadow: "0 4px 14px rgba(220,38,38,0.12)",
  },
  heading: {
    fontSize: "clamp(2rem,4vw,3rem)",
    fontWeight: 800,
    color: "#0f172a",
    margin: "0 0 16px",
    letterSpacing: "-0.02em",
  },
  headingLine: {
    width: 60,
    height: 4,
    background: "linear-gradient(90deg,#dc2626,#7c3aed)",
    borderRadius: 999,
    margin: "0 auto 20px",
  },
  sub: {
    fontSize: "1.07rem",
    color: "#64748b",
    maxWidth: 520,
    margin: "0 auto",
    lineHeight: 1.8,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
    gap: 28,
    maxWidth: 1120,
    margin: "0 auto 52px",
    position: "relative",
    zIndex: 1,
  },
  card: {
    background: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    cursor: "default",
    border: "1px solid #f1f5f9",
  },
  banner: {
    padding: "22px 22px 18px",
    position: "relative",
    overflow: "hidden",
  },
  bannerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 1,
  },
  bannerGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    top: -40,
    right: -30,
    filter: "blur(20px)",
  },
  groupLabel: {
    fontSize: "2.4rem",
    fontWeight: 900,
    color: "#fff",
    letterSpacing: "0.02em",
    fontFamily: "'Cormorant Garamond', serif",
    textShadow: "0 2px 12px rgba(0,0,0,0.2)",
  },
  specialBadge: {
    background: "rgba(255,255,255,0.22)",
    backdropFilter: "blur(4px)",
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: 600,
    borderRadius: 999,
    padding: "5px 12px",
    border: "1px solid rgba(255,255,255,0.3)",
    letterSpacing: "0.05em",
  },
  body: {
    padding: "20px 20px 22px",
  },
  section2: {
    marginBottom: 4,
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.85rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#2c2c2c",
    marginBottom: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    flexShrink: 0,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
  },
  chip: {
    borderRadius: 999,
    padding: "4px 12px",
    fontSize: "0.8rem",
    fontWeight: 700,
    cursor: "default",
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg,transparent,#e2e8f0,transparent)",
    margin: "14px 0",
  },
  specialRow: {
    marginTop: 16,
    border: "1.5px solid",
    borderRadius: 12,
    padding: "9px 14px",
    textAlign: "center",
  },
  note: {
    maxWidth: 680,
    margin: "0 auto",
    background: "#fff",
    border: "1.9px solid #fecaca",
    borderRadius: 18,
    padding: "20px 28px",
    display: "flex",
    alignItems: "center",
    gap: 18,
    boxShadow: "0 8px 32px rgba(220,38,38,0.08)",
    position: "relative",
    zIndex: 1,
  },
  noteIconWrap: {
    fontSize: "1.9rem",
    flexShrink: 0,
    background: "#fef2f2",
    borderRadius: "50%",
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noteText: {
    fontSize: "1.15rem",
    color: "#393939",
    margin: 0,
    lineHeight: 1.7,
  },
};
