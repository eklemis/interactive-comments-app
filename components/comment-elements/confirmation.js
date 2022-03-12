import styles from "./confirmation.module.css";

export default function Confirmation(props) {
	const { deleteData, sendDelRequest } = props;
	function proceedDelete() {
		sendDelRequest(deleteData);
	}
	function cancelDelete() {
		props.setDeleteRequested(false);
	}
	return (
		<div className={styles["wrapper"]}>
			<div className={styles["backdrop"]}></div>
			<section className={styles["content"]}>
				<h2>Delete comment</h2>
				<p>
					Are you sure want to delete this comment? This will remove the comment
					and can&apost be undone.
				</p>
				<div className={styles["hor-wrapper"]}>
					<button className={styles["btn"]} onClick={cancelDelete}>
						NO, CANCEL
					</button>
					<button
						className={styles["btn"] + " " + styles["btn__red"]}
						onClick={proceedDelete}
					>
						YES, DELETE
					</button>
				</div>
			</section>
		</div>
	);
}
