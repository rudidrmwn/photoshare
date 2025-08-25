import { useState } from "react";
import CommentsPanel from "./CommentsPanel.jsx";

export default function CommentsModal({ photoId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Tombol untuk buka modal */}
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "6px 12px",
          border: "1px solid #ddd",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        💬 Comments
      </button>

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 16,
              width: "100%",
              maxWidth: 500,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0 }}>Comments</h2>
              <button onClick={() => setOpen(false)}>✖</button>
            </div>
            <CommentsPanel photoId={photoId} />
          </div>
        </div>
      )}
    </>
  );
}