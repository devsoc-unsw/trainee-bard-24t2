import React, { useState } from "react";
import { Tooltip, Stack, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaLocationDot,
  FaGamepad,
  FaDice,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CgPill } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import classes from "./Navbar.module.css";

function NavbarLink({ icon: Icon, label, active, onClick, showText, link }) {
  return (
    <Tooltip label={label} position="left" transitionProps={{ duration: 0 }}>
      <Link
        to={link || "#"}
        className={classes.link}
        data-active={active || undefined}
        onClick={onClick}
      >
        <div className={classes.linkContent}>
          <Icon style={{ width: rem(28), height: rem(28) }} />
          {/* showText == true then render the labels  */}
          {showText && <span className={classes.linkLabel}>{label}</span>}
        </div>
      </Link>
    </Tooltip>
  );
}

const icondata = [
  { link: "/home", icon: GoHome, label: "Home" },
  { link: "/search", icon: FaSearch, label: "Search" },
  { link: "/state-map", icon: FaLocationDot, label: "Map" },
  { link: "/game", icon: FaGamepad, label: "Game" },
  { link: "/surprise", icon: FaDice, label: "Surprise" },
  { link: "/nutrients", icon: CgPill, label: "Vitamin" },
];

function Navbar() {
  const [active, setActive] = useState(0);
  const [showText, setShowText] = useState(false);

  const links = icondata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
      showText={showText}
    />
  ));

  const toggleTextVisibility = () => {
    setShowText((prev) => !prev);
  };

  return (
    // When showText == false then default navbar,
    // else switch to expanded navbar
    <nav
      className={`${classes.navbar} ${showText ? classes.navbarExpanded : ""}`}
    >
      {/* When showText == false then show arrow,
      else show the cross */}
      {showText ? (
        <RxCross2
          size={36}
          stroke-width="0.3"
          onClick={toggleTextVisibility}
          style={{
            display: "flex",
            alignSelf: "center",
            marginTop: "14px",
            color: "#F3725E",
            cursor: "pointer",
          }}
        />
      ) : (
        <FaChevronRight
          size={25}
          onClick={toggleTextVisibility}
          style={{
            display: "flex",
            alignSelf: "center",
            marginTop: "20px",
            color: "#F3725E",
            cursor: "pointer",
          }}
        />
      )}

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={16}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;
