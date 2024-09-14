import React from "react";
import { Container } from "@mantine/core";
import styles from "./VitaminsDisplay.module.css";
import VitaminButton from "./VitaminButtons";

function HomeVitaminsDisplay() {
	return (
		<Container className={styles.GlassPanel} >
			<h3 className={styles.topLeftContent}>What Vitamin Am I Missing?</h3>
			<VitaminButton/>
		</Container>
	);
}

export default HomeVitaminsDisplay;