import React from "react";
import { LeadGrid, Space } from "../components/LeadGrid";
import '../App.css';

function Home() {
  // Gradient background from App.css
  document.body.className = "background-gradient";  
  
  return (
    <div>
      <LeadGrid/>
      {/* <h1>Home Page :3</h1> */}
    </div>
  );
}

export default Home;
