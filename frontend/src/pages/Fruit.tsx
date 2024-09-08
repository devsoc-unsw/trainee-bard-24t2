import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { AppShell, Button, Grid, ScrollArea } from '@mantine/core';
import { FaArrowLeft } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import FruitPageClasses from "./Fruit.module.css";
import FruitImage from "../assets/tempfruit.png";

function Fruit() {
  const { fruitId } = useParams();

  const nutrientCategories = [
    { name: "Carbohydrates", color: ""},
    { name: "Fat", color: ""},
    { name: "Protein", color: ""},
    { name: "Vitamins", color: ""},
    { name: "Other", color: ""}
  ]

  const nutrients = useMemo(() => {
    return nutrientCategories.map((category, index) => (
      <div key={index} style={{ height: "14vh", backgroundColor: "white", margin: "1vh", marginRight: "2.5vh", borderRadius: "16px", zIndex: "2"}}>{category.name}</div>
    ))
  }, [nutrientCategories]);

  return (
    <AppShell>
      <Navbar/>
      <AppShell.Main className={FruitPageClasses.main}>
        {/* Gutter causes overflow issues */}
        <Grid gutter="0" align="stretch" className={FruitPageClasses.mainContainer}>
          <Grid.Col span={12}>
            <h1 style={{ margin: "8vh"}}>Cherry</h1>
          </Grid.Col>
          <Grid.Col offset={0.25} span={5} style={{height: "65vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
            <img src={FruitImage} alt="Image of Fruit" style={{ width: "18vw"}}/>
            {/* placeholder for actual search bar */}
            <div style={{ width: "23vw", height: "40px", backgroundColor: "#fff", lineHeight: "40px", borderRadius: "20px"}}>Search bar</div>
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
          </Grid.Col>
          <Grid.Col offset={0.25} span={6}>
             <ScrollArea style={{ height: "61vh", borderRadius: "16px", position: "relative" }}>
`              <div style={{
                backgroundColor: "#f2f2f2",
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: "0.7",
                borderRadius: "16px"
              }} />
              <div style={{ position: "relative"}}>
                {nutrients}
              </div>`
              </ScrollArea>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}

export default Fruit;
