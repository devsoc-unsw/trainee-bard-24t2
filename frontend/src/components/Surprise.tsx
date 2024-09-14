import React from "react";
import { Container } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import styles from "./Surprise.module.css";

function Surprise() {
	const navigate = useNavigate();

	return (
		<Container className={styles.GlassPanel} onClick={() => navigate("/surprise")}>
			{/* <h2 className={styles.SurpriseText}>Surprise Me</h2> */}
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