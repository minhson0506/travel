import {User} from "./User";
import {Picture} from "./Picture";

interface Comment {
    text: string;
    owner: string | User;
    picture: string | Picture;
    timestamp: Date;
}

export default Comment