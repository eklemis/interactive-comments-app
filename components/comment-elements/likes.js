import { useState } from "react";
import styles from "./likes.module.css";
export default function CommentLikes(props) {
	const [numLikes, setNumLikes] = useState(props.score);
	function upVote() {
		//Change local state first
		setNumLikes(numLikes + 1);
		//Then send request to make change in server
		const data = {
			commentId: props.commentId,
			vote: "UP",
			currentVote: props.score,
		};
		fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}
	function downVote() {
		//Change local state first
		if (numLikes > 0) setNumLikes(numLikes - 1);
		//Then send request to make change in server
		const data = {
			commentId: props.commentId,
			vote: "DOWN",
			currentVote: props.score,
		};
		fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}
	return (
		<div className={styles["likes-body"]}>
			<button className={styles.button} onClick={upVote}>
				+
			</button>
			<p>{numLikes}</p>
			<button className={styles.button} onClick={downVote}>
				-
			</button>
		</div>
	);
}
