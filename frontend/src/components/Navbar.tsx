import React from "react";
import { useState } from "react";
import { Center, Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import {
  FaChevronRight,
  FaLocationDot,
  FaGamepad,
  FaDice,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CgPill } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import classes from "./Navbar.module.css";

function NavbarLink({ icon: Icon, label, active, onClick }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(28), height: rem(28) }} />
      </UnstyledButton>
    </Tooltip>
  );
}

const icondata = [
  { icon: GoHome, label: "Home" },
  { icon: FaSearch, label: "Search" },
  { icon: FaLocationDot, label: "State Map" },
  { icon: FaGamepad, label: "Game" },
  { icon: FaDice, label: "Surprise" },
  { icon: CgPill, label: "Vitamin" },
];

function Navbar() {
  const [active, setActive] = useState(2);

  const links = icondata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <FaChevronRight
        type="mark"
        size={25}
        style={{
          display: "flex",
          alignSelf: "center",
          marginTop: "20px",
          color: "#F3725E",
        }}
      />

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={16}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;
