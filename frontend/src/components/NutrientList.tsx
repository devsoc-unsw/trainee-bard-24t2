import React from "react";
import { List } from "@mantine/core";

interface Nutrient {
  name: string,
  amount: number,
  unit: string,
  percentOfDailyNeeds: number
}

function NutrientList({
  category,
  nutrients,
  expanded
}) {
  console.log(category)
  console.log(nutrients)

  const numNutrients = (expanded) ? nutrients.length : 3;

  return category !== "macros" ? (
    <List>
      {nutrients.slice(0, numNutrients).map((elem: Nutrient, index: number) => (
        <List.Item key={index}>{`${elem.name}: ${elem.amount}`}</List.Item>
      ))}
    </List>
  ) : (
    <List>
      <List.Item>{`${nutrients.carbohydrates.carbohydrates.name}: ${nutrients.carbohydrates.carbohydrates.amount}`}</List.Item>
      <List.Item>{`${nutrients.protien.protein.name}: ${nutrients.protein.protein.amount}`}</List.Item>
      <List.Item>{`${nutrients.fat.fat.name}: ${nutrients.fat.fat.amount}`}</List.Item>
    </List>
  );
}

export default NutrientList;
