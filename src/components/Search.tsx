import { useEffect, useState } from 'react';
import { User } from '../interfaces/User';
import { doGraphQLFetch } from '../hooks/fetch';
import { searchUser } from '../hooks/userQueries';
import { useMainContext } from '../contexts/MainContext';
import { addFollow, getProfileByOwner, removeFollow } from '../hooks/profileQueries';
import { Profile } from '../interfaces/Profile';

interface Props {}

const Search: React.FC<Props> = () => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const uploadImage = process.env.REACT_APP_UPLOAD_IMAGE as string;

    const { token, profile, setProfile } = useMainContext();

    const [text, setText] = useState<string>('');
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // load data for searching by name or email
    const onclick = async () => {
        console.log('onclick profile', profile);
        if (text === '') return;
        if (token === null) return;
        const response = await doGraphQLFetch(apiUrl, searchUser, { search: text }, token);
        let allProfiles = await Promise.all(
            response.searchUsers.map(async (user: User) => {
                return (await doGraphQLFetch(apiUrl, getProfileByOwner, { owner: user.id }, token)).profileByOwner[0];
            }),
        );
        console.log('allProfiles', allProfiles);
        if (allProfiles === undefined) return;
        setProfiles(allProfiles);
    };

    useEffect(() => {
        onclick();
    }, [loading]);

    return (
        <div style={{ width: '60%', margin: '20px', padding: '20px', borderRadius: '20px', border: '5px solid white' }}>
            <div>
                <input type="text" onChange={(evt) => setText(evt.target.value)} style={{ margin: '10px' }} />
                <button onClick={onclick}>Search</button>
            </div>
            {profiles.map((profileDisplay: Profile) => {
                return (
                    <div
                        style={{
                            height: '100px',
                            width: '90%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '10px',
                            padding: '10px',
                            borderRadius: '20px',
                            border: '5px solid white',
                        }}>
                        <div
                            style={{
                                height: '100px',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                            }}>
                            {profileDisplay && profileDisplay.avatar ? (
                                <img
                                    src={`${uploadImage}/${profileDisplay.avatar}`}
                                    alt="avatar"
                                    style={{ height: '100%', borderRadius: '50px', border: '2px solid black' }}></img>
                            ) : (
                                <img
                                    src={require('../images/avatar.png')}
                                    alt="avatar"
                                    style={{ height: '100%', borderRadius: '50px', border: '2px solid black' }}></img>
                            )}
                            <h1 style={{ padding: '10px' }}>{profileDisplay?.owner.user_name}</h1>
                        </div>

                        <button
                            style={{
                                height: '30px',
                                width: '100px',
                                border: '2px solid black',
                                backgroundColor: '#ebf5ff',
                                color: 'green',
                                margin: '10px',
                            }}
                            onClick={async () => {
                                let bool = false;
                                if (profile !== null)
                                bool = profile.follows.length > 0
                                        ? profile.follows.find((follow: any) => follow.id === profileDisplay.owner.id)
                                            ? true
                                            : false
                                        : false;
                                if (token === null) return;
                                if (bool) {
                                    const newProfile = await doGraphQLFetch(apiUrl, removeFollow, { id: profileDisplay.owner.id }, token);
                                    setProfile(newProfile.removeFollow);
                                    setLoading(!loading);
                                } else {
                                    console.log('add follow', profileDisplay.owner.id);
                                    const newProfile = await doGraphQLFetch(apiUrl, addFollow, { id: profileDisplay.owner.id }, token);
                                    setProfile(newProfile.addFollow);
                                    setLoading(!loading);
                                }
                            }}>
                            {profile !== null && (profile.follows.length > 0)
                                ? profile.follows.find((follow: User) => follow.id === profileDisplay.owner.id)
                                    ? 'Unfollow'
                                    : 'Follow'
                                : 'Follow'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Search;
