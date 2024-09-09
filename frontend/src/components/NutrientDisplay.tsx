import React from "react";

function NutrientDisplay({
  name,
  color
}) {
  return (
    <div style={{height: "100%", aspectRatio: "1 / 1", borderRadius: "50%", backgroundColor: color, display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "700"}}>{name}</div>
  )
}

export default NutrientDisplay;