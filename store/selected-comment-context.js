import { createContext } from "react";

const SelectedCommentContext = createContext({
	commentId: "",
	mentionedUserName: "",
	commentContent: "",
});

export default SelectedCommentContext;
