import React from "react";
import { Box, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./NutrientBox.module.css";

type NutrientBox = {
  nutrientName: string;
  nutrientPic: string;
};

export default function FruitBox({ nutrientName, nutrientPic }: NutrientBox) {
  return (
    <>
      <Link to={`/nutrients/${nutrientName}`}>
        <Box className={classes.box} w={"20rem"} h={"8rem"}>
          <img src={nutrientPic} className={classes.fruitImage} />
          <Text fz="1.75rem" fw={600} c="black" mr={"3rem"}>
            {nutrientName}
          </Text>
        </Box>
      </Link>
    </>
  );
}
