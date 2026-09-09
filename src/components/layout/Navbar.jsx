import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const links = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/#about" },
  { label: "Features", to: "/#features" },
  { label: "Reviews",  to: "/#reviews" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const navStyle = {
    ...s.nav,
    background: scrolled
      ? "linear-gradient(135deg, rgba(185,28,28,0.97) 0%, rgba(127,29,29,0.97) 100%)"
      : "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    boxShadow: scrolled ? "0 8px 40px rgba(185,28,28,0.45)" : "0 4px 24px rgba(185,28,28,0.3)",
    backdropFilter: scrolled ? "blur(20px)" : "none",
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
        @keyframes dropPulse {
          0%,100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 8px rgba(255,255,255,0.5)); }
          50%      { transform: scale(1.15) rotate(-8deg); filter: drop-shadow(0 0 16px rgba(255,255,255,0.8)); }
        }
        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.9);
          font-size: 1.3rem;
          font-weight: 600;
          text-decoration: none;
          padding: 8px 4px;
          letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #fca5a5, #fff);
          border-radius: 999px;
          transition: width 0.28s cubic-bezier(.4,0,.2,1);
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link:hover { color: #fff; }
        .nav-link.active { color: #fff; }
        .nav-btn-login {
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.35);
          color: #fff;
          border-radius: 10px;
          padding: 9px 22px;
          font-size: 0.94rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.22s;
          backdrop-filter: blur(8px);
        }
        .nav-btn-login:hover {
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-1px);
        }
        .nav-btn-register {
          background: #fff;
          color: #dc2626;
          border: 1.5px solid #fff;
          border-radius: 10px;
          padding: 9px 22px;
          font-size: 0.95rem;
          font-weight: 800;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.22s;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .nav-btn-register:hover {
          background: #fef2f2;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        @media (max-width: 768px) {
          .nav-link-row { display: none !important; }
          .nav-auth-row { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={navStyle}>
        {/* Subtle top border glow */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)" }} />

        <div style={s.inner}>
          <Link to="/" style={s.brand}>
            <span style={s.brandIcon}>🩸</span>
            <span style={s.brandText}>
              <span style={s.brandBlood}>Blood</span>
              <span style={s.brandNetwork}>Network</span>
            </span>
          </Link>

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

          <div style={s.authRow} className="nav-auth-row">
            <Link to="/login"    className="nav-btn-login">Login</Link>
            <Link to="/register" className="nav-btn-register">Register</Link>
          </div>

          <button style={s.hamburger} className="nav-hamburger" onClick={() => setMenuOpen((p) => !p)} aria-label="menu">
            <span style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <span style={{ ...s.bar, transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "none" }} />
              <span style={{ ...s.bar, transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div style={s.mobileMenu}>
            {links.map(({ label, to }) => (
              <Link key={label} to={to} style={s.mobileLink} onClick={(e) => { handleNavClick(e, to); setMenuOpen(false); }}>
                {label}
              </Link>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
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
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 99,
    width: "100%",
    paddingTop: 4,
    paddingBottom: 5,
    animation: "navSlideDown 0.4s ease",
    transition: "background 0.3s, box-shadow 0.3s",
    overflow: "hidden",
  },
  inner: {
    maxWidth: 1500,
    margin: "0 auto",
    padding: "0 28px",
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    flexShrink: 0,
  },
  brandIcon: {
    fontSize: "2rem",
    animation: "dropPulse 3s ease-in-out infinite",
  },
  brandText: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    lineHeight: 1,
  },
  brandBlood: {
    fontSize: "2rem",
    fontWeight: 800,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    color: "#fff",
    letterSpacing: "-0.02em",
  },
  brandNetwork: {
    fontSize: "1.88rem",
    fontWeight: 800,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: "linear-gradient(90deg, #fca5a5, #fff, #fca5a5)",
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
    gap: 32,
    flex: 1,
    justifyContent: "center",
  },
  authRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    display: "block",
    width: 22,
    height: 2,
    background: "#fff",
    borderRadius: 2,
    transition: "all 0.25s ease",
  },
  mobileMenu: {
    background: "rgba(127,29,29,0.97)",
    backdropFilter: "blur(20px)",
    padding: "20px 28px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  mobileLink: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: 600,
    fontSize: "1.555rem",
    textDecoration: "none",
    letterSpacing: "0.02em",
  },
};
