import {User} from "./User";

interface Profile {
    owner: User;
    avatar: string | null;
    cover: string | null;
    about: string;
    location: string | null;
    interests: string[];
    follows: (string | User)[];
}

export type {Profile}