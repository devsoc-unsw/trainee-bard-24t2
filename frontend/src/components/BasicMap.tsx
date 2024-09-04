import React from "react";
import { Image, Overlay, AspectRatio, MantineProvider } from '@mantine/core';
import { useHover } from "@mantine/hooks";
import "./BasicMap.module.css";

function BasicMap() {
  const { hovered, ref } = useHover();
  return (

    // TODO: FIX
    // <div className={background}>

    <AspectRatio maw={500} mx="auto" pos="relative" ref={ref}>
      <Image 
        radius="md"
        // h={200}
        h={"100%"}
        w="100%"
        fit="contain"
        src="../../src/assets/map_of_aus_purple.png"
        />
      <Overlay color="#000" backgroundOpacity={hovered ? 0.02:0.04} blur={hovered ? 0:10 } radius={"md"}/>
    </AspectRatio>

    // </div>
    
  );
}

export default BasicMap;