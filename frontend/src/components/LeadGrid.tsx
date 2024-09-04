import React from "react";
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import BasicMap from "./BasicMap";

const PRIMARY_COL_HEIGHT = rem(300);
const TRIGGER_ANIMATION = false;

export function LeadGrid() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const SUPER_SECONDARY_COL_HEIGHT = `calc(${SECONDARY_COL_HEIGHT} * 1.75  - var(--mantine-spacing-md) * 1.75 )`;

  // TODO: FIX
  document.body.className = "blue";
  
  return (
    <Container my="md">
      
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Top Left Grid */}
        <BasicMap/>
        {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={TRIGGER_ANIMATION} /> */}
        
        <Grid>
        {/* Top Right Grid */}
        <Grid.Col span={12}>
            <Skeleton height={SUPER_SECONDARY_COL_HEIGHT} radius="md" animate={TRIGGER_ANIMATION} />
        </Grid.Col>

        {/* Middle Higer Right Grid */}
        <Grid.Col span={12}>
            <Skeleton height={SUPER_SECONDARY_COL_HEIGHT} radius="md" animate={TRIGGER_ANIMATION} />
        </Grid.Col>

        </Grid>
        
        {/* Bottom Grid */}
        <Grid gutter="md">
          <Grid.Col span={{ md: 24, sm: 12}}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={TRIGGER_ANIMATION} />
          </Grid.Col>
        
        </Grid>

      </SimpleGrid>

    </Container>
  );
}

export default LeadGrid;