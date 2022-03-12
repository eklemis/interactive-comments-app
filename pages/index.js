import Head from "next/head";
import styles from "../styles/Home.module.css";
import CurrentUserContext from "../store/current-user-context";

import InteractiveComments from "../components/interactive-comments";

import { getFormatedComments } from "../helpers/prisma-to-json";
import { SWRConfig } from "swr";

export default function Home(props) {
	const { currentUser, fallback } = props;

	const newContext = {
		username: currentUser.username,
		userimage: currentUser.image.png,
	};
	return (
		<CurrentUserContext.Provider value={newContext}>
			<div className={styles.container}>
				<Head>
					<title>Interactive Comment</title>
					<meta
						name="description"
						content="Interactive comments component with React-NextJS"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<SWRConfig value={{ fallback }}>
					<InteractiveComments currentUser={currentUser} />
				</SWRConfig>
			</div>
		</CurrentUserContext.Provider>
	);
}

export async function getStaticProps() {
	const commentsDb = await getFormatedComments();
	const currentUser = {
		image: {
			png: "./images/avatars/image-juliusomo.png",
			webp: "./images/avatars/image-juliusomo.webp",
		},
		username: "juliusomo",
	};

	return {
		props: {
			currentUser: currentUser,
			fallback: {
				"/api/comments": commentsDb,
			},
		},
		revalidate: 10,
	};
}
