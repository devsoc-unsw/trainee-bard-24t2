import React, { useEffect, useCallback, useState } from "react";
import { Container } from "@mantine/core";
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
		<Container className={styles.GlassPanel} onClick={() => navigate("/surprise")}>
			{/* <h2 className={styles.SurpriseText}>Surprise Me</h2> */}
			{/* To be uncommented if everyone agrees on adding the cat :D (css too)*/}
			<div className={styles.container}>
				<div className={styles.box}>
				<div className={styles.boxTop}>
					<ul>
					<li className={styles.first}></li>
					<li className={styles.middle}></li>
					<li className={styles.last}></li>
					</ul>
					<div className={styles.lid}><span></span></div>
				</div>
				<div className={styles.boxBottom}>
					<div className={styles.base}><span></span></div>
					<div className={styles.cat}>
					<div className={styles.face}>
						<span className={`${styles.eye} ${styles.left}`}></span>
						<span className={`${styles.eye} ${styles.right}`}></span>
						<span className={styles.nose}></span>
						<span className={styles.mouth}></span>
					</div>
					<div className={styles.body}>
						<span className={`${styles.hand} ${styles.left}`}></span>
						<span className={`${styles.hand} ${styles.right}`}></span>
						<div className={styles.rotulo}><span>Surprise Me!</span></div>
					</div>
					</div>
				</div>
				</div>
			</div>
		</Container>
);
}

export default Surprise;