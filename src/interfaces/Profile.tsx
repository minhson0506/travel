import {User} from "./User";

interface Profile {
    id?: string;
    owner: User;
    avatar: string | null;
    cover: string | null;
    about: string | null;
    location: string | null;
    interests: string[];
    follows: User[];
}

export type {Profile}