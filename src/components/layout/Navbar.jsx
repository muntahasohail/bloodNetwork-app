import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import { BiFontFamily } from "react-icons/bi";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Features", to: "/#features" },
  { label: "Reviews", to: "/#reviews" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  const isActiveLink = (to) => {
    if (to === "/") return pathname === "/" && hash === "";
    return pathname === "/" && hash === to.slice(1);
  };

  const handleNavClick = (e, to) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      if (pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerBrand {
          0%   { background-position: -300px 0; }
          100% { background-position: 300px 0; }
        }
        .nav-link {
          position: relative;
          color: #fff;
          font-size: 1.34rem;
          font-weight: 550;
          text-decoration: none;
          padding: 6px 2px;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2.5px;
          background: #fff;
          border-radius: 999px;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
        .nav-link:hover { color: #fecaca; }
        .nav-btn-login {
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.5);
          color: #fff;
          border-radius: 999px;
          padding: 10px 26px;
          font-size: 1.3rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: background 0.2s, border-color 0.2s;
          backdrop-filter: blur(4px);
        }
        .nav-btn-login:hover {
          background: rgba(255,255,255,0.28);
          border-color: #fff;
        }
        .nav-btn-register {
          background: #fff;
          color: #dc2626;
          border: 2px solid #fff;
          border-radius: 999px;
          padding: 10px 26px;
          font-size: 1.3rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: background 0.2s, color 0.2s;
        }
        .nav-btn-register:hover {
          background: #fef2f2;
          color: #b91c1c;
        }
        @media (max-width: 768px) {
          .nav-link-row { display: none !important; }
          .nav-auth-row { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>

      <nav style={s.nav}>
        <div style={s.inner}>

          {/* Brand */}
          <Link to="/" style={s.brand}>
            <span style={s.brandIcon}>🩸</span>
            <span style={s.brandText}>
              <span style={s.brandBlood}>Blood</span>
              <span style={s.brandNetwork}>Network</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div style={s.linkRow} className="nav-link-row">
            {links.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className={`nav-link${isActiveLink(to) ? " active" : ""}`}
                onClick={(e) => handleNavClick(e, to)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div style={s.authRow} className="nav-auth-row">
            <Link to="/login"    className="nav-btn-login">Login</Link>
            <Link to="/register" className="nav-btn-register">Register</Link>
          </div>

          {/* Hamburger */}
          <button style={s.hamburger} className="nav-hamburger" onClick={() => setMenuOpen((p) => !p)} aria-label="menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={s.mobileMenu}>
            {links.map(({ label, to }) => (
              <Link key={label} to={to} style={s.mobileLink} onClick={(e) => { handleNavClick(e, to); setMenuOpen(false); }}>
                {label}
              </Link>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <Link to="/login"    className="nav-btn-login"    onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="nav-btn-register" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

const s = {
  nav: {
    background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    boxShadow: "0 4px 32px rgba(185,28,28,0.35)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    animation: "navSlideDown 0.4s ease",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 28px",
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    flexShrink: 0,
  },
  brandIcon: {
    fontSize: "2.4rem",
    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
    animation: "floatDrop 3s ease-in-out infinite",
  },
  brandText: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    lineHeight: 1,
  },
  brandBlood: {
    fontSize: "2.7rem",
    fontWeight: 750,
    fontFamily: "'Bodoni Moda SC', serif",
    color: "#fff",
    letterSpacing: "-0.02em",
    textShadow: "0 0 24px rgba(255,255,255,0.35)",
  },
  brandNetwork: {
    fontSize: "2.7rem",
    fontWeight: 750,
fontFamily: "'Bodoni MT', serif",
    background: "linear-gradient(90deg, #fca5a5, #fff, #fff)",
    backgroundSize: "300px 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "shimmerBrand 2.5s linear infinite",
    letterSpacing: "-0.02em",
  },
  linkRow: {
    display: "flex",
    alignItems: "center",
    gap: 36,
    flex: 1,
    justifyContent: "center",
  },
  authRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.6rem",
    cursor: "pointer",
  },
  mobileMenu: {
    background: "#b91c1c",
    padding: "20px 28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  mobileLink: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    textDecoration: "none",
  },
};
