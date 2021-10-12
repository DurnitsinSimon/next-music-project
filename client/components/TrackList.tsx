import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';

interface ITrackListProps {
	tracks: ITrack[];
}

const TrackList: FC<ITrackListProps> = ({ tracks }) => {
	return (
		<Grid container direction='column'>
			<Box p={2}>
				{tracks.map((track) => {
					return <TrackItem key={track._id} track={track} />;
				})}
			</Box>
		</Grid>
	);
};

export default TrackList;
