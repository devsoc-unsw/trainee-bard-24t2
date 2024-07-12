import React from "react";
import { useParams } from "react-router-dom";

function SeasonalFruits() {
  const { state } = useParams();

  return (
    <div>
      <h1>Seasonal Fruits for {state}</h1>
    </div>
  );
}

export default SeasonalFruits;
