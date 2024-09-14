import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import classes from "./SeasonalFruits.module.css";
import { Autocomplete, Box, Button, Select } from "@mantine/core";
import { LuArrowDownUp } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import logoIcon from "../assets/logo-search-bar.png";
import FruitBox from "../components/FruitBox";
import cherry from "../assets/cherry.png";

type Fruit = {
  variant_name: string;
  image: string;
  seasonality: number;
};

function SeasonalFruits() {
  const { state } = useParams();
  const [fruit, setFruit] = useState([]);
  const [sortOption, setSortOption] = useState("Seasonality");
  const [searchQuery, setSearchQuery] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");

  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5180/seasonal-fruits/${state?.toLowerCase()}`
        );
        

        const data = response.data;
        setFruit(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state]);

  const fullStateName = (stateName: string | undefined): string => {
    const state = stateName?.toUpperCase();
    
    switch (state) {
      case "NSW":
        return "New South Wales";
      case "VIC":
        return "Victoria";
      case "QLD":
        return "Queensland";
      case "SA":
        return "South Australia";
      case "WA":
        return "Western Australia";
      case "TAS":
        return "Tasmania";
      case "NT":
        return "Northern Territory";
      case "ACT":
        return "Australian Capital Territory";
      case "KANTO":
      case "JOHTO": 
      case "HOENN":
      case "SINNOH":
      case "UNOVA":
      case "KALOS":
      case "ALOLA":
      case "GALAR":
      case "PALDEA":
        return state.charAt(0) + state.slice(1).toLowerCase();
      default:
        return "Unknown state";
    }
  };

  // Convert seasonFilter to a number for comparison
  const seasonFilterMap = {
    inSeason: 1,
    likely: 0,
    notInSeason: -1,
  };

  const filteredFruit: Fruit[] = fruit
    .filter((fruitItem: Fruit) => {
      const matchesSearch = fruitItem.variant_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let matchesSeason;

      // If season filter clicked then show all fruits
      // that match the filter, else show all
      if (seasonFilter !== "") {
        matchesSeason = fruitItem.seasonality === seasonFilterMap[seasonFilter];
      } else {
        matchesSeason = true;
      }

      if (matchesSearch && matchesSeason) {
        return true;
      } else {
        return false;
      }
    })
    .sort((a: Fruit, b: Fruit) => {
      if (sortOption === "Seasonality") {
        const seasonOrder = {
          inSeason: 1,
          likely: 2,
          notInSeason: 3,
          none: 4,
        };

        return seasonOrder[a.seasonality] - seasonOrder[b.seasonality];
      } else if (sortOption === "Alphabetical") {
        return a.variant_name.localeCompare(b.variant_name);
      } else {
        return 0;
      }
    });

  const arrowIcon = <LuArrowDownUp />;
  const searchIcon = <IoSearchSharp />;
  const logoImg = <img src={logoIcon} alt="Logo" style={{ width: 20 }} />;

  return (
    <div className={classes.container}>
      <Navbar />

      <div className={classes.innerContainer}>
        <h2 className={classes.title}>
          <span> {fullStateName(state)} </span> <br />{" "}
          <span className={classes.titleText}> Seasonal fruits </span>
        </h2>

        <div className={classes.filtersBar}>
          <div className={classes.sortBy}>
            <Select
              checkIconPosition="right"
              data={["Seasonality", "Alphabetical"]}
              defaultValue="Seasonality"
              leftSectionPointerEvents="none"
              leftSection={arrowIcon}
              radius={8}
              comboboxProps={{
                offset: 0,
                transitionProps: { transition: "pop", duration: 200 },
              }}
              onChange={(value) => setSortOption(value ?? "Seasonality")}
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

          <div className={classes.seasonButtons}>
            <Button
              variant="filled"
              radius={8}
              className={classes.button1}
              onClick={() => setSeasonFilter("inSeason")}
            >
              In-season
            </Button>
            <Button
              variant="filled"
              radius={8}
              className={classes.button2}
              onClick={() => setSeasonFilter("likely")}
            >
              Likely
            </Button>
            <Button
              variant="filled"
              radius={8}
              className={classes.button3}
              onClick={() => setSeasonFilter("notInSeason")}
            >
              Not in-season
            </Button>
            <Button
              variant="filled"
              radius={8}
              className={classes.button4}
              onClick={() => setSeasonFilter("")}
            >
              All
            </Button>
          </div>
        </div>

        <div className={classes.fruit}>
          {filteredFruit.length > 0 ? (
            filteredFruit.map((fruitItem) => (
              <FruitBox
                key={fruitItem.variant_name}
                fruitName={fruitItem.variant_name}
                fruitPic={fruitItem.image}
                fruitSeasonality={fruitItem.seasonality}
              />
            ))
          ) : (
            <div className={classes.noFruitFound}>No fruits found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeasonalFruits;
