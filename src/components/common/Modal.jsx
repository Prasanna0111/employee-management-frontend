import { useEffect } from "react";

export default function Modal({ children, title, footer, isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div className="text-2xl primary modal-title">{title}</div>
          <button className="cls-btn text-lg" onClick={onClose}>
            x
          </button>
        </div>
        {children}
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );
}
