import {User} from "./User";

interface Picture {
    id?: string;
    title: string;
    description: string;
    filename: string;
    owner: User;
    timestamp: Date;
}

export type {Picture}