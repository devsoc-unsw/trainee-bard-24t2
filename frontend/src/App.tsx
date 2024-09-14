import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import StateMap from "./pages/StateMap";
import SeasonalFruits from "./pages/SeasonalFruits";
import Nutrients from "./pages/Nutrients";
import Fruit from "./pages/Fruit";
import Search from "./pages/Search";
import Game from "./pages/Game";
import Surprise from "./pages/Surprise";
import NutrientsSearch from "./pages/NutrientsSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/state-map" element={<StateMap />} />
        <Route path="/seasonal-fruits/:state" element={<SeasonalFruits />} />
        <Route path="/nutrientsSearch" element={<NutrientsSearch />} />
        <Route path="/nutrients/:nutrientName" element={<Nutrients />} />
        <Route path="/fruit/:fruitName" element={<Fruit />} />
        <Route path="/search" element={<Search />} />
        <Route path="/game" element={<Game />} />
        <Route path="/surprise" element={<Surprise />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
