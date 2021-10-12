import { IComment } from "./comment";


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