import {User} from "./User";

interface Profile {
    owner: string | User;
    avatar: string;
    cover: string;
    about: string;
    location: string;
    interests: string[];
    follows: (string | User)[];
}

export type {Profile}