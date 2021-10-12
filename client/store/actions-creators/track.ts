import axios from 'axios';
import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes } from '../../types/track';

export const fetchTracks = () => {
	return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const res = await axios.get('http://localhost:5050/api/tracks');
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: res.data});
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков'});
        }
    };
};
