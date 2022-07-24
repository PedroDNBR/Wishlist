import { useState } from 'react';
import { useController, useFormContext, Controller } from 'react-hook-form';
import { Container, Error, Input, Label } from './style';

export function InputControlled({ label, type, name, control, ...rest }) {
	const { field, fieldState } = useController({ name, control });
	const error = fieldState.error?.message;

	return (
		<div>
			<Container isError={!!error}>
				<Label isError={!!error}>{label}</Label>
				<Input
					{...(field || {})}
					value={field.value ?? ''}
					type={type}
					name={name}
				/>
			</Container>
			<Error>{error}</Error>
		</div>
	);
}