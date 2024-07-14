import React, { useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function SeasonalFruits() {
  const { state } = useParams();

  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(async () => {
    try {
      const response = await axios.get(`http://localhost:5180/seasonal-fruits?state=${state}`, {
        method: 'GET',
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, [state]);

  return (
    <div>
      <h1>Seasonal Fruits for {state}</h1>
    </div>
  );
}

export default SeasonalFruits;
