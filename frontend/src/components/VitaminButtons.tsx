import React from 'react';
import { Flex, Button, Space } from '@mantine/core';
import styles from "./VitaminButtons.module.css"

function VitaminButton() {
  return (
    <Flex className = {styles.flex}>
      <Button className={`${styles.RoundedButton} ${styles.One}`} >A</Button>
      <Button className={`${styles.RoundedButton} ${styles.Two}`} >B</Button>
      <Button className={`${styles.RoundedButton} ${styles.Three}`} >C</Button>
      <Button className={`${styles.RoundedButton} ${styles.Four}`} >D</Button>
      <Button className={`${styles.RoundedButton} ${styles.Five}`} >E</Button>
      <Button className={`${styles.RoundedButton} ${styles.Six}`} >K</Button>
    </Flex>
  );
}

export default VitaminButton;