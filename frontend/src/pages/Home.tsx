import React from "react";
import Navbar from "../components/Navbar";
import NavbarExpanded from "../components/NavbarExpanded";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Drawer opened={opened} onClose={close} title="Authentication">
        <NavbarExpanded />
      </Drawer>
      <Button onClick={open}>Open Drawer</Button>
      <Navbar />
      <h1>Home Page :3</h1>
    </div>
  );
}

export default Home;
