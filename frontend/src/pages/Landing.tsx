import React from "react";
import { Text, Button } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa6";
import landing_logo from "../assets/landing_logo.png";
import "./Landing.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <>
      <div className="landing-container">
        <div className="hero-container">
          <img src={landing_logo} alt="Logo" style={{ width: "32vw" }} />
          <Text fz="1.5rem" fw={400} c="white" mt={8} mb={24}>
            Your guide to seasonal fruits and nutrients
          </Text>

          <div className="button-container">
            <Button
              className="button1"
              variant="filled"
              size="lg"
              radius="md"
              fw={500}
            >
              See More
            </Button>
            <Link to="/home" style={{ textDecoration: "none" }}>
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
