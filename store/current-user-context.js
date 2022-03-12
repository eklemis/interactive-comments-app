import { createContext } from "react";

const CurrentUserContext = createContext({
	username: "",
	userimage: "",
});

export default CurrentUserContext;
