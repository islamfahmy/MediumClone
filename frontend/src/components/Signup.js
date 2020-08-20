import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions/usersActions";
const Signup = () => {
	const { register, errors, handleSubmit } = useForm();
	const dispatcher = useDispatch();
	const onSubmit = (data, event) => {
		console.log(data, event);
		dispatcher(addUser(data));
	};

	const onError = (error, event) => {
		console.log(error, event);
	};

	return (
		<Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
			<Form.Row>
				<Form.Group as={Col} controlId="usernameField">
					<Form.Label>Username</Form.Label>
					<Form.Control
						name="username"
						type="text"
						placeholder="enter your username here"
						ref={register({ required: true })}
					/>
					<Form.Text className="text-muted">
						Must be between 4 and 20 numbers and letters
					</Form.Text>
				</Form.Group>
				<Form.Group as={Col} controlId="passwordField">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						type="password"
						placeholder="enter your password here"
						ref={register({ required: true })}
					/>
					<Form.Text className="text-muted">Choose a strong password</Form.Text>
				</Form.Group>
			</Form.Row>
			<Form.Group controlId="emailField">
				<Form.Label>E-mail</Form.Label>
				<Form.Control
					name="email"
					type="text"
					placeholder="enter your e-mail here"
					ref={register({
						pattern: {
							value: /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
							message: "invalid format",
						},
						required: true,
					})}
				/>
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default Signup;
