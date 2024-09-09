import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { AppShell, Button, List, Grid, ScrollArea } from '@mantine/core';
import { FaArrowLeft } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import NutrientDisplay from "../components/NutrientDisplay";
import FruitStyles from "./Fruit.module.css";
import FruitImage from "../assets/tempfruit.png";

function Fruit() {
  const { fruitId } = useParams();

  const nutrientCategories = [
    { name: "Carbs", color: "#F3725E"},
    { name: "Fat", color: "#95D08B"},
    { name: "Protein", color: "#E1A3D8"},
    { name: "Vitamins", color: "#FFDD94"},
    { name: "Other", color: "#7AA4D1"}
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
            <List.Item>Clone or download repository from GitHub</List.Item>
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
            <div style={{ width: "23vw", height: "40px", backgroundColor: "#fff", lineHeight: "40px", borderRadius: "20px"}}>Search bar</div>
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
