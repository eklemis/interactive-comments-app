export default function CommentContent(props) {
	return (
		<p>
			{props.toUser && <span className="">{props.toUser}</span>}
			{props.commentText}
		</p>
	);
}
