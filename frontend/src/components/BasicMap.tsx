import React from "react";
import { Image, Overlay, AspectRatio, } from '@mantine/core';
import { useHover } from "@mantine/hooks";
import { useNavigate } from 'react-router-dom';
import classes from "./BasicMap.module.css";

function BasicMap() {
  const { hovered, ref } = useHover();
  const navigate = useNavigate();

  return (
    <AspectRatio maw={500} mx="auto" pos="relative" ref={ref} className={classes.Box} onClick={() => navigate("/state-map")}>
      <h3 className={classes.Text1}>See In-Season Fruits by</h3>
      <h2 className={classes.Text2}>Your State</h2>    
      <Image 
        radius="md"
        h={"100%"}
        w="100%"
        fit="contain"
        src="../../src/assets/map_of_aus_purple.png"
        />
      <Overlay color="#fff" backgroundOpacity={0} blur={hovered ? 0:10 } radius={"md"} zIndex={0}/>
    </AspectRatio>
  );
}

export default BasicMap;