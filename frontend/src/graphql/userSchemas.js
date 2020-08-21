import { gql } from "graphql";

export const GET_USERS = gql`
	query users($username: String) {
		users(username: $username) {
			_id
			username
			articles {
				_id
				title
				likes
			}
			perferences
		}
	}
`;

export const GET_CURRENT_USER = gql`
	query {
		currentUser {
			_id
			username
			email
			following {
				_id
				username
			}
			followers {
				_id
				username
			}
		}
	}
`;
export const CREATE_USER = gql`
	mutation createUser($username: String!, $email: String!, $password: String!) {
		createUser(username: $username, email: $email, password: $password) {
			_id
			username
		}
	}
`;
export const FOLLOW_USER = gql`
	mutation followUser($id: String) {
		followUser(id: $id) {
			username
		}
	}
`;
export const UNFOLLOW_USER = gql`
	mutation unFollowUser($id: String) {
		unFollowUser(id: $id) {
			username
		}
	}
`;
export const ADD_PERFERENCE = gql`
	mutation addPerference($perference: String!) {
		addPerference(perference: $perference)
	}
`;

export const REMOVE_PERFERENCE = gql`
	mutation addPerference($perference: String!) {
		removePerference(perference: $perference)
	}
`;
