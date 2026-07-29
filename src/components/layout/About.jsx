import { BiItalic } from "react-icons/bi";

export default function About() {
  return (
    <section style={s.section}>

      {/* Top Tag */}
      <div style={s.tagWrap}>
        <span style={s.tag}>Who We Are</span>
      </div>

      {/* Heading */}
      <h2 style={s.heading}>Our Mission &amp; Vision</h2>
      <p style={s.sub}>
        Building a digital blood donation network powered by{' '}
        <span style={s.highlight}>technology</span>,{' '}
        <span style={s.highlight}>community</span>, and{' '}
        <span style={s.highlight}>compassion</span>.
      </p>

      {/* Cards Row */}
      <div style={s.row}>

        {/* Mission */}
        <div style={{ ...s.card, ...s.missionCard }}>
          <div style={s.iconWrap}>
            <span style={s.icon}>🎯</span>
          </div>
          <div style={{ ...s.cardLabel, color: '#dc2626' }}>Our Mission</div>
          <h3 style={s.cardTitle}>Connecting Donors &amp; Recipients</h3>
          <p style={s.cardText}>
            To build a digital blood donation network that saves lives by instantly connecting
            donors and recipients across Pakistan. We leverage AI and location-based technology
            to make every second count in emergencies.
          </p>
          <div style={{ ...s.cardAccent, background: '#dc2626' }} />
        </div>

        {/* Divider dot */}
        <div style={s.dividerDot}>🩸</div>

        {/* Vision */}
        <div style={{ ...s.card, ...s.visionCard }}>
          <div style={s.iconWrap}>
            <span style={s.icon}>🌟</span>
          </div>
          <div style={{ ...s.cardLabel, color: '#b91c1c' }}>Our Vision</div>
          <h3 style={s.cardTitle}>No Life Lost to Blood Shortage</h3>
          <p style={s.cardText}>
            A Pakistan where no life is lost due to lack of blood — powered by technology,
            community, and compassion. We envision a future where every patient finds a donor
            within minutes, regardless of location.
          </p>
          <div style={{ ...s.cardAccent, background: '#b91c1c' }} />
        </div>

      </div>
    </section>
  );
}

const s = {
  section: {
    background: 'linear-gradient(160deg, #fff5f5 0%, #ffffff 60%, #fef2f2 100%)',
    padding: '80px 24px',
    textAlign: 'center',
  },
  tagWrap: {
    marginBottom: 16,
  },
  tag: {
    display: 'inline-block',
    background: '#fef2f2',
    border: '2px solid #fecaca',
    color: '#dc2626',
    borderRadius: 999,
    padding: '6px 20px',
    fontSize: '0.992rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: 800,
    color: '#111827',
    margin: '0 0 16px',
  },
  sub: {
    fontSize: '1.05rem',
    color: '#6b7280',
    maxWidth: 560,
    margin: '0 auto 56px',
    lineHeight: 1.7,
  },
  highlight: {
    color: '#dc2626',
    fontWeight: "550",
  },
  row: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 0,
    flexWrap: 'wrap',
    maxWidth: 960,
    margin: '0 auto',
  },
  card: {
    flex: '1 1 340px',
    background: '#fff',
    borderRadius: 20,
    padding: '40px 36px 48px',
    textAlign: 'left',
    boxShadow: '0 8px 40px rgba(220,38,38,0.10)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  },
  missionCard: {
    borderTop: '4px solid #dc2626',
  },
  visionCard: {
    borderTop: '4px solid #b91c1c',
  },
  iconWrap: {
    width: 52,
    height: 52,
    background: '#fef2f2',
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: '1.8rem',
  },
  cardLabel: {
    fontSize: '1rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 750,
    color: '#111827',
    margin: '0 0 14px',
    lineHeight: 1.3,
  },
  cardText: {
    fontSize: '0.95rem',
    color: '#393939',
    lineHeight: 1.75,
    margin: 0,
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    opacity: 0.15,
  },
  dividerDot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    padding: '0 20px',
    flexShrink: 0,
    alignSelf: 'center',
  },
};
