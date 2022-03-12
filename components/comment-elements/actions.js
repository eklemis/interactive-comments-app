import { useContext } from "react";
import Image from "next/image";
import styles from "./actions.module.css";
import CurrentUserContext from "../../store/current-user-context";

export default function CommentActions(props) {
	const currentUser = useContext(CurrentUserContext);
	const isActiveUser = currentUser.username === props.username;
	function setReplyToSelf() {
		props.cancelReply();
		props.setCommentAsReply(props.username, props.id);
	}
	function deleteComment() {
		props.deleteComment(props.commentId);
	}
	function editContent() {
		props.setEditedComment(true, {
			commentId: props.commentId,
			mentionedUserName: props.replyTo ? props.replyTo : "",
			commentContent: props.content,
		});
	}
	return (
		<div className={styles["actions"]}>
			{isActiveUser && (
				<>
					<button className={styles["delete-button"]} onClick={deleteComment}>
						<Image
							src="/images/icon-delete.svg"
							width={15}
							height={15}
							alt=""
						></Image>
						<span>Delete</span>
					</button>
					<button className={styles["edit-button"]} onClick={editContent}>
						<Image
							src="/images/icon-edit.svg"
							width={15}
							height={15}
							alt=""
						></Image>
						<span>Edit</span>
					</button>
				</>
			)}
			{!isActiveUser && (
				<button className={styles["reply-button"]} onClick={setReplyToSelf}>
					<Image
						src="/images/icon-reply.svg"
						width={15}
						height={15}
						alt=""
					></Image>
					<span>Reply</span>
				</button>
			)}
		</div>
	);
}
