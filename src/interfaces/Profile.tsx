import {User} from "./User";

interface Profile {
    owner: User;
    avatar: string | null;
    cover: string | null;
    about: string | null;
    location: string | null;
    interests: string[];
    follows: (string | User)[];
}

export type {Profile}