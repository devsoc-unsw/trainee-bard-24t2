import React from "react";
import { Box, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./FruitBox.module.css";

type FruitBox = {
  fruitName: string;
  fruitPic: string;
  fruitSeasonality: number;
};

export default function FruitBox({
  fruitName,
  fruitPic,
  fruitSeasonality,
}: FruitBox) {
  const seasonColour = (fruitSeasonality: number): string => {
    switch (fruitSeasonality) {
      case 1:
        return "#71DD5F";
      case 0:
        return "#FFC342";
      case -1:
        return "#F3725E";
      case -2:
        return "transparent";
      default:
        return "transparent";
    }
  };

  return (
    <>
      <Link to={`/fruit/${fruitName}`}>
        <Box
          className={classes.box}
          bd={`5px solid ${seasonColour(fruitSeasonality)}`}
          w={"16rem"}
          h={"14rem"}
        >
          <img src={fruitPic} className={classes.fruitImage} />
          <Text fz="1.15rem" fw={600} c="black">
            {fruitName}
          </Text>
        </Box>
      </Link>
    </>
  );
}
