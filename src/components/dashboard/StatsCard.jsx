export default function StatsCard({ title, value }) {
  return (
    <div className="card p-3 h-100">
      <h6>{title}</h6>
      <h3>{value}</h3>
    </div>
  );
}
