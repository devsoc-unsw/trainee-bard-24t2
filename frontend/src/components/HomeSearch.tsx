import React, { useEffect, useState } from 'react';
import { useMantineTheme, Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface Word {
  type: string,
  word: string
}


export function HomeSearch() {
  const theme = useMantineTheme();
  const [data, setData] = useState<string[]>([]);
  const [words, setwords] = useState<Word[]>([]);
  const navigate = useNavigate();


  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5180/valid-search-terms/`);
        const uniqueWords:string[] = Array.from(new Set(response.data.map(item => item.word)));
        setData(uniqueWords);
        setwords(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    const handleItemSubmit = (value: string) => {
    const selectedItem = words.find(item => item.word === value);

    if (selectedItem) {
      if (selectedItem.type === 'fruit') {
        navigate(`/Fruit/${value}`); 
      } else if (selectedItem.type === 'nutrient') {
        navigate(`/nutrients/${value}`);
      }
    } else {
      console.error('Selected value not found in words.');
    }
  };

  return (
    <Autocomplete
      placeholder="Search for a fruit or nutrient"
      rightSection={<IconSearch />}
      rightSectionPointerEvents="none"
      radius={100}
      data={data}
      onOptionSubmit={handleItemSubmit} 
      />
  );
} 