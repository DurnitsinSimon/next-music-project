import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

const TrackPage = () => {
	const track: ITrack = {
		_id: '1',
		name: 'Track 1',
		artist: 'dj khalid',
		listens: 5,
		text: 'content',
		comments: [],
		picture: 'http://localhost:5050/image/0773460b-4c62-41cc-9274-d1cd49456ee2.png',
		audio: 'http://localhost:5050/audio/d3acaf28-93e8-4122-9d55-994f4ea5e67c.mp3',
	};

	const router = useRouter();

	return (
		<MainLayout>
			<Button variant={'outlined'} onClick={() => router.push('/tracks')} style={{ fontSize: 32 }}>
				К списку
			</Button>
			<Grid container style={{ margin: '20px 0' }}>
				<img src={track.picture} width={200} height={200} />
				<div style={{ margin: '0 0 0 20px' }}>
					<div style={{ fontSize: 40, fontWeight: 'bold' }}>Название трека - {track.name}</div>
					<h1>Исполнитель - {track.artist}</h1>
					<h1>Прослушивания - {track.listens}</h1>
				</div>
			</Grid>
			<h1>Слова песни</h1>
			<p>{track.text}</p>
			<h1>Комментарии</h1>
			<Grid container>
				<TextField label='Ваше имя' fullWidth />
				<TextField label='Комментарий' fullWidth multiline rows={4} />
				<Button>Отправить</Button>
			</Grid>
			<div>
				{track.comments.map((comment) => (
					<div>
						<div>Автор - {comment.username}</div>
						<div>Комментарий{comment.text}</div>
					</div>
				))}
			</div>
		</MainLayout>
	);
};

export default TrackPage;
