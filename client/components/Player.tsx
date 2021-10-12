import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useAction';
import { useActions } from '../hooks/useTypeSelector';
import styles from '../styles/Player.module.scss';
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';

let audio;

const Player: FC = () => {
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

	const { pause, duration, volume, currentTime, active } = useTypedSelector((state) => state.player);
	const { playTrack, pauseTrack, setVolume, setCurrentTime, setDuration } = useActions();

	const setAudio = () => {
		audio = new Audio();
		audio.src = active?.audio;
		audio.volume = volume / 100;
		audio.onloadedmetadata = () => {
			setDuration(Math.ceil(audio.duration));
		};
		audio.ontimeupdate = () => {
			setCurrentTime(Math.ceil(audio.currentTime));
		};
	};
	console.log(pause);
	useEffect(() => {
		 
		if (!audio) {
			audio = new Audio();
		} else {
			setAudio();
			play();
		}
	}, [active]);

	const play = () => {
		if (pause) {
			playTrack();
			audio.play();
		} else {
			pauseTrack();
			audio.pause();
		}
	};

	const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVolume(+e.target.value);
		audio.volume = +e.target.value / 100;
	};

	const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentTime(Math.ceil(+e.target.value));
		audio.currentTime = Math.ceil(+e.target.value);
	};

	if (!active) {
		return null;
	}

	return (
		<div className={styles.player}>
			<IconButton onClick={() => play()}>{!pause ? <Pause /> : <PlayArrow />}</IconButton>
			<Grid container direction='column' style={{ width: 200, margin: '0 20px' }}>
				<div>{active?.name}</div>
				<div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
			</Grid>
			<TrackProgress left={currentTime} right={duration} onChange={changeTime} />
			<VolumeUp style={{ marginLeft: 'auto' }} />
			<TrackProgress left={volume} right={100} onChange={changeVolume} />
		</div>
	);
};

export default Player;
