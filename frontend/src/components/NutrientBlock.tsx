import React, { useState } from "react";
import { Button } from '@mantine/core';
import NutrientDisplay from "../components/NutrientDisplay";
import FruitStyles from "../pages/Fruit.module.css";
import NutrientList from "../components/NutrientList";

const CATEGORY_COLOUR_MAP = {
  vitamins: "#F3725E",
  macros: "#95D08B",
  minerals: "#FFDD94",
  other: "#7AA4D1"
}

function NutrientBlock({
  index,
  category,
  value,
}) {
  const capitaliseFirstLetter = (text: string): string => {
    if (!text) return ""; // Handle empty string or undefined input
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const [expanded, setExpanded] = useState(false);

  return (
    <div key={index} className={`${FruitStyles.nutrientContainer} ${FruitStyles.shadow}`}>
      <div className={FruitStyles.nutrientCategoryBox}>
        <NutrientDisplay name={capitaliseFirstLetter(category)} color={CATEGORY_COLOUR_MAP[category.toLowerCase()]}/>
      </div>
      <div className={FruitStyles.nutrientInfo}>
        {/* Same as <ul> and <li> elements */}
        {/* TODO: Change to fit nutrient values */}
        <NutrientList category={category} nutrients={value} expanded={expanded}/>
      </div>
      <div className={FruitStyles.nutrientButtonWrapper}>
        <Button
          variant="outline"
          size="md"
          radius="md"
          fw={500}
          color="black"
          className={FruitStyles.shadow}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "See less" : "See more"}
        </Button>
      </div>
    </div>
  )
}

export default NutrientBlock;