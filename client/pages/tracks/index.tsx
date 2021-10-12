import { Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import TrackList from '../../components/TrackList';
import { useActions } from '../../hooks/useTypeSelector';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

const Index = () => {
	const router = useRouter();
	const {} = useActions();
	const tracks: ITrack[] = [
		{
			_id: '1',
			name: 'Track 1',
			artist: 'dj khalid',
			listens: 5,
			text: 'content',
			comments: [],
			picture: 'http://localhost:5050/image/0773460b-4c62-41cc-9274-d1cd49456ee2.png',
			audio: 'http://localhost:5050/audio/d3acaf28-93e8-4122-9d55-994f4ea5e67c.mp3',
		},
		{
			_id: '2',
			name: 'Track 2',
			artist: 'dj khalid',
			listens: 5,
			text: 'content',
			comments: [],
			picture: 'http://localhost:5050/image/0773460b-4c62-41cc-9274-d1cd49456ee2.png',
			audio: 'http://localhost:5050/audio/d3acaf28-93e8-4122-9d55-994f4ea5e67c.mp3',
		},
		{
			_id: '3',
			name: 'Track 3',
			artist: 'dj khalid',
			listens: 5,
			text: 'content',
			comments: [],
			picture: 'http://localhost:5050/image/0773460b-4c62-41cc-9274-d1cd49456ee2.png',
			audio: 'http://localhost:5050/audio/d3acaf28-93e8-4122-9d55-994f4ea5e67c.mp3',
		},
	];

	return (
		<MainLayout>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px', padding: '20px' }}>
					<Grid container justifyContent='space-between'>
						<h1>Список треков</h1>
						<Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
					</Grid>
					<TrackList tracks={tracks} />
				</Card>
			</Grid>
		</MainLayout>
	);
};

export default Index;
