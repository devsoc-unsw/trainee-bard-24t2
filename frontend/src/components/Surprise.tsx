import React from "react";
import { Grid, Skeleton, Container } from "@mantine/core";
import styles from "./Surprise.module.css";

function Surprise({
	height
}) {

	return (
		<Container className={styles.GlassPanel} >
            <h2 className={styles.SurpriseText}>Surprise Me</h2>
		</Container>
	);
}

export default Surprise;