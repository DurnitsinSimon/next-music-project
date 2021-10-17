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
	

	const { pause, duration, volume, currentTime, active } = useTypedSelector((state) => state.player);
	const { playTrack, pauseTrack, setVolume, setCurrentTime, setDuration } = useActions();

	const setAudio = () => {
		audio = new Audio();
		audio.src = 'http://localhost:5050/' + active?.audio;
		audio.volume = volume / 100;
		audio.onloadedmetadata = () => {
			setDuration(Math.ceil(audio.duration));
		};
		audio.ontimeupdate = () => {
			setCurrentTime(Math.ceil(audio.currentTime));
		};
	};
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
