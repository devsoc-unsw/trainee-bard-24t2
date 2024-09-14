import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Text, Button } from "@mantine/core";
import ausMap from "../assets/aus-map.png";
import nswVector from "../assets/nsw-vector.png";
import nswVectorPurple from "../assets/nsw-vector-purple.png";
import classes from "./StateMap.module.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

function StateMap() {
  const [currImage, setCurrImage] = useState(nswVector);
  const [selectedState, setSelectedState] = useState("");
  const [isSeletected, setIsSelected] = useState(false);

  const handleClick = (state) => {
    if (state === "NSW") {
      
      setCurrImage(nswVectorPurple);
      setSelectedState(state);
      setIsSelected(true);
    }
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.innerContainer}>
        <Text fz="3.5rem" fw={600} c="black" mt={8}>
          Which state are you in?
        </Text>
        <img src={ausMap} className={classes.stateImage} />
        <img
          src={currImage}
          className={classes.nswImage}
          onClick={() => handleClick("NSW")}
        />
        <div className={classes.buttonContainer}>
          <Link to={`/seasonal-fruits/${selectedState}`}>
            <Button
              className={classes.button}
              rightSection={<FaArrowRight />}
              variant="outline"
              size="lg"
              radius="md"
              fw={500}
              disabled={!isSeletected}
            >
              See fruits
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StateMap;
