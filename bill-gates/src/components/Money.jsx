import React from "react";

export default function Money({ balance }) {
  return (
    <div className="balance-container">
      ${balance.toLocaleString("en-US")}{" "}
      {/* Virgül ile formatlı para göstergesi */}
    </div>
  );
}
