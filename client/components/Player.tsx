import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { FC } from 'react';
import styles from '../styles/Player.module.scss';
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';

const Player: FC = () => {
	const active = false;
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
	return (
		<div className={styles.player}>
			<IconButton onClick={(e) => e.stopPropagation()}>{active ? <Pause /> : <PlayArrow />}</IconButton>
            <Grid container direction='column' style={{ width: 200, margin: '0 20px' }}>
				<div>{track.name}</div>
				<div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
			</Grid>
            <TrackProgress left={0} right={100} onChange={() => {}}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={0} right={100} onChange={() => {}}/>

		</div>
	);
};

export default Player;
