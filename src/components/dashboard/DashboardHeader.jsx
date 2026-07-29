export default function DashboardHeader({ name }) {
  return (
    <div style={s.header}>
      <div style={s.left}>
        <p style={s.tag}>👋 Welcome back</p>
        <h2 style={s.name}>{name}</h2>
      </div>
      <span style={s.drop}>🩸</span>
    </div>
  );
}

const s = {
  header: { background:'linear-gradient(135deg,#dc2626,#7f1d1d)', borderRadius:18, padding:'28px 32px', marginBottom:32, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 8px 32px rgba(220,38,38,0.25)' },
  left:   {},
  tag:    { color:'rgba(255,255,255,0.7)', fontSize:'0.82rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', margin:'0 0 6px' },
  name:   { color:'#fff', fontSize:'1.8rem', fontWeight:900, margin:0, letterSpacing:'-0.02em' },
  drop:   { fontSize:'3.5rem', opacity:0.25 },
};
