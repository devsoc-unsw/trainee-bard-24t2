import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Autocomplete, AppShell, Button, List, Grid, ScrollArea } from '@mantine/core';
import { FaArrowLeft } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import NutrientDisplay from "../components/NutrientDisplay";
import FruitStyles from "./Fruit.module.css";
import FruitImage from "../assets/tempfruit.png";

function Fruit() {
  const { fruitId } = useParams();

  const nutrientCategories = [
    { name: "Vitamins", color: "#F3725E", nutrients: [
      { name: "Vitamin C", percDI: "16%" },
      { name: "Vitamin E", percDI: "4%" },
      { name: "Vitamin K", percDI: "16%" }
    ]},
    { name: "Macros", color: "#95D08B", nutrients: [
      { name: "Vitamin C", percDI: "16%" },
      { name: "Vitamin E", percDI: "4%" },
      { name: "Vitamin K", percDI: "16%" }
    ]},
    { name: "Minerals", color: "#E1A3D8", nutrients: [
      { name: "Vitamin C", percDI: "16%" },
      { name: "Vitamin E", percDI: "4%" },
      { name: "Vitamin K", percDI: "16%" }
    ]},
    { name: "Essentials", color: "#FFDD94", nutrients: [
      { name: "Vitamin C", percDI: "16%" },
      { name: "Vitamin E", percDI: "4%" },
      { name: "Vitamin K", percDI: "16%" }
    ]},
    { name: "Other", color: "#7AA4D1", nutrients: [
      { name: "Vitamin C", percDI: "16%" },
      { name: "Vitamin E", percDI: "4%" },
      { name: "Vitamin K", percDI: "16%" }
    ]}
  ]

  const nutrients = useMemo(() => {
    return nutrientCategories.map((category, index) => (
      <div key={index} className={`${FruitStyles.nutrientContainer} ${FruitStyles.shadow}`}>
        <div className={FruitStyles.nutrientCategoryBox}>
          <NutrientDisplay name={category.name} color={category.color}/>
        </div>
        <div className={FruitStyles.nutrientInfo}>
          {/* Same as <ul> and <li> elements */}
          {/* TODO: Change to fit nutrient values */}
          <List>
            <List.Item>{`${category.nutrients[0].name}: ${category.nutrients[0].percDI}`}</List.Item>
            <List.Item>Install dependencies with yarn</List.Item>
            <List.Item>Install dependencies with yarn</List.Item>
          </List>
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
    ))
  }, [nutrientCategories]);

  return (
    <AppShell>
      <Navbar/>
      <AppShell.Main className={FruitStyles.main}>
        {/* Gutter causes overflow issues */}
        <Grid gutter="0" align="stretch" className={FruitStyles.mainContainer}>
          <Grid.Col span={12}>
            <h1 className={FruitStyles.pageHeader}>Fruit {fruitId}</h1>
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
