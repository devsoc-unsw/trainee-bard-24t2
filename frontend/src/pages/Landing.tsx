import React from "react";
import { Text, Button } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa6";
import landing_logo from "../assets/landing_logo.png";
import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  document.body.className="moving_background";

  return (
    <>
      <div className="landing-container">
        <div className="hero-container">
          <img src={landing_logo} alt="Logo" className="landing_logo" />
          <Text fz="1.5rem" fw={400} c="white" mt={8} mb={24}>
            Your guide to seasonal fruits and nutrients
          </Text>

          <div className="button-container">
            <Link to="/home">
              <Button
                className="button1"
                variant="filled"
                size="lg"
                radius="md"
                fw={500}
              >
                See More
              </Button>
            </Link>
            <Link to="/state-map">
              <Button
                className="button2"
                rightSection={<FaArrowRight />}
                variant="outline"
                size="lg"
                radius="md"
                fw={500}
              >
                Try Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
