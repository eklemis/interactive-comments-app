import { getFormatedComments } from "../../helpers/prisma-to-json";
import {
	addComment,
	addReply,
	removeComment,
	removeReply,
	updateComment,
	updateLikes,
} from "../../helpers/crud";

export default async function handler(req, res) {
	if (req.method === "POST") {
		//Handle delete request
		if (req.body.deleteRequest) {
			const commentId = req.body.commentId;
			let result;
			if (req.body.deleteItem.toLowerCase() === "comment") {
				result = await removeComment(commentId);
			} else {
				result = await removeReply(commentId);
			}
			if (result) {
				res.status(200).json({ message: "success", data: result });
			} else {
				res
					.status(500)
					.json({ message: "delete failed", data: "Internal server error!" });
			}
		}
		//Handle update comment request!
		else if (req.body.updateRequest) {
			const commentId = req.body.commentId;
			const commentContent = req.body.commentContent;
			console.log("Update comment requested!");
			const result = await updateComment(commentId, commentContent);
			res.status(200).json({ message: "success", data: result });
		}
		//Handle add reply request
		else if (req.body.parentCommentId) {
			const parentCommentId = req.body.parentCommentId;
			const mentionedUserName = req.body.mentionedUserName;
			const commentContent = req.body.commentContent;
			const username = req.body.username;
			//PAUSE HERE
			const result = await addReply(
				username,
				commentContent,
				parentCommentId,
				mentionedUserName
			);
			res.status(200).json({ message: "success", data: result });
		}
		//Handle vote change
		else if (req.body.vote) {
			const commentId = req.body.commentId;
			let newNumLikes;
			if (req.body.vote === "UP") {
				newNumLikes = req.body.currentVote + 1;
			} else if (req.body.vote === "DOWN") {
				newNumLikes = req.body.currentVote - 1;
				if (newNumLikes < 0) newNumLikes = 0;
			}
			const result = await updateLikes(commentId, newNumLikes);
			res.status(200).json({ message: "success", data: result });
		}
		//Handle add comment request
		else {
			const commentContent = req.body.commentContent;
			const userName = req.body.username;

			const result = await addComment(userName, commentContent);

			res.status(200).json({ message: "success", data: result });
		}
	} else {
		console.log("Commments data requested!");
		try {
			const comments = await getFormatedComments();
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify(comments));
		} catch (error) {
			res.status(405).json({ message: error });
		}
	}
}
