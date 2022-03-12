import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function simpleTime(prevDate) {
	let simpleDiff = "";
	let presentDate = new Date();
	// One day in milliseconds
	const oneDay = 1000 * 60 * 60 * 24;

	// Calculating the time difference between two dates
	const diffInTime = presentDate.getTime() - prevDate.getTime();

	// Calculating the no. of days between two dates
	const diffInDays = Math.round(diffInTime / oneDay);

	if (diffInDays >= 365) {
		const yearDiff = Math.round(diffInDays / 365);
		simpleDiff = yearDiff == 1 ? "a year ago" : yearDiff + " years ago";
		return simpleDiff;
	}
	if (diffInDays >= 28) {
		const monthDiff = Math.round(diffInDays / 28);
		simpleDiff = monthDiff == 1 ? "a month ago" : monthDiff + " months ago";
		return simpleDiff;
	}
	if (diffInDays >= 1) {
		simpleDiff = diffInDays == 1 ? "one day ago" : diffInDays + " days ago";
		return simpleDiff;
	}
	const oneHour = 1000 * 60 * 60;
	const diffInHour = Math.round(diffInTime / oneHour);
	if (diffInHour >= 1) {
		simpleDiff = diffInHour == 1 ? "one hour ago" : diffInHour + "hours ago";
		return simpleDiff;
	}
	const oneMenute = 1000 * 60;
	const diffInMenutes = Math.round(diffInTime / oneMenute);
	if (diffInMenutes >= 1) {
		simpleDiff =
			diffInMenutes == 1 ? "a menute ago" : diffInMenutes + " menutes ago";
		return simpleDiff;
	}
	return "just posted";
}

export async function getFormatedComments() {
	console.log("FormatedComments is called!");
	const formatedComments = [];
	const allCommentsFromDb = await prisma.comments.findMany({
		where: { type: "MAIN" },
		include: { user: true, replies: true },
	});
	//console.log(allCommentsFromDb);
	const allRepliesFromDb = await prisma.replies.findMany({
		include: { comment: true, mentionedUser: true },
	});
	const allUserFromDb = await prisma.user.findMany();
	allCommentsFromDb.forEach((comment) => {
		const newComment = {
			id: comment.id,
			content: comment.content,
			createdAt: simpleTime(comment.postedAt),
			score: comment.numLikes,
			user: {
				image: {
					png: comment.user.imagePng,
					webp: comment.user.imageWebp,
				},
				username: comment.user.userName,
			},
			replies: [],
		};
		if (comment.replies.length > 0) {
			const commentReplies = allRepliesFromDb.filter(
				(reply) => reply.parentCommentId === comment.id
			);
			commentReplies.forEach((reply) => {
				const currUser = allUserFromDb.filter(
					(user) => user.userName === reply.comment.userName
				)[0];
				const userImages = { png: currUser.imagePng, webp: currUser.imageWebp };
				const newReply = {
					id: reply.id,
					commentId: reply.comment.id,
					content: reply.comment.content,
					createdAt: simpleTime(reply.comment.postedAt),
					score: reply.comment.numLikes,
					replyingTo: reply.mentionedUserName,
					user: {
						image: userImages,
						username: reply.comment.userName,
					},
				};
				newComment.replies.push(newReply);
			});
		}
		formatedComments.push(newComment);
	});
	return formatedComments;
}
