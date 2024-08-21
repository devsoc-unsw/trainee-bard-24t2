import React from "react";
import { Grid, Skeleton, Container, rem } from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(100);

function GridLayout() {
  return (
    <Container my="md">
    <Grid grow gutter="lg">
      <Grid.Col span={4}>1</Grid.Col>
      <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
      <Grid.Col span={4}>4</Grid.Col>
      <Grid.Col span={4}>5</Grid.Col>
    </Grid>
    </Container>
    
  );
}

export default GridLayout;