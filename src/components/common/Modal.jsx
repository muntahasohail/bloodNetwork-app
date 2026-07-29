export default function Modal({ children, open = false }) {
  if (!open) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
