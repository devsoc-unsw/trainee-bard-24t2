import React from "react";
import { Image, Overlay, AspectRatio, MantineProvider } from '@mantine/core';
import { useHover } from "@mantine/hooks";

function BasicMap() {
  const { hovered, ref } = useHover();
  return (
    <AspectRatio maw={500} mx="auto" pos="relative" ref={ref}>
      <Image
        radius="md"
        // h={200}
        h={"100%"}
        w="100%"
        fit="contain"
        src="../../src/assets/map_of_aus_purple.png"
        />
      {/* <Overlay color="#000" backgroundOpacity={0.15} blur={10} /> */}
      <Overlay color="#000" backgroundOpacity={hovered ? 0.02:0.04} blur={hovered ? 0:10 } radius={"md"}/>
    </AspectRatio>
  );
}

export default BasicMap;