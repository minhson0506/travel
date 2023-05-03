import {User} from "./User";

interface Picture {
    title: string;
    description: string;
    filename: string;
    owner: string | User;
    timestamp: Date;
}

export type {Picture}