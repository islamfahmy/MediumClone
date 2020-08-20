export const getUsers = () => {
	return {
		type: "USERS/GET_USERS",
	};
};
export const addUser = (newUser) => {
	return {
		type: "USERS/ADD_USER",
		data: newUser,
	};
};
