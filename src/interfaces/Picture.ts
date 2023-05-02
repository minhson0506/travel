import {User} from "./User";

interface Picture {
    title: string;
    description: string;
    filename: string;
    owner: string | User;
}



export type {Picture}