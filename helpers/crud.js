import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* CREATE PARTS */
export async function addComment(username, content) {
	const comment = await prisma.comments.create({
		data: {
			content: content,
			numLikes: 0,
			user: {
				connect: {
					userName: username,
				},
			},
		},
	});
	return comment;
}

export async function addReply(
	username,
	content,
	parentCommentId,
	mentionedUserName
) {
	const comment = await prisma.comments.create({
		data: {
			content: content,
			numLikes: 0,
			type: "REPLY",
			user: {
				connect: {
					userName: username,
				},
			},
		},
	});
	const reply = await prisma.replies.create({
		data: {
			comment: {
				connect: {
					id: comment.id,
				},
			},
			mentionedUser: {
				connect: {
					userName: mentionedUserName,
				},
			},
			parentComment: {
				connect: {
					id: parentCommentId,
				},
			},
		},
		include: {
			comment: true,
			mentionedUser: true,
			parentComment: true,
		},
	});
	return reply;
}
/* READ PARTS */
export async function getComments(userName) {
	let allCommentsFromDb;
	if (userName) {
		allCommentsFromDb = await prisma.comments.findMany({
			where: {
				userName: userName,
			},
		});
	} else {
		allCommentsFromDb = await prisma.comments.findMany();
	}

	return allCommentsFromDb;
}
export async function getUsers() {
	const usersFromDb = await prisma.user.findMany();
	return usersFromDb;
}
/* DELETE PARTS */
export async function removeReply(commentId) {
	const deletedReply = prisma.replies.deleteMany({
		where: {
			commentId: commentId,
		},
	});
	const deletedComment = prisma.comments.delete({
		where: {
			id: commentId,
		},
	});
	const transaction = await prisma.$transaction([deletedReply, deletedComment]);
	return transaction;
}
export async function removeComment(commentId) {
	const deletedComment = await prisma.comments.delete({
		where: {
			id: commentId,
		},
	});
	return deletedComment;
}

export function addUser(username, imagePng, imageWebp) {}

// UPDATE Comment Content
export async function updateComment(commentId, newContent) {
	const updatedComment = await prisma.comments.update({
		where: {
			id: commentId,
		},
		data: {
			content: newContent,
		},
	});
}
// UPDATE Comment likes
export async function updateLikes(commentId, newNumLikes) {
	const updatedComment = await prisma.comments.update({
		where: {
			id: commentId,
		},
		data: {
			numLikes: newNumLikes,
		},
	});
}
