import React from "react";
import { Box, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./FruitBox.module.css";

type FruitBox = {
  fruitId: number;
  fruitName: string;
  fruitPic: string;
  fruitSeasonality: string;
};

export default function FruitBox({
  fruitId,
  fruitName,
  fruitPic,
  fruitSeasonality,
}: FruitBox) {
  const seasonColour = (fruitSeasonality: string): string => {
    switch (fruitSeasonality) {
      case "inSeason":
        return "#71DD5F";
      case "likely":
        return "#FFC342";
      case "notInSeason":
        return "#F3725E";
      case "none":
        return "transparent";
      default:
        return "transparent";
    }
  };

  return (
    <>
      <Link to={`/fruit/${fruitId}`}>
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
