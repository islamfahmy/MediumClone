export const initUser = () => {
	// get user from localstorage or from server
};

export const updateInfo = (info) => {
	return {
		type: "USER/UPDATE_INFO",
		info,
	};
};

export const followUser = (userId) => {
	return {
		type: "USER/FOLLOW_USER",
		userId,
	};
};

export const unfollowUser = (userId) => {
	return {
		type: "USER/UNFOLLOW_USER",
		userId,
	};
};

export const addPerference = (perference) => {
	return {
		type: "USER/ADD_PERFERENCE",
		perference,
	};
};

export const removePerference = (perference) => {
	return {
		type: "USER/REMOVE_PERFERENCE",
		perference,
	};
};
