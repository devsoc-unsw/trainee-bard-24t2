import React, { useEffect, useState } from "react";
import classes from "./Search.module.css";
import Navbar from "../components/Navbar";
import { Autocomplete } from "@mantine/core";
import { IoSearchSharp } from "react-icons/io5";
import logoIcon from "../assets/logo-search-bar.png";
import FruitBox from "../components/FruitBox";
import cherry from "../assets/cherry.png";
import axios from "axios";

function Search() {
  const [fruit, setFruit] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchIcon = <IoSearchSharp />;
  const logoImg = <img src={logoIcon} alt="Logo" style={{ width: 20 }} />;

  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5180/getAllFruit`);
        console.log(response.data);

        const data = response.data;
        setFruit(data.fruit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const filteredFruit = fruit.filter((fruitItem) => {
  //   return fruitItem.name.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  return (
    <div className={classes.container}>
      <Navbar />

      <div className={classes.innerContainer}>
        <h2 className={classes.title}>
          <span> Search for a specific </span> <br />
          <span className={classes.titleText}> fruit by name </span>
        </h2>

        <div className={classes.filtersBar}>
          <div className={classes.searchBar}>
            <Autocomplete
              className={classes.autocomplete}
              placeholder="Find a fruit"
              leftSectionPointerEvents="none"
              leftSection={logoImg}
              rightSectionPointerEvents="none"
              rightSection={searchIcon}
              radius={8}
              // onChange={(value) => setSearchQuery(value)}
            />
          </div>
        </div>

        <div className={classes.fruit}>
          <FruitBox
            fruitId={1}
            fruitName="Cherry"
            fruitPic={cherry}
            fruitSeasonality="none"
          />
          {/* {filteredFruit.map((fruitItem) => (
            <FruitBox
              key={fruitItem.fruitId}
              fruitId={fruitItem.fruitId}
              fruitName={fruitItem.name}
              fruitPic={fruitItem.imageUrl || cherry}
              fruitSeasonality={fruitItem.seasonality}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Search;
