import axios from 'axios';
import { Dispatch } from 'react';
import { ITrack, TrackAction, TrackActionTypes } from '../../types/track';

interface Response {
	data: ITrack[];
}

export const fetchTracks = () => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const res: Response = await axios.get('http://localhost:5050/api/tracks');
			dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: res.data });
		} catch (e) {
			dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков' });
		}
	};
};


export const searchTracks = (query: string) => {
	return async (dispatch: Dispatch<TrackAction>) => {
		try {
			const res: Response = await axios.get('http://localhost:5050/api/tracks/search?query=' + query);
			dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: res.data });
		} catch (e) {
			dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков' });
		}
	};
};

