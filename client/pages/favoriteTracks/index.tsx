import { Button, Card, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useAction';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/actions-creators/track';

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
	const dispatch = store.dispatch as NextThunkDispatch;
	await dispatch(fetchTracks());
});

const Index = () => {
	const router = useRouter();
	const [query, setQuery] = useState<string>('');
	const { tracks, error } = useTypedSelector((state) => state.tracks);

	const dispatch = useDispatch();
	const [timer, setTimer] = useState(null);
	const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		if (timer) {
			clearTimeout(timer);
		}
		setTimer(
			setTimeout(async () => {
				await dispatch(await searchTracks(e.target.value));
			})
		);
	};

	if (error) {
		return (
			<MainLayout>
				<h1>{error}</h1>
			</MainLayout>
		);
	}
	return (
		<MainLayout title={'Список треков - музыкальная платформа'}>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px', padding: '20px' }}>
					<Grid container justifyContent='space-between'>
						<h1>Список треков</h1>
						<Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
					</Grid>
					<TextField fullWidth value={query} onChange={search} />
					<TrackList tracks={tracks} />
				</Card>
			</Grid>
		</MainLayout>
	);
};

export default Index;
