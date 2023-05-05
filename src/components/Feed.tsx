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

    const { token, profile } = useMainContext();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [pictures, setPictures] = useState([]);

    const onClick = async () => {
        if (file === undefined) return;
        if (token === null) return;

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

    const getAllComment = async () => {};

    const changeTime = (time: string) => {
        let date = new Date(time);
        return date.toLocaleString();
    };

    useEffect(() => {
        getAllComment();
        getFeed();
    }, []);

    // get message from socket and reload data
    socket.on('updateFeed', (data) => {
        getFeed();
    });

    return (
        <div style={{ width: '100%', paddingTop: '10px' }}>
            <div
                style={{
                    background: 'white',
                    borderRadius: '20px',
                    paddingLeft: '10px',
                    paddingTop: '1px',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <div>
                    <h2>Create Post</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <h3 style={{ margin: '10px' }}>Title</h3>
                        <h3 style={{ margin: '10px' }}>Picture</h3>
                        <h3 style={{ margin: '10px' }}>Description</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <input
                            type="text"
                            placeholder="Start a post"
                            onChange={(evt) => setTitle(evt.target.value)}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />

                        <input
                            type="text"
                            placeholder="Description"
                            onChange={(evt) => setDescription(evt.target.value)}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />

                        <input
                            type="file"
                            placeholder="file picture"
                            onChange={(evt) => setFile(evt.target.files![0])}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />
                    </div>
                </div>

                <button onClick={onClick} style={{ fontSize: '20px', width: '100px' }}>
                    Post
                </button>
            </div>

            {pictures.map((picture: any) => {
                return (
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            border: '5px solid white',
                            background: 'white',
                            borderRadius: '20px',
                            marginTop: '10px',
                        }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                            <div style={{ height: '10vh' }}>
                                {profile && profile.avatar ? (
                                    <img
                                        src={`${uploadImage}/${profile.avatar}`}
                                        alt={`${picture.filename}`}
                                        style={{
                                            height: '100%',
                                            borderRadius: '60px',
                                            border: '2px solid black',
                                        }}></img>
                                ) : (
                                    <img
                                        src={require('../images/avatar.png')}
                                        alt={`${picture.filename}`}
                                        style={{
                                            height: '100%',
                                            borderRadius: '50px',
                                            border: '2px solid black',
                                        }}></img>
                                )}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    marginLeft: '10px',
                                }}>
                                <h3>{picture.owner.user_name}</h3>
                                <p>{changeTime(picture.timestamp)}</p>
                            </div>
                        </div>

                        <h3 key={picture.title}>{picture.title}</h3>
                        <div key={picture.owner} style={{ height: '40%' }}>
                            <img
                                src={`${uploadImage}/${picture.filename}`}
                                alt={`${picture.id}`}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <p key={picture.description}>{picture.description}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Feed;
