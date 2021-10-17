import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const [picture, setPicture] = useState(null);
	const [audio, setAudio] = useState(null);

	const name = useInput('');
	const artist = useInput('');
	const text = useInput('');

	const router = useRouter();

	const next = () => {
		if (activeStep !== 2) {
			setActiveStep((prev) => prev + 1);
		} else {
			const formData = new FormData();
			formData.append('name', name.value);
			formData.append('text', text.value);
			formData.append('artist', artist.value);
			formData.append('picture', picture);
			formData.append('audio', audio);
			axios
				.post('http://localhost:5050/api/tracks', formData)
				.then(() => router.push('/tracks'))
				.catch((e) => console.log(e));
		}
	};

	const back = () => {
		setActiveStep((prev) => prev - 1);
	};
	return (
		<MainLayout>
			<StepWrapper activeStep={activeStep}>
				{activeStep === 0 && (
					<Grid container direction={'column'} style={{ padding: 20 }}>
						<TextField label={'Название трека'} style={{ marginTop: 10 }} {...name} />
						<TextField label={'Имя автора'} style={{ marginTop: 10 }} {...artist} />
						<TextField label={'Текст к песне'} multiline rows={3} style={{ marginTop: 10 }} {...text} />
					</Grid>
				)}

				{activeStep === 1 && (
					<>
						<FileUpload setFile={setPicture} accept={'image/*'}>
							<Button>Загрузите изображение</Button>
						</FileUpload>
						<FileUpload setFile={setAudio} accept={'audio/*'}>
							<Button>Загрузите аудио</Button>
						</FileUpload>
					</>
				)}

				{activeStep === 2 && <h1>STEP 3</h1>}
			</StepWrapper>
			<Grid container justifyContent='space-between'>
				<Button disabled={activeStep === 0} onClick={back}>
					Назад
				</Button>
				<Button onClick={next}>Далее</Button>
			</Grid>
		</MainLayout>
	);
};

export default Create;
