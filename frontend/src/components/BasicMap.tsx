import React from "react";
import { Image } from '@mantine/core';

function BasicMap() {
  return (
    <Image
      radius="md"
      // h={200}
      h={"100%"}
      w="100%"
      fit="contain"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
    />
  );
}

export default BasicMap;