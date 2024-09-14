import React, { useEffect, useState } from "react";
import classes from "./NutrientsSearch.module.css";
import Navbar from "../components/Navbar";
import { Autocomplete } from "@mantine/core";
import { IoSearchSharp } from "react-icons/io5";
import FruitBox from "../components/FruitBox";
import axios from "axios";
import NutrientBox from "../components/NutrientBox";
import sugar from "../assets/sugar.png";
import magnesium from "../assets/magnesium.png";
import protein from "../assets/protein.png";
import calcium from "../assets/calcium.png";
import iron from "../assets/iron.png";
import carbs from "../assets/carbs.png";
import calories from "../assets/calories.png";
import zinc from "../assets/zinc.png";
import phosphorus from "../assets/phosphorus.png";
import { useNavigate } from "react-router-dom";
import { CgPill } from "react-icons/cg";

export default function NutrientsSearch() {
  const [fruit, setFruit] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchIcon = <IoSearchSharp />;
  const pillIcon = <CgPill color="#7a71ca" />;

  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5180/getAllItems`);
        console.log(response.data.items);

        setFruit(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const split = searchQuery.split(" ");
    const amnt = split[split.length-1];
    const nutrient = split.slice(0, -2).join("-");
    navigate(`/nutrients/${nutrient}-${amnt}`.toLowerCase());
  };

  return (
    <div className={classes.container}>
      <Navbar />

      <div className={classes.innerContainer}>
        <h2 className={classes.title}>
          <span> Search for a specific </span> <br />
          <span className={classes.titleText}> fruit by nutrient </span>
        </h2>

        <div className={classes.filtersBar}>
          <div className={classes.searchBar}>
            <Autocomplete
              className={classes.autocomplete}
              placeholder="Find a fruit via nutrient"
              leftSectionPointerEvents="none"
              leftSection={pillIcon}
              rightSectionPointerEvents="none"
              rightSection={searchIcon}
              radius={8}
              onChange={(value) => setSearchQuery(value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>

        <div className={classes.fruit}>
          <NutrientBox nutrientName="Sugar" nutrientPic={sugar} />
          <NutrientBox nutrientName="Calcium" nutrientPic={calcium} />
          <NutrientBox nutrientName="Carbohydrates" nutrientPic={carbs} />
          <NutrientBox nutrientName="Iron" nutrientPic={iron} />
          <NutrientBox nutrientName="Protein" nutrientPic={protein} />
          <NutrientBox nutrientName="Magnesium" nutrientPic={magnesium} />
          <NutrientBox nutrientName="Zinc" nutrientPic={zinc} />
          <NutrientBox nutrientName="Calories" nutrientPic={calories} />
          <NutrientBox nutrientName="Phosphorus" nutrientPic={phosphorus} />
        </div>
      </div>
    </div>
  );
}
