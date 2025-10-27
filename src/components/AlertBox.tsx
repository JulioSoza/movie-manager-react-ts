import React from "react";

type AlertBoxProps = {
  type: "error" | "info";
  children: React.ReactNode;
};

export default function AlertBox({ type, children }: AlertBoxProps) {
  const bg = type === "error" ? "#fdecea" : "#eef5ff";
  const color = type === "error" ? "#b71c1c" : "#0b3d91";

  return (
    <div
      style={{
        backgroundColor: bg,
        color,
        border: `1px solid ${color}`,
        borderRadius: "8px",
        padding: "12px",
        fontSize: "0.9rem",
        maxWidth: "400px",
      }}
    >
      {children}
    </div>
  );
}
