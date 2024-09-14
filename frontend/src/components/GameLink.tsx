import React from "react";
import { Container } from "@mantine/core";
import { Link } from 'react-router-dom';
import styles from "./GameLink.module.css";

function Game() {
	return (
		<Link to="https://suikagame.com/">
			<Container className={styles.GlassPanel} >
				<h2 className={styles.GameText}>Game</h2>
			</Container>
		</Link>
	);
}

export default Game;