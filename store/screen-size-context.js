import { createContext, useState } from "react";

const CurrentScreenWidth = createContext({
	isMobile: true,
});

export default CurrentScreenWidth;
