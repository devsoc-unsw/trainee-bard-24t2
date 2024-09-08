import React from 'react';
import { Flex, Button, Space } from '@mantine/core';
import styles from "./VitaminButtons.module.css"

function VitaminButton() {
  return (
    <Flex
      gap="60px"
      justify="left"
      align="center"
      direction="row"
      wrap="wrap"
    >
      {/* Padding before the buttons */}
      <Space h="95px" />
      <Button className={styles.RoundedButtonA} >A</Button>
      <Button className={styles.RoundedButtonB} >B</Button>
      <Button className={styles.RoundedButtonC} >C</Button>
      <Button className={styles.RoundedButtonD} >D</Button>
      <Button className={styles.RoundedButtonE} >E</Button>
      <Button className={styles.RoundedButtonPlus} >+</Button>

    </Flex>
  );
}

export default VitaminButton;