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
            background: "rgba(0,0,0,0.6)",
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
              borderRadius: 16,
              padding: 24,
              width: "100%",
              maxWidth: 800,
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.3), 0 8px 10px rgba(0,0,0,0.2)",
              animation: "fadeInUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
                💬 Comments
              </h2>
              <button
                onClick={() => setOpen(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✖
              </button>
            </div>

            {/* Isi panel komentar */}
            <CommentsPanel photoId={photoId} />
          </div>

          {/* Animasi sederhana */}
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}