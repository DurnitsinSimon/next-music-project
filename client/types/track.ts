import { IComment } from './comment';

export interface TrackState {
    tracks: ITrack[];
    error: string;
}

export interface ITrack {
	_id?: string;
	name: string;
	artist: string;
	listens: number;
	text: string;
	comments: IComment[];
	audio: string;
	picture: string;
}


export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR'
}

interface FetchTrackAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[];
}

interface FetchTrackErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string;
}

export type TrackAction = FetchTrackAction | FetchTrackErrorAction;