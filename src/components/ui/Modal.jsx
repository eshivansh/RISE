export default function Modal({ title, children }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-box">
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
