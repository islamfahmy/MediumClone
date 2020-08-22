const reducer = (state = {}, action) => {
	switch (action.type) {
		case "USER/UPDATE_INFO":
			return { ...state, ...action.info };
		case "USER/FOLLOW_USER":
			return { ...state, following: state.following.concat(action.userId) };
		case "USER/UNFOLLOW_USER":
			return {
				...state,
				following: state.following.filter((u) => u !== action.userId),
			};
		case "USER/ADD_PERFERENCE":
			return {
				...state,
				perferences: state.perferences.concat(action.perference),
			};
		case "USER/REMOVE_PERFERENCE":
			return {
				...state,
				perferences: state.perferences.filter((p) => p !== action.perference),
			};
		default:
			return state;
	}
};

export default reducer;
