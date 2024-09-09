import React from "react";
import { LeadGrid } from "../components/LeadGrid";
import '../App.css';
import logo from "../assets/logo_fruit_o.png";
import './Home.css';

function Home() {
  return (
    <div className="background-gradient">
      <div>
        <img src={logo} alt="Logo" className="home-logo" />
      </div>
      <LeadGrid/>
      {/* <h1>Home Page :3</h1> */}
    </div>
  );
}

export default Home;
