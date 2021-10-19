import { AxiosResponse } from 'axios';
import $api from '../http';
import { ITrack } from '../types/track';


export default class TrackService {
	static async fetchTracks (){
        return $api.get('/tracks');
    }
	static async searchTrack(query: string) {
		return $api.get(`/tracks/search?query=${query}`);
	}
}
