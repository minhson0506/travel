import { useEffect, useState } from 'react';
import { Picture } from '../interfaces/Picture';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import { getPictureByOwner, getPictures } from '../hooks/pictureQueries';

interface Props {}

const Photo: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const uploadImage = process.env.REACT_APP_UPLOAD_IMAGE as string;

    const { token, profile } = useMainContext();
    const [pictures, setPictures] = useState<Picture[]>([]);

    // get all pictures of users
    const getDataPicture = async () => {
        if (token === null) return;
        const response = await doGraphQLFetch(apiUrl, getPictureByOwner, {owner: profile?.owner.id}, token);
        setPictures(response.picturesByOwner);
    };

    useEffect(() => {
        getDataPicture();
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh', margin: '20px', padding: '20px' }}>
            {pictures?.map((picture: Picture) => {
                return (
                    <img
                        src={`${uploadImage}/${picture.filename}`}
                        alt={`${picture.id}`}
                        style={{ width: '100%' }}></img>
                );
            })}
        </div>
    );
};

export default Photo;
