import { useSelector } from "react-redux";
import heroImg from "../../assets/images/img 6.jpg";

export default function Hero() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-22px) rotate(8deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(-6deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          background: rgba(20,0,0,0.65);
          border: 1.5px solid rgba(255, 100, 100, 0.5);
          color: #fff;
          border-radius: 999px;
          padding: 9px 22px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          animation: fadeUp 0.5s ease both;
        }
        .hero-badge-dot {
          width: 8px; height: 8px;
          background: #fca5a5;
          border-radius: 50%;
          position: relative;
        }
        .hero-badge-dot::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: #fca5a5;
          animation: pulse-ring 1.4s ease-out infinite;
        }
        .hero-heading {
          font-size: 3.85rem;
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin: 20px 0 0;
          animation: fadeUp 0.6s 0.1s ease both;
          letter-spacing: -0.02em;
          font-family: initial;
          text-shadow: 0 4px 32px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8);
        }
        .hero-heading span {
          background: linear-gradient(90deg, #ff4444, #ff8080, #ff4444);
          background-size: 400px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2.5s linear infinite;
          filter: drop-shadow(0 2px 8px rgba(220,38,38,0.6));
        }
        .hero-sub {
          font-size: 1.45rem;
          color: rgba(255, 255, 255, 0.95);
          max-width: 620px;
          margin: 22px auto 0;
          line-height: 1.8;
          animation: fadeUp 0.6s 0.2s ease both;
          font-family: fangsong;
          text-shadow: 0 2px 16px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8);
          font-weight: 500;
        }
        .hero-divider {
          width: 65px;
          height: 5px;
          background: linear-gradient(90deg, #fca5a5, #fff);
          border-radius: 999px;
          margin: 28px auto 0;
          animation: fadeUp 0.6s 0.25s ease both;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          margin-top: 72px;
          animation: fadeUp 0.6s 0.35s ease both;
          background: rgba(10,0,0,0.72);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 100, 100, 0.3);
          border-radius: 20px;
          padding: 20px 10px;
          max-width: 680px;
          width: 100%;
        }
        .hero-stat-item {
          text-align: center;
          flex: 1;
          min-width: 120px;
          padding: 8px 16px;
          border-right: 1px solid rgba(255, 100, 100, 0.25);
        }
        .hero-stat-item:last-child { border-right: none; }
        .hero-stat-val {
          font-size: 1.9rem;
          font-weight: 800;
          display: block;
          color: #ff6b6b;
          font-family: fangsong;
          text-shadow: 0 2px 8px rgba(220,38,38,0.4);
        }
        .hero-stat-label {
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 4px;
          display: block;
        }
        .float-drop {
          position: absolute;
          font-size: 2.4rem;
          opacity: 0.22;
          pointer-events: none;
          user-select: none;
        }
      `}</style>

      <section style={s.section}>
        {/* Full-page background image */}
        <img src={heroImg} alt="" style={s.bgImage} />

        {/* Dark gradient overlay */}
        <div style={s.overlay} />

        {/* Floating drops */}
        <span className="float-drop" style={{ top: "12%", left: "6%",  animationName: "float1", animationDuration: "4s",   animationIterationCount: "infinite" }}>🩸</span>
        <span className="float-drop" style={{ top: "60%", left: "3%",  animationName: "float2", animationDuration: "5s",   animationIterationCount: "infinite" }}>🩸</span>
        <span className="float-drop" style={{ top: "20%", right: "5%", animationName: "float3", animationDuration: "3.5s", animationIterationCount: "infinite" }}>🩸</span>
        <span className="float-drop" style={{ top: "70%", right: "8%", animationName: "float1", animationDuration: "4.5s", animationIterationCount: "infinite" }}>🩸</span>
        <span className="float-drop" style={{ top: "40%", left: "10%", animationName: "float2", animationDuration: "6s",   animationIterationCount: "infinite", fontSize: "1.4rem" }}>❤️</span>
        <span className="float-drop" style={{ top: "30%", right: "12%",animationName: "float3", animationDuration: "5.5s", animationIterationCount: "infinite", fontSize: "1.4rem" }}>❤️</span>

        {/* Content on top of image */}
        <div style={s.content}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            🇵🇰 Pakistan's First AI Blood Donation App
          </div>

          { <h1 className="hero-heading">
            Donate Blood,<br />
            <span>Save Lives</span>
          </h1> }

          <div className="hero-divider" />

          { <p className="hero-sub">
            Connecting Donors, Saving Lives — Powered by AI and location-based technology across Pakistan.
          </p> }

          {<div className="hero-stats">
            {[["10,000+","Lives Saved"], ["3 min","Avg. Donor Found"], ["50+","Cities Covered"], ["4.9 ★","App Rating"]].map(([val, label]) => (
              <div className="hero-stat-item" key={label}>
                <span className="hero-stat-val">{val}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div> }
          </div>
        

        {/* Bottom curve */}
        <div style={s.curve}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff5f5" />
          </svg>
        </div>
      </section>
    </>
  );
}

const s = {
  section: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    paddingBottom: 0,
  },
  bgImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "auto",
    objectFit: "cover",
    objectPosition: "center",
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(20,0,0,0.65) 60%, rgba(10,0,0,0.85) 100%)",
    zIndex: 1,
  },
  content: {
    textAlign: "center",
    color: "#000",
    padding: "0 24px 60px",
    maxWidth: 780,
    position: "absolute",
    bottom: "18%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  curve: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
};
