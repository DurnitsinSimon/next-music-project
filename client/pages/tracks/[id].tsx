import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';
import { IComment } from '../../types/comment';
import { ITrack } from '../../types/track';

interface ICommentResponse extends Response {
	data: IComment;
}

const TrackPage = ({ serverTrack }) => {
	const [track, setTrack] = useState<ITrack>(serverTrack);
	 
	const router = useRouter();
	const username = useInput('');
	const text = useInput('');

	const addComment = async () => {
		try {
			const res: ICommentResponse = await axios.post('http://localhost:5050/api/tracks/addComment', {
				username: username.value,
				text: text.value,
				track: track._id,
			});
			setTrack({...track, comments: [...track.comments, res.data]});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<MainLayout title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}>
			<Button variant={'outlined'} onClick={() => router.push('/tracks')} style={{ fontSize: 32 }}>
				К списку
			</Button>
			<Grid container style={{ margin: '20px 0' }}>
				<img src={'http://localhost:5050/' + track.picture} width={200} height={200} />
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
				<TextField label='Ваше имя' fullWidth {...username} />
				<TextField label='Комментарий' fullWidth multiline rows={4} {...text} />
				<Button onClick={addComment}>Отправить</Button>
			</Grid>
			<div>
				{track.comments.map((comment: IComment) => (
					<div key={comment._id}>
						<div>Автор - {comment.username}</div>
						<div>Комментарий{comment.text}</div>
					</div>
				))}
			</div>
		</MainLayout>
	);
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const res = await axios.get('http://localhost:5050/api/tracks/' + params.id);

	return {
		props: {
			serverTrack: res.data,
		},
	};
};
