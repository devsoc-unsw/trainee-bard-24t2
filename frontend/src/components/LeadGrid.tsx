import React from "react";
import { Container, Grid, SimpleGrid, Skeleton, rem, Space } from '@mantine/core';
import BasicMap from "./BasicMap";
import HomeVitaminsDisplay from "./VitaminsDisplay";
import { HomeSearch } from "./HomeSearch";
import Game from "./Game";
import Surprise from "./Surprise";

const PRIMARY_COL_HEIGHT = rem(300);
const TRIGGER_ANIMATION = false;

export function LeadGrid() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const SUPER_SECONDARY_COL_HEIGHT = `calc(${SECONDARY_COL_HEIGHT} * 1.75  - var(--mantine-spacing-md) * 1.75 )`;
  
  return (
    <Container my="md">

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Top Left Grid */}
        <BasicMap/>
        {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={TRIGGER_ANIMATION} /> */}
        
        <Grid>
        {/* Top Right Grid */}
        <Grid.Col span={12}>
            {/* <Skeleton height={SUPER_SECONDARY_COL_HEIGHT} radius="md" animate={TRIGGER_ANIMATION} /> */}
            <Game height={SUPER_SECONDARY_COL_HEIGHT}/>
        </Grid.Col>

        {/* Middle Higer Right Grid */}
        <Grid.Col span={12}>
            {/* <Skeleton height={SUPER_SECONDARY_COL_HEIGHT} radius="md" animate={TRIGGER_ANIMATION} /> */}
            <Surprise height={SUPER_SECONDARY_COL_HEIGHT}/>
        </Grid.Col>

        </Grid>
        
        {/* Bottom Grid */}
        <Grid gutter="md">
          <Grid.Col span={{ md: 24, sm: 12}}>
            {/* <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={TRIGGER_ANIMATION} /> */}
            <HomeVitaminsDisplay height={SECONDARY_COL_HEIGHT}/>
          </Grid.Col>
        
        </Grid>

      </SimpleGrid>

      <Space h="md" />

      <Grid>
        <Grid.Col span={3.5}></Grid.Col>
        <Grid.Col span="auto">
          <HomeSearch/>
        </Grid.Col>
        <Grid.Col span={3.5}></Grid.Col>
      </Grid>
      
    </Container>
  );
}

export default LeadGrid;