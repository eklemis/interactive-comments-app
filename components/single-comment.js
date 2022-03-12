import React, { useContext } from "react";

import styles from "./single-comment.module.css";
import CommentHeader from "./comment-elements/header";
import CommentLikes from "./comment-elements/likes";
import CommentActions from "./comment-elements/actions";
import CurrentScreenWidth from "../store/screen-size-context";

export default function SingleComment(props) {
	const {
		id,
		commentId,
		username,
		userimage,
		content,
		createdAt,
		replyTo,
		score,
		setCommentAsReply,
		cancelReply,
		deleteSelf,
		setEditedComment,
	} = props;
	const { isMobile } = useContext(CurrentScreenWidth);
	return (
		<article className={styles["comment-wrapper"]}>
			{!isMobile && <CommentLikes score={score} commentId={commentId} />}
			<div className={styles.wrapper}>
				<CommentHeader
					image={userimage}
					username={username}
					createdAt={createdAt}
				/>
				{!isMobile && (
					<CommentActions
						id={id}
						commentId={commentId}
						username={username}
						setCommentAsReply={setCommentAsReply}
						cancelReply={cancelReply}
						deleteComment={deleteSelf}
						setEditedComment={setEditedComment}
						content={content}
						replyTo={replyTo}
					/>
				)}
				<p className={styles["content"]}>
					{replyTo && <span className={styles["reply-to"]}>@{replyTo}</span>}
					{content}
				</p>
				{isMobile && (
					<div className={styles["hor-wrapper"]}>
						<CommentLikes score={score} commentId={commentId} />
						<CommentActions
							id={id}
							commentId={commentId}
							username={username}
							setCommentAsReply={setCommentAsReply}
							cancelReply={cancelReply}
							deleteComment={deleteSelf}
							setEditedComment={setEditedComment}
							content={content}
							replyTo={replyTo}
						/>
					</div>
				)}
			</div>
		</article>
	);
}
