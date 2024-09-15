import React from "react";
import { Box, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./AlcoholicBox.module.css";

type FruitBox = {
  fruitName: string;
  fruitPic: string;
  fruitSeasonality: number;
};

export default function FruitBox() {
 
  return (
    <>
      <Link to={`https://www.health.gov.au/contacts/alcoholics-anonymous-aa-australia-contact?language=en`}
      target = "_blank">
        <Box
          className={classes.box}
          w={"40rem"}
          h={"35rem"}
        >

          <img src={"https://i.pinimg.com/originals/8e/eb/0c/8eeb0cd1ed319254eb2b6940ff28215d.gif"} className={classes.fruitImage} />
          <Text fz="1.1rem" fw={500} c="black">
          https://www.health.gov.au/contacts/alcoholics-anonymous-aa-australia-contact?language=en
          </Text>
        </Box>
      </Link>
    </>
  );
}
