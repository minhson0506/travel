import {User} from "./User";
import {Picture} from "./Picture";

interface CommentUser {
    id?: string;
    text: string;
    owner: User;
    picture: Picture;
    timestamp: Date;
}

export type {CommentUser}