import Image from "next/image";
import styles from "./comment-form.module.css";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../store/current-user-context";
import SelectedCommentContext from "../store/selected-comment-context";
import CurrentScreenWidth from "../store/screen-size-context";

import { useRef } from "react";

export default function CommentForm(props) {
	const { isMobile } = useContext(CurrentScreenWidth);
	const {
		isReply,
		toUser,
		toParentCommentId,
		cancelReply,
		isUpdate,
		cancelUpdate,
	} = props;
	const { username, userimage } = useContext(CurrentUserContext);
	const { commentId, mentionedUserName, commentContent } = useContext(
		SelectedCommentContext
	);
	const [selectedComment, setSelectedComment] = useState({
		commentId: "",
		mentionedUserName: "",
		commentContent: "",
	});
	useEffect(() => {
		setSelectedComment({
			commentId: commentId,
			mentionedUserName: mentionedUserName,
			commentContent: commentContent,
		});
	}, [commentId, mentionedUserName, commentContent]);
	function textareaChange(event) {
		const content = event.target.value;
		setSelectedComment({ ...selectedComment, commentContent: content });
	}

	const imgSource = userimage.replace("./", "/");
	const userComment = useRef();
	function postComment(postData) {
		fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify(postData),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				userComment.current.value = "";
				cancelReply();
				setSelectedComment({
					commentId: "",
					mentionedUserName: "",
					commentContent: "",
				});
			});
	}
	function updateComment(updateData) {
		fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify(updateData),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				userComment.current.value = "";
				cancelUpdate();
				setSelectedComment({
					commentId: "",
					mentionedUserName: "",
					commentContent: "",
				});
			});
	}
	function sumbmitHandler(event) {
		event.preventDefault();

		const enteredComment = userComment.current.value;
		if (isUpdate) {
			const updateData = {
				commentId: commentId,
				mentionedUserName: mentionedUserName,
				commentContent: enteredComment
					.replace("@" + mentionedUserName, "")
					.trim(),
				updateRequest: true,
			};
			updateComment(updateData);
		} else if (isReply) {
			const postData = {
				parentCommentId: toParentCommentId,
				mentionedUserName: toUser,
				commentContent: enteredComment.replace("@" + toUser, "").trim(),
				username: username,
			};
			postComment(postData);
		} else {
			const postData = {
				commentContent: enteredComment.trim(),
				username: username,
			};
			postComment(postData);
		}
	}
	return (
		<SelectedCommentContext.Provider value={selectedComment}>
			<form className={styles["form"]} onSubmit={sumbmitHandler}>
				{!isMobile && (
					<Image
						src={imgSource}
						width={40}
						height={40}
						alt="profile picture"
						className={styles["prof-picture"]}
					/>
				)}
				<textarea
					className={styles["content"]}
					placeholder="Add a comment"
					ref={userComment}
					value={selectedComment.commentContent}
					onChange={textareaChange}
					onBlur={() => {
						userComment.current.setSelectionRange(0, 10);
					}}
					readOnly={false}
					required
				></textarea>
				{!isMobile && <input type="submit" className={styles["submit"]} />}
				{isMobile && (
					<div className={styles["hor-wrapper"]}>
						<Image
							src={imgSource}
							width={40}
							height={40}
							alt="profile picture"
							className={styles["prof-picture"]}
						/>
						<input type="submit" className={styles["submit"]} />
					</div>
				)}
			</form>
		</SelectedCommentContext.Provider>
	);
}
