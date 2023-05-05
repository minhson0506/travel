import { useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { User } from '../interfaces/User';
import { doGraphQLFetch } from '../hooks/fetch';
import { putUser } from '../hooks/userQueries';
import UploadMessageResponse from '../interfaces/UploadMessageResponse';
import { putProfile } from '../hooks/profileQueries';

interface Props {}

const Edit: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;

    const { profile, token, setProfile, setState } = useMainContext();

    const [user_name, setUser_name] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [avatar, setAvatar] = useState<File | null>(null);
    const [cover, setCover] = useState<File | null>(null);
    const [about, setAbout] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [interests, setInterests] = useState<string[]>([]);

    // update user information
    const updateUser = async () => {
        if (token === null) return;
        let user: User = {};
        if (password !== '') user.password = password;
        if (email !== '') user.email = email;
        if (user_name !== '') user.user_name = user_name;
        console.log('user', user);
        const newUser = await doGraphQLFetch(apiUrl, putUser, { user }, token);
        if (profile === null) return;
        let newProfile = profile;
        newProfile.owner = newUser.updateUser.user;
        setProfile(newProfile);
        setState(0);
    };

    // update profile information
    const updateProfile = async () => {
        if (token === null) return;
        if (profile === null) return;
        let newProfile = profile;
        if (avatar !== null) {
            const formData = new FormData();
            formData.append('file', avatar);
            const imageUpload = await fetch(`${process.env.REACT_APP_UPLOAD_URL}/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const imageUploadData = (await imageUpload.json()) as UploadMessageResponse;
            newProfile.avatar = imageUploadData.data.filename;
        }
        if (cover !== null) {
            const formData = new FormData();
            formData.append('file', cover);
            const imageUpload = await fetch(`${process.env.REACT_APP_UPLOAD_URL}/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const imageUploadData = (await imageUpload.json()) as UploadMessageResponse;
            newProfile.cover = imageUploadData.data.filename;
        }
        if (about !== '') newProfile.about = about;
        if (location !== '') newProfile.location = location;
        if (interests.length !== 0) newProfile.interests = interests;
        const response = await doGraphQLFetch(
            apiUrl,
            putProfile,
            {
                id: newProfile.id,
                avatar: newProfile.avatar,
                cover: newProfile.cover,
                about: newProfile.about,
                location: newProfile.location,
                interests: newProfile.interests,
                follows: newProfile.follows,
            },
            token,
        );
        setProfile(response.updateProfile);
        setState(0);
    };

    return (
        <div style={{ width: '50%', height: '100vh', margin: '20px' }}>
            <div style={{ borderRadius: '20px', border: '5px solid white' }}>
                <h1 style={{ textAlign: 'center', width: '100%' }}>Update User</h1>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <h3 style={{ margin: '10px' }}>Username</h3>
                        <h3 style={{ margin: '10px' }}>Email</h3>
                        <h3 style={{ margin: '10px' }}>Password</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <input
                            type="text"
                            onChange={(evt) => setUser_name(evt.target.value)}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />

                        <input
                            type="text"
                            onChange={(evt) => setEmail(evt.target.value)}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />

                        <input
                            type="password"
                            onChange={(evt) => setPassword(evt.target.value)}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />
                    </div>
                </div>
                <div style={{ textAlign: 'center', width: '100%', margin: '10px' }}>
                    <button onClick={updateUser} style={{ fontSize: '20px', width: '200px' }}>
                        Update User
                    </button>
                </div>
            </div>
            <div style={{ borderRadius: '20px', border: '5px solid white' }}>
                <h1 style={{ textAlign: 'center', width: '100%' }}>Update Profile</h1>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <h3 style={{ margin: '10px' }}>Avatar</h3>
                        <h3 style={{ margin: '10px' }}>Cover</h3>
                        <h3 style={{ margin: '10px' }}>About me</h3>
                        <h3 style={{ margin: '10px' }}>Location</h3>
                        <h3 style={{ margin: '10px' }}>Interests</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <input
                            type="file"
                            onChange={(evt) => setAvatar(evt.target.files![0])}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />
                        <input
                            type="file"
                            onChange={(evt) => setCover(evt.target.files![0])}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />
                        <input
                            type="text"
                            onChange={(evt) => setAbout(evt.target.value)}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />
                        <input
                            type="text"
                            onChange={(evt) => setLocation(evt.target.value)}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />
                        <input
                            type="text"
                            onChange={(evt) => {
                                const interested = evt.target.value.split(',');
                                setInterests(interested);
                            }}
                            style={{ marginLeft: '10px', height: 'auto', margin: '10px' }}
                        />
                    </div>
                </div>
                <div style={{ textAlign: 'center', width: '100%', margin: '10px' }}>
                    <button onClick={updateProfile} style={{ fontSize: '20px', width: '200px' }}>
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Edit;
