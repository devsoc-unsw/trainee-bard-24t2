import React from 'react';
import { Flex, Button, Space } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from "./VitaminButtons.module.css"

function VitaminButton() {
  return (
    <Flex className = {styles.flex}>

      <Link to="/nutrients/Vitamin-A">
        <Button className={`${styles.RoundedButton} ${styles.One}`} >A</Button>
      </Link>

      <Link to="/nutrients/Vitamin-B1">
        <Button className={`${styles.RoundedButton} ${styles.Two}`} >B</Button>
      </Link>

      <Link to="/nutrients/Vitamin-C">
        <Button className={`${styles.RoundedButton} ${styles.Three}`} >C</Button>
      </Link>

      {/* I banish thee, Vitamin D */}
      {/* <Link to="/nutrients/Vitamin-D">
        <Button className={`${styles.RoundedButton} ${styles.Four}`} >D</Button>
      </Link> */}
      
      <Link to="/nutrients/Vitamin-E">
        <Button className={`${styles.RoundedButton} ${styles.Five}`} >E</Button>
      </Link>

      <Link to="/nutrients/Vitamin-K">
        <Button className={`${styles.RoundedButton} ${styles.Six}`} >K</Button>
      </Link>

    </Flex>
  );
}

export default VitaminButton;