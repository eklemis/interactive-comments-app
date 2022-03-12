import styles from "./interactive-comments.module.css";
import Comment from "./comment";
import Confirmation from "./comment-elements/confirmation";
import CommentForm from "./comment-form";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import SelectedCommentContext from "../store/selected-comment-context";
import CurrentScreenWidth from "../store/screen-size-context";

export default function InteractiveComments({ currentUser }) {
	const { isMobile } = useContext(CurrentScreenWidth);
	const [newScreenWidthContext, setNewScreenWidthContext] = useState({
		isMobile: isMobile,
	});
	useEffect(() => {
		setNewScreenWidthContext({
			isMobile: window.innerWidth < 600,
		});
		window.addEventListener("resize", () => {
			setNewScreenWidthContext({
				isMobile: window.innerWidth < 600,
			});
		});
		return () => {
			window.removeEventListener("resize");
		};
	}, []);

	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data, error } = useSWR("/api/comments", fetcher, {
		refreshInterval: 500,
	});
	const [selectedComment, setSelectedComment] = useState({
		commentId: "",
		mentionedUserName: "",
		commentContent: "",
	});
	const [isUpdate, setIsUpdate] = useState(false);
	function setEditedComment(newIsUpdate, newSelectedComment) {
		setIsUpdate(newIsUpdate);
		setSelectedComment(newSelectedComment);
	}

	const [isReply, setIsReply] = useState(false);
	const [toUser, setToUser] = useState("");
	const [toParentCommentId, setToParentCommentId] = useState();
	const [deleteRequested, setDeleteRequested] = useState();
	const [deleteData, setDeleteData] = useState();
	useEffect(() => {
		setDeleteRequested(false);
	}, []);
	function setCommentAsReply(newToUser, newToParrentCommentId) {
		console.log("Set reply called!");
		setIsReply(true);
		setToUser(newToUser);
		setToParentCommentId(newToParrentCommentId);
		setSelectedComment({
			commentId: "",
			mentionedUserName: newToUser,
			commentContent: "@" + newToUser + " ",
		});
	}
	function cancelUpdate() {
		setIsUpdate(false);
	}
	function cancelReply() {
		setIsReply(false);
		setToUser("");
	}
	function sendDelRequest(delData) {
		fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify(delData),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setDeleteRequested(false);
			});
	}
	function deleteReply(commentId) {
		//alert("Request delete for Reply with comment id: " + commentId);
		const delData = {
			deleteRequest: true,
			deleteItem: "reply",
			commentId: commentId,
		};
		setDeleteData(delData);
		setDeleteRequested(true);
		//sendDelRequest(delData);
	}
	function deleteComment(commentId) {
		//alert("Request delete for Comment with comment id: " + commentId);
		const delData = {
			deleteRequest: true,
			deleteItem: "comment",
			commentId: commentId,
		};
		setDeleteData(delData);
		setDeleteRequested(true);
		//sendDelRequest(delData);
	}
	if (error) return <p>Data fetch error!</p>;
	const commentsEl = data.map((comment) => (
		<Comment
			key={`comm${comment.id}`}
			id={comment.id}
			username={comment.user.username}
			userimage={comment.user.image.png}
			content={comment.content}
			createdAt={comment.createdAt}
			score={comment.score}
			replies={comment.replies}
			setCommentAsReply={setCommentAsReply}
			cancelReply={cancelReply}
			deleteComment={deleteComment}
			deleteReply={deleteReply}
			setEditedComment={setEditedComment}
		/>
	));
	return (
		<SelectedCommentContext.Provider value={selectedComment}>
			<CurrentScreenWidth.Provider value={newScreenWidthContext}>
				<section className={styles["comments-wrapper"]}>
					<h2>Comments</h2>
					{commentsEl}
					<CommentForm
						username={currentUser.username}
						userimage={currentUser.image.png}
						isReply={isReply}
						isUpdate={isUpdate}
						toUser={toUser}
						toParentCommentId={toParentCommentId}
						cancelReply={cancelReply}
						cancelUpdate={cancelUpdate}
					/>
				</section>
				{deleteRequested && (
					<Confirmation
						setDeleteRequested={setDeleteRequested}
						deleteData={deleteData}
						sendDelRequest={sendDelRequest}
					/>
				)}
			</CurrentScreenWidth.Provider>
		</SelectedCommentContext.Provider>
	);
}
