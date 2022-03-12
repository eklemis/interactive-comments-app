import Image from "next/image";
import styles from "./header.module.css";
import { useContext } from "react";
import CurrentUserContext from "../../store/current-user-context";

export default function CommentHeader(props) {
	const imgSource = props.image.replace("./", "/");
	const currentUser = useContext(CurrentUserContext);
	const isActiveUser = currentUser.username === props.username;
	return (
		<header className={styles["header"]}>
			<Image src={imgSource} width={35} height={35} alt="profile picture" />
			<p className={styles["user-name"]}>{props.username}</p>
			{isActiveUser && <span className={styles["you"]}>you</span>}
			<p className={styles["posting-time"]}>{props.createdAt}</p>
		</header>
	);
}
