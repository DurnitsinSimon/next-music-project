import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [pciture, setPicture] = useState({});
	const [audio, setAudio] = useState({});

	const next = () => {
		if (activeStep !== 2) {
			setActiveStep((prev) => prev + 1);
		}
		return;
	};

	const back = () => {
		setActiveStep((prev) => prev - 1);
	};
	return (
		<MainLayout>
			<StepWrapper activeStep={activeStep}>
				{activeStep === 0 && (
					<Grid container direction={'column'} style={{ padding: 20 }}>
						<TextField label={'Название трека'} style={{ marginTop: 10 }} />
						<TextField label={'Имя автора'} style={{ marginTop: 10 }} />
						<TextField label={'Текст к песне'} multiline rows={3} style={{ marginTop: 10 }} />
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
