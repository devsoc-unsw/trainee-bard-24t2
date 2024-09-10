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

function Nutrients() {
  const { nutrientId } = useParams();
  const [fruit, setFruit] = useState([]);
  const [sortOption, setSortOption] = useState("High to low");
  const [searchQuery, setSearchQuery] = useState("");

  const arrowIcon = <LuArrowDownUp />;
  const searchIcon = <IoSearchSharp />;
  const logoImg = <img src={logoIcon} alt="Logo" style={{ width: 20 }} />;

  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5180/nutrients?nutrientId=${nutrientId}`
        );
        console.log(response.data);

        const data = response.data;
        setFruit(data.fruit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [nutrientId]);

  // const filteredFruit = fruit
  //   .filter((fruitItem) => {
  //     return fruitItem.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   })
  //   .sort((a, b) => {
  //     if (sortOption === "High to low") {
  //       return b.nutrientValue - a.nutrientValue;
  //     } else if (sortOption === "Low to high") {
  //       return a.nutrientValue - b.nutrientValue;
  //     } else if (sortOption === "Alphabetical") {
  //       return a.name.localeCompare(b.name);
  //     } else {
  //       return 0;
  //     }
  //   });

  return (
    <div className={classes.container}>
      <Navbar />

      <div className={classes.innerContainer}>
        <h2 className={classes.title}>
          <span> Fruits high in </span> <br />
          <span className={classes.titleText}>{nutrientId?.toUpperCase()}</span>
        </h2>

        <div className={classes.filtersBar}>
          <div className={classes.sortBy}>
            <Select
              checkIconPosition="right"
              data={["High to low", "Low to high", "Alphabetical"]}
              defaultValue="High to low"
              leftSectionPointerEvents="none"
              leftSection={arrowIcon}
              radius={8}
              comboboxProps={{
                offset: 0,
                transitionProps: { transition: "pop", duration: 200 },
              }}
              // onChange={(value) => setSortOption(value)}
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

export default Nutrients;
