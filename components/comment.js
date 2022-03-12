import SingleComment from "./single-comment";
import styles from "./comment.module.css";

export default function Comment(props) {
	const {
		id,
		username,
		userimage,
		content,
		createdAt,
		score,
		replies,
		setCommentAsReply,
		cancelReply,
		deleteComment,
		deleteReply,
		setEditedComment,
	} = props;

	//Shows replies when a blog level comment has comments
	let repliesComments;
	if (replies.length > 0) {
		repliesComments = replies.map((reply) => (
			<SingleComment
				key={`rep-${reply.id}`}
				id={id}
				commentId={reply.commentId}
				username={reply.user.username}
				userimage={reply.user.image.png}
				content={reply.content}
				createdAt={reply.createdAt}
				score={reply.score}
				replyTo={reply.replyingTo}
				setCommentAsReply={setCommentAsReply}
				cancelReply={cancelReply}
				deleteSelf={deleteReply}
				setEditedComment={setEditedComment}
			/>
		));
	}

	return (
		<>
			<SingleComment
				id={id}
				commentId={id}
				username={username}
				userimage={userimage}
				content={content}
				createdAt={createdAt}
				score={score}
				setCommentAsReply={setCommentAsReply}
				cancelReply={cancelReply}
				deleteSelf={deleteComment}
				setEditedComment={setEditedComment}
			/>
			{replies.length > 0 && (
				<div className={styles["replies-wrapper"]}>{repliesComments}</div>
			)}
		</>
	);
}
