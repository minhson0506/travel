import { ChangeEvent, useEffect, useState } from 'react';
import { getPictures, postPicture } from '../hooks/pictureQueries';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import UploadMessageResponse from '../interfaces/UploadMessageResponse';

interface Props {}

const Feed: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const uploadURL = process.env.REACT_APP_UPLOAD_URL as string;
    const uploadImage = process.env.REACT_APP_UPLOAD_IMAGE as string;

    const { token } = useMainContext();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [pictures, setPictures] = useState([]);

    const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const updateDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const updateFile = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files![0]);
    };

    const onClick = async () => {
        if (file === undefined) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        const imageUpload = await fetch(`${uploadURL}/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const imageUploadData = (await imageUpload.json()) as UploadMessageResponse;

        if (token === null) {
            return;
        }
        console.log('title', title);
        console.log('description', description);
        console.log('filename', imageUploadData.data.filename);
        const post = await doGraphQLFetch(
            apiUrl,
            postPicture,
            { title: title, description: description, filename: imageUploadData.data.filename, timestamp: new Date() },
            token,
        );
        console.log(' post picture ', post.createPicture);
    };

    const getFeed = async () => {
        if (token === null) {
            return;
        }
        const feed = await doGraphQLFetch(apiUrl, getPictures);
                                                                                                                                     setPictures(feed.pictures);
    };

    useEffect(() => {
        getFeed();
    }, []);

    return (
        <div>
            <div>
                <h2>Create Post</h2>
                <h3>Title</h3>
                <input type="text" placeholder="Start a post" onChange={(evt) => updateTitle(evt)} />
                <h3>Description</h3>
                <input type="text" placeholder="Description" onChange={(evt) => updateDescription(evt)} />
                <h3>Picture</h3>
                <input type="file" placeholder="file picture" onChange={(evt) => updateFile(evt)} />
                <button onClick={onClick}>Post</button>
            </div>
            <div>
                {pictures.map((picture: any) => {
                    return (
                        <div>
                            <h3>{picture.title}</h3>
                            <img src={`${uploadImage}/${picture.filename}`} alt="picture" />
                            <p>{picture.description}</p>
                        </div>
                    );
                })
                }
            </div>
        </div>
    );
};

export default Feed;
