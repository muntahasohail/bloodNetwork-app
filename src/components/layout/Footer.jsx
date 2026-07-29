import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";


const quickLinks = [
  { label: "Home",         to: "/" },
    { label: "About",     to: "/#about" },
  { label: "Features",     to: "/#features" },
  { label: "Reviews",      to: "/#reviews" },
  { label: "Download App", to: "/#download" },
  { label: "Contact Us",   to: "/#contact" },
];




export default function Footer() {
  return (
    <footer style={s.footer}>

      {/* Top wave divider */}
      <div style={s.wave}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#fff5f5" />
        </svg>
      </div>

      <div style={s.container}>

        {/* ── Col 1: Brand ── */}
        <div style={s.col}>
          <div style={s.brandRow}>
            <span style={s.brandIcon}>🩸</span>
            <span style={{color :"#fff", fontSize :"2.3rem" , fontWeight :"bold"}}>Blood Network</span>
          </div>
          <p style={{ ...s.brandTagline, color: "#fff", fontSize: "1.25rem" }}>
            Pakistan's first AI-powered blood donation app. Connecting donors and patients instantly through smart, location-based technology.
          </p>
        
    </div>

        {/* ── Col 2: Quick Links ── */}
        <div style={s.col}>
          <p style={{ ...s.colTitle, color: "#fff", fontSize: "1.23rem" }}>Quick Links</p>
          <ul style={{...s.linkList , color: "#fff", fontSize: "1.5rem"}}>
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} style={s.link}>
                  <span style={s.linkDot}>›</span> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3: Contact ── */}
        <div style={s.col}>
          <p style={{ ...s.colTitle, color: "#fff", fontSize: "1.25rem" }}>Contact Us</p>
          <ul style={{ ...s.linkList, color: "#fff", fontSize: "1.4rem" }}>
            <li style={s.contactRow}>
              <span style={s.contactIcon}>📞</span>
              <a  style={{ ...s.link, color: "#fff", fontSize: "1rem" }}>+92-343-8897337</a>
            </li>
            <li style={s.contactRow}>
              <span style={s.contactIcon}>✉️</span>
              <a style={{ ...s.link, color: "#fff", fontSize: "1rem" }}>BloodNetwork991@gmail.com</a>
            </li>
            <li style={s.contactRow}>
              <span style={s.contactIcon}>
  <FaWhatsapp />
</span>
              <a target="_blank" rel="noreferrer" style={{ ...s.link, color: "#fff", fontSize: "1rem" }}>WhatsApp Us</a>
            </li>
            <li style={s.contactRow}>
              <span style={s.contactIcon}>🌐</span>
              <a
  target="_blank"
  rel="noreferrer"
  style={{ ...s.link, color: "#fff", fontSize: "1rem" }}
>
  BloodNetwork.com.pk
</a>
</li>
            <li style={s.contactRow}>
              <span style={s.contactIcon}>📍</span>
              <span style={{ color: "#fff", fontSize: "1rem" }}>Pakistan</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div style={s.divider} />

      {/* Bottom bar */}
      <div style={s.bottomBar}>
        <p style={s.copyright}>
          © 2026 <span style={{ color: "#fff", fontWeight: 700 }}>BloodNetwork</span>. All rights reserved. Made with ❤️ in Pakistan 🇵🇰
        </p>
        <p style={s.devCredit}>
          Developed by <span style={{ color: "#fff", fontWeight: 700 }}>Debug Nodes</span> 🛠️
        </p>
      </div>

    </footer>
  );
}

const s = {
  footer: {
        background: "linear-gradient(160deg, #9d091e 90%, #9e2b0e 90%, #9d091e 90%)",
    color: "#fff",
    marginTop: "auto",
  },
  wave: {
    lineHeight: 0,
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "52px 24px 36px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.4fr",
    gap: 48,
    flexWrap: "wrap",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  brandIcon: {
    fontSize: "2rem",
    filter: "drop-shadow(0 0 8px #dc262680)",
  },
  brandName: {
    fontSize: "1.8rem",
    fontWeight: 900,
    color: "#fff",
    letterSpacing: "0.02em",
  },
  brandTagline: {
    fontSize: "0.88rem",
    color: "#fff",
    lineHeight: 1.75,
    margin: "0 0 22px",
    maxWidth: 300,
    opacity: 0.85,
  },
  socialRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  socialBtn: {
    width: 40,
    height: 40,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    textDecoration: "none",
    transition: "background 0.2s",
    cursor: "pointer",
  },
  colTitle: {
    fontSize: "0.78rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#dc2626",
    marginBottom: 18,
    margin: "0 0 18px",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "0.9rem",
    opacity: 0.85,
    transition: "opacity 0.2s",
  },
  linkDot: {
    fontSize: "1.3rem",
    color: "#000",
    fontWeight: 900,
    marginRight: 6,
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  contactIcon: {
    fontSize: "1.7rem",
    flexShrink: 0,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.08)",
    maxWidth: 1100,
    margin: "0 auto",
  },
  bottomBar: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  copyright: {
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.5)",
    margin: 0,
  },
  devCredit: {
    fontSize: "0.85rem",
    color: "#fff",
    margin: 0,
  },
};
