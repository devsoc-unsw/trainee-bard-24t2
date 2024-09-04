import React from "react";
import { Text, Button } from "@mantine/core";
import { FaArrowRight, FaAngleDown } from "react-icons/fa6";
import background from "../assets/background_laptop_s.png";
import landing_logo from "../assets/landing_logo.png";
import "./Landing.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <>
      <div
        className="landing-container"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="hero-container"
          style={{
            width: "100%",
            height: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <img src={landing_logo} alt="Logo" style={{ width: "32vw" }} />
          <Text fz="1.5rem" fw={400} c="white" mt={8} mb={24}>
            Your guide to seasonal fruits and nutrients
          </Text>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
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

          <FaAngleDown
            size={32}
            color="#7a71ca"
            style={{ position: "fixed", bottom: "0", marginBottom: "20px" }}
          />
        </div>
      </div>
    </>
  );
}

export default Landing;
