import { ChangeEvent, useEffect, useState } from 'react';
import { getPictures, postPicture } from '../hooks/pictureQueries';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import UploadMessageResponse from '../interfaces/UploadMessageResponse';
import { Picture } from '../interfaces/Picture';
import { socket } from '../socket';

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

        if (token === null) return;

        await doGraphQLFetch(
            apiUrl,
            postPicture,
            { title: title, description: description, filename: imageUploadData.data.filename, timestamp: new Date() },
            token,
        );
        // send socket event
        socket.emit('update', 'createPicture');
    };

    const getFeed = async () => {
        console.log('getFeed');
        if (token === null) {
            return;
        }
        let feed = (await doGraphQLFetch(apiUrl, getPictures)).pictures;
        setPictures(
            feed.sort((a: Picture, b: Picture) => {
                return a.timestamp > b.timestamp ? -1 : 1;
            }),
        );
    };

    useEffect(() => {
        getFeed();
    }, []);

    socket.on('updateFeed', (data) => {
        getFeed();
    });

    return (
        <div style={{width: '100%'}}>
            <div style={{background: 'white', borderRadius: '20px'}}>
                <h2>Create Post</h2>
                <h3>Title</h3>
                <input type="text" placeholder="Start a post" onChange={(evt) => updateTitle(evt)} />
                <h3>Description</h3>
                <input type="text" placeholder="Description" onChange={(evt) => updateDescription(evt)} />
                <h3>Picture</h3>
                <input type="file" placeholder="file picture" onChange={(evt) => updateFile(evt)} />
                <button onClick={onClick}>Post</button>
            </div>
            
                {pictures.map((picture: any) => {
                    return (
                        <div style={{width: '100%'}}>
                            <h3>{picture.title}</h3>
                            <img src={`${uploadImage}/${picture.filename}`} alt="picture" style={{width: '100%'}}/>
                            <p>{picture.description}</p>
                            <p>{picture.owner.email}</p>
                            <p>{picture.timestamp}</p>
                        </div>
                    );
                })}
           
        </div>
    );
};

export default Feed;
