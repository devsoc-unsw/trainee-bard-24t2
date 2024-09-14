import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Autocomplete, AppShell, Button, Grid, ScrollArea } from '@mantine/core';
import { FaArrowLeft } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import NutrientDisplay from "../components/NutrientDisplay";
import FruitStyles from "./Fruit.module.css";
import FruitImage from "../assets/tempfruit.png";
import axios from "axios";
import NutrientList from "../components/NutrientList";

const CATEGORY_COLOUR_MAP = {
  vitamins: "#F3725E",
  macros: "#95D08B",
  minerals: "#FFDD94",
  other: "#7AA4D1"
}

function Fruit() {
  const { fruitName } = useParams();
  const [variantNutrition, setVariantNutrition] = useState({});

  const capitaliseFirstLetter = (text: string): string => {
    if (!text) return ""; // Handle empty string or undefined input
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5180/fruit`, {
            params: { fruit: fruitName, variantId: 9176 }
          }
        );
        console.log(response.data);

        setVariantNutrition(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fruitName]);

  const nutrients = useMemo(() => {
    return Object.entries(variantNutrition).map(([category, value], index) => {

      return (
        <div key={index} className={`${FruitStyles.nutrientContainer} ${FruitStyles.shadow}`}>
          <div className={FruitStyles.nutrientCategoryBox}>
            <NutrientDisplay name={capitaliseFirstLetter(category)} color={CATEGORY_COLOUR_MAP[category.toLowerCase()]}/>
          </div>
          <div className={FruitStyles.nutrientInfo}>
            {/* Same as <ul> and <li> elements */}
            {/* TODO: Change to fit nutrient values */}
            <NutrientList category={category} nutrients={value} expanded={false}/>
          </div>
          <div className={FruitStyles.nutrientButtonWrapper}>
            <Button
              variant="outline"
              size="md"
              radius="md"
              fw={500}
              color="black"
              className={FruitStyles.shadow}
            >
              See more
            </Button>
          </div>
        </div>
      )
    })
  }, [variantNutrition]);

  return (
    <AppShell>
      <Navbar/>
      <AppShell.Main className={FruitStyles.main}>
        {/* Gutter causes overflow issues */}
        <Grid gutter="0" align="stretch" className={FruitStyles.mainContainer}>
          <Grid.Col span={12}>
            <h1 className={FruitStyles.pageHeader}>{fruitName}</h1>
          </Grid.Col>
          <Grid.Col offset={0.25} span={5} className={FruitStyles.bottomLeftContainer}>
            <img src={FruitImage} alt="Image of Fruit" className={FruitStyles.fruitImage}/>
            {/* Temporary: placeholder for actual search bar */}
            <Autocomplete placeholder="FIll me in" className={FruitStyles.bananas}/>
            <Link to="/search">
              <Button
                className="button2"
                leftSection={<FaArrowLeft />}
                variant="outline"
                size="lg"
                radius="md"
                fw={500}
              >
                Other fruits
              </Button>
            </Link>
          </Grid.Col>
          <Grid.Col offset={0.25} span={6}>
             <ScrollArea type="always" className={FruitStyles.scrollable}>
              {/* Needed because opacity ruined the white colour of the nutrient containers */}
              <div className={FruitStyles.opaqueBackground}/>
              <div className={FruitStyles.nutrientsContainerWrapper}>
                {nutrients}
              </div>
              </ScrollArea>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}

export default Fruit;
