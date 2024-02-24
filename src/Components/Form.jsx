import axios from 'axios';
import { Children, useState } from 'react';

const Form = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name || !formData.email || !formData.message) {
			alert('Please fill in all fields');
			return;
		}
		try {
			setFormData({ name: '', email: '', message: '' });
			await axios.post(
				'https://cfbackend.onrender.com/send-email',
				formData,
			);
			alert('mail send successfully');
		} catch (error) {
			console.error('Error sending email:', error);
		}
	};

	return (
		<div className='flex h-screen w-full items-center justify-center'>
			<form className='flex flex-col' onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input
					className='border border-black p-2'
					placeholder='Enter Name'
					type='text'
					name='name'
					id='name'
					onChange={handleInput}
					value={formData.name}
					required
				/>
				<label htmlFor='email'>Email</label>
				<input
					placeholder='Enter Email'
					className='border border-black p-2'
					type='email'
					name='email'
					id='email'
					onChange={handleInput}
					value={formData.email}
					required
				/>
				<label htmlFor='textarea'>Enter message</label>
				<textarea
					placeholder='Enter Message'
					className='border border-black p-2'
					onChange={handleInput}
					value={formData.message}
					required
					name='message'
					id='textarea'
					cols='50'
					rows='5'></textarea>

				<button
					className='bg-blue-200 mt-4 p-2 rounded-md'
					type='submit'>
					Send
				</button>
			</form>
		</div>
	);
};

export default Form;
