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
  const [words, setwords] = useState<Word[]>([]);
  const [fruits, setFruits] = useState<string[]>([]);
  const [nutrients, setNutrients] = useState<string[]>([]);
  const navigate = useNavigate();


  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5180/valid-search-terms/`);
        const uniqueWords:string[] = Array.from(new Set(response.data.map(item => item.word)));
        const wordData = response.data as Word[];

        const fruitsList = wordData
          .filter(item => item.type === 'fruit')
          .map(item => item.word);
        const nutrientsList = wordData
          .filter(item => item.type === 'nutrient')
          .map(item => item.word);
        setwords(wordData);
        setFruits(fruitsList);
        setNutrients(nutrientsList);
        
        
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
        navigate(`/fruit/${value.toLowerCase()}`); 
      } else if (selectedItem.type === 'nutrient') {
        const split = value.split(" ");
        const amnt = split[split.length-1];
        const nutrient = split.slice(0, -2).join("-");
        navigate(`/nutrients/${nutrient}-${amnt}`.toLowerCase());
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
     // data={data}
      data={[
        { group: 'Fruits', items: fruits },
        { group: 'Nutrients', items:nutrients },
      ]}
      onOptionSubmit={handleItemSubmit} 
      />
  );
} 