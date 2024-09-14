import React from "react";
import { Container, Grid, SimpleGrid, Space } from '@mantine/core';
import BasicMap from "./BasicMap";
import HomeVitaminsDisplay from "./VitaminsDisplay";
import { HomeSearch } from "./HomeSearch";
import GameLink from "./GameLink";
import Surprise from "./Surprise";

export function LeadGrid() {  
  return (
    <Container my="md">

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Top Left Grid */}
        <BasicMap/>

        <Grid>
          {/* Top Right Grid */}
          <Grid.Col span={12}>
            <GameLink/>
          </Grid.Col>

          {/* Middle Higer Right Grid */}
          <Grid.Col span={12}>
            <Surprise/>
          </Grid.Col>

        </Grid>
        
        {/* Bottom Grid */}
        <Grid gutter="md">
          <Grid.Col span={{ md: 24, sm: 12}}>
            <HomeVitaminsDisplay/>
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