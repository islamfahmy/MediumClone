const initialState = [
	{
		_id: 1,
		username: "Musty",
		email: "dummy@dummy.com",
		following: [2],
		followers: [3],
		recentlyViewedArticles: [],
		savedArticles: [],
		articles: [],
		perferences: ["web"],
	},
	{
		_id: 2,
		username: "Musty2",
		email: "dummy2@dummy.com",
		following: [3],
		followers: [1],
		recentlyViewedArticles: [],
		savedArticles: [],
		articles: [],
		perferences: ["js"],
	},
	{
		_id: 3,
		username: "Musty3",
		email: "dummy3@dummy.com",
		following: [1],
		followers: [],
		recentlyViewedArticles: [],
		savedArticles: [],
		articles: [],
		perferences: ["c++"],
	},
];
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "USERS/GET_USERS":
			return state;
		case "USERS/ADD_USER":
			return [...state, action.data];
		default:
			return state;
	}
};

export const getUsers = () => {
	return {
		type: "USERS/GET_USERS",
	};
};

export default reducer;
