import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputControlled } from "@/Components/Input";
import { FluidContainer, Form, ImgAuth } from "@/styles/global";
import { ButtonComponent } from "@/Components/Button";
import { AuthTitleComponent } from "@/Components/AuthTitle";
import AuthAccountSpan from "@/Components/AuthAccountSpan";
import { Inertia } from "@inertiajs/inertia";

export default function Register({ errors: propsErrors }) {
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm();

	useEffect(() => {
		if (!propsErrors) return;
		Object.keys(propsErrors).map((key) => {
			setError(key, { type: 'custom', message: propsErrors[key] });
		});
	}, [propsErrors]);

	async function register(data) {
		await Inertia.post('/users/register', data);
	}

	return (
		<FluidContainer>
			<div>
				<AuthTitleComponent>Create new account</AuthTitleComponent>
				<AuthAccountSpan content="Already A Member? " link="/login" linkTitle="Log In" />
				<Form onSubmit={handleSubmit(register)}>
					<InputControlled control={control} label="Full Name" type="text" name="name" />
					<InputControlled control={control} label="Email" type="text" name="email" />
					<InputControlled control={control} label="Password" type="password" name="password" />
					<InputControlled control={control} label="Confirm Password" type="password" name="password_confirmation" />
					<ButtonComponent name="Create Account" />
				</Form>
			</div>
			<ImgAuth src="/assets/imgs/newpicture.svg" alt="" />
		</FluidContainer>
	);
}