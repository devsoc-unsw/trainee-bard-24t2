import React, { useEffect, useCallback, useState } from "react";
import { Grid, Skeleton, Container } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import styles from "./Surprise.module.css";
import axios from "axios";

function Surprise() {
	const [fruitNames, setFruitNames] = useState<Array<string>>([]);
	const [loaded, setLoaded] = useState(false);
	const [clickWaiting, setClickWaiting] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get(`http://localhost:5180/valid-search-terms/`);
			const fruits: Array<string> = Array.from(new Set(
								response.data.filter(item => item.type === "fruit")
								.map(item => item.word)));
			setFruitNames(fruits);
			setLoaded(true);
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		}
		fetchData();
	}, []);

	const randomFruitPage = useCallback(() => {
		if(loaded)  {
			const randomIdx = Math.floor(Math.random() * fruitNames.length);
			navigate(`/fruit/${fruitNames[randomIdx]}`); 
		} else {
			setClickWaiting(true);
		}
	}, [loaded]);

	useEffect(() => {
		if(loaded && clickWaiting) {
			randomFruitPage();
			setClickWaiting(false);
		}
	}, [loaded, clickWaiting])
	return (
		<Container className={styles.GlassPanel} onClick={randomFruitPage}>
			<h2 className={styles.SurpriseText}>Surprise Me</h2>
		</Container>
);
}

export default Surprise;