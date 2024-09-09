import React from 'react';
import { useMantineTheme, Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export function HomeSearch() {
  const theme = useMantineTheme();

  return (
    <Autocomplete
      placeholder="Search for a fruit or nutrient"
      rightSection={<IconSearch />}
      rightSectionPointerEvents="none"
      radius={100}
      />
  );
} 