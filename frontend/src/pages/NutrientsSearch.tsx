import React, { useEffect, useState } from "react";
import classes from "./NutrientsSearch.module.css";
import Navbar from "../components/Navbar";
import { Autocomplete } from "@mantine/core";
import { IoSearchSharp } from "react-icons/io5";
import FruitBox from "../components/FruitBox";

export default function NutrientsSearch() {
  const [fruit, setFruit] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchIcon = <IoSearchSharp />;

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
            fruitPic="none"
            fruitSeasonality="none"
          />
        </div>
      </div>
    </div>
  );
}
