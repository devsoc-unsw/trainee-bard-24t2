import React from "react";
import { Grid, Skeleton, Container } from "@mantine/core";
import styles from "./Game.module.css";

function Game({
	height
}) {

	return (
		<Container className={styles.GlassPanel} >
            <h2 className={styles.GameText}>Game</h2>
		</Container>
	);
}

export default Game;