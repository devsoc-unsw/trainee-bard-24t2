import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./Nutrients.module.css";
import Navbar from "../components/Navbar";
import { Autocomplete, Select } from "@mantine/core";
import { LuArrowDownUp } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import logoIcon from "../assets/logo-search-bar.png";
import FruitBox from "../components/FruitBox";
import cherry from "../assets/cherry.png";
import axios from "axios";

type Fruit = {
  name: string;
  image: string;
  value: number;
  fruitSeasonality: string;
};

function Nutrients() {
  const { nutrientText } = useParams();
  const [fruit, setFruit] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const arrowIcon = <LuArrowDownUp />;
  const searchIcon = <IoSearchSharp />;
  const logoImg = <img src={logoIcon} alt="Logo" style={{ width: 20 }} />;
  console.log(nutrientText);
  
  const searchSplit = nutrientText?.split("-");
  const nutrientName = searchSplit?.[0] || "not found";
  const searchAmnt = searchSplit?.[1] || "more";
  const amount = searchAmnt.toLowerCase() === "more";

  const defaultSortStr = amount ? "High to low" : "Low to high";
  const [sortOption, setSortOption] = useState(defaultSortStr);

  console.log(nutrientText);
  console.log(nutrientName);
  console.log(amount);

  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5180/nutrient/${nutrientName}?greaterthan=${amount}`
        );
        console.log(response.data);

        const data = response.data;
        setFruit(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [nutrientName]);

  const filteredFruit: Fruit[] = fruit
    .filter((fruitItem: Fruit) => {
      return fruitItem.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a: Fruit, b: Fruit) => {
      if (sortOption === "High to low") {
        return b.value - a.value;
      } else if (sortOption === "Low to high") {
        return a.value - b.value;
      } else if (sortOption === "Alphabetical") {
        return a.name.localeCompare(b.name);
      } else {
        return 0;
      }
    });

  return (
    <div className={classes.container}>
      <Navbar />

      <div className={classes.innerContainer}>
        <h2 className={classes.title}>
          <span> Fruits {amount ? "high" : "low"} in </span> <br />
          <span className={classes.titleText}>
            {nutrientName?.toUpperCase()}
          </span>
        </h2>

        <div className={classes.filtersBar}>
          <div className={classes.sortBy}>
            <Select
              checkIconPosition="right"
              data={["High to low", "Low to high", "Alphabetical"]}
              defaultValue= {defaultSortStr}
              leftSectionPointerEvents="none"
              leftSection={arrowIcon}
              radius={8}
              comboboxProps={{
                offset: 0,
                transitionProps: { transition: "pop", duration: 200 },
              }}
              onChange={(value) => setSortOption(value ?? defaultSortStr)}
            />
          </div>
          <div className={classes.searchBar}>
            <Autocomplete
              className={classes.autocomplete}
              placeholder="Find a fruit"
              leftSectionPointerEvents="none"
              leftSection={logoImg}
              rightSectionPointerEvents="none"
              rightSection={searchIcon}
              radius={8}
              onChange={(value) => setSearchQuery(value)}
            />
          </div>
        </div>

        <div className={classes.fruit}>
          <FruitBox
            fruitName="Cherry"
            fruitPic={cherry}
            fruitSeasonality="none"
          />
          {filteredFruit.map((fruitItem) => (
            <FruitBox
              key={fruitItem.name}
              fruitName={fruitItem.name}
              fruitPic={fruitItem.image}
              fruitSeasonality="none"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Nutrients;
