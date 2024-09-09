import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import classes from "./SeasonalFruits.module.css";
import { Autocomplete, Box, Button, Select } from "@mantine/core";
import { LuArrowDownUp } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import FruitBox from "../components/FruitBox";
import cherry from "../assets/cherry.png";

function SeasonalFruits() {
  const { state } = useParams();

  // Example of fetching from backend ==> suggest that you put it in a separate file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5180/seasonal-fruits?state=${state}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state]);

  const fullStateName = (state: string | undefined): string => {
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
      default:
        return "Unknown State";
    }
  };

  const arrowIcon = <LuArrowDownUp />;
  const searchIcon = <IoSearchSharp />;

  return (
    <div className={classes.container}>
      <Navbar />

      <div className={classes.innerContainer}>
        <h1 className={classes.title}>
          <span> {fullStateName(state)} </span> <br />{" "}
          <span className={classes.titleText}> Seasonal fruits </span>
        </h1>

        <div className={classes.filtersBar}>
          <div className={classes.sortBy}>
            <Select
              checkIconPosition="right"
              // label="Sort by:"
              data={["Seasonality", "Alphabetical", "Option 3"]}
              defaultValue="Seasonality"
              leftSectionPointerEvents="none"
              leftSection={arrowIcon}
              radius={8}
              comboboxProps={{
                offset: 0,
                transitionProps: { transition: "pop", duration: 200 },
              }}
            />
          </div>
          <div className={classes.searchBar}>
            <Autocomplete
              className={classes.autocomplete}
              placeholder="Find a fruit"
              rightSectionPointerEvents="none"
              rightSection={searchIcon}
              radius={8}
            />
          </div>

          <div className={classes.seasonButtons}>
            <Button variant="filled" radius={8} className={classes.button1}>
              In-season
            </Button>
            <Button variant="filled" radius={8} className={classes.button2}>
              Likely
            </Button>
            <Button variant="filled" radius={8} className={classes.button3}>
              Not in-season
            </Button>
          </div>
        </div>

        <div className={classes.fruit}>
          <FruitBox
            fruitId={1}
            fruitName="Cherry"
            fruitPic={cherry}
            fruitSeasonality="inSeason"
          />
          <FruitBox
            fruitId={1}
            fruitName="Cherry"
            fruitPic={cherry}
            fruitSeasonality="inSeason"
          />
          <FruitBox
            fruitId={1}
            fruitName="Cherry"
            fruitPic={cherry}
            fruitSeasonality="inSeason"
          />
          <FruitBox
            fruitId={1}
            fruitName="Cherry"
            fruitPic={cherry}
            fruitSeasonality="inSeason"
          />
          <FruitBox
            fruitId={1}
            fruitName="Cherry"
            fruitPic={cherry}
            fruitSeasonality="inSeason"
          />
          <FruitBox
            fruitId={1}
            fruitName="Cherry"
            fruitPic={cherry}
            fruitSeasonality="inSeason"
          />
        </div>
      </div>
    </div>
  );
}

export default SeasonalFruits;
