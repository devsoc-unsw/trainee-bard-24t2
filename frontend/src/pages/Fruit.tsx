import React from "react";
import { useParams } from "react-router-dom";

function Fruit() {
  const { fruitId } = useParams();

  return (
    <div>
      <h1>da fruit {fruitId}</h1>
    </div>
  );
}

export default Fruit;
