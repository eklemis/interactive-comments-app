import { getComments } from "../../helpers/crud";

export default async function handler(req, res) {
	if (req.method === "GET") {
		userName = req.body.userName;
		const comments = getComments(userName);
		res.status(200).json({ message: "success", data: comments });
	}
	res.status(400).json({ message: "no available response" });
}
