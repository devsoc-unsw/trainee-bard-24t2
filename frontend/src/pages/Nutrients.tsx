import React from "react";
import { useParams } from "react-router-dom";

function Nutrients() {
  const { nutrientId } = useParams();

  return (
    <div>
      <h1>Fruits high in {nutrientId}</h1>
    </div>
  );
}

export default Nutrients;
