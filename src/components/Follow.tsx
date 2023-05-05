import { useEffect, useState } from 'react';
import { Profile } from '../interfaces/Profile';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import { User } from '../interfaces/User';
import { addFollow, getProfileByOwner, getProfiles, removeFollow } from '../hooks/profileQueries';

interface Props {
    follower: boolean;
}

const Follow: React.FC<Props> = (data) => {
    const following = data.follower;
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const uploadImage = process.env.REACT_APP_UPLOAD_IMAGE as string;

    const { token, profile, setProfile } = useMainContext();
    const [profilesDisplay, setProfilesDisplay] = useState<Profile[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // get data for display
    const getData = async () => {
        if (profile === null || token === null) return;
        if (!following) {
            // get all followers
            let response = (await doGraphQLFetch(apiUrl, getProfiles)).profiles;
            console.log('all profiles', response);
            response = response.filter((profileResponse: Profile) => {
                const follows = profileResponse.follows.map((user: User) => {
                    return user.id?.toString();
                });
                if (follows.length === 0) return false;
                else {
                    return follows.includes(profile.owner.id?.toString());
                }
            });
            setProfilesDisplay(response);
        } else {
            // get all following
            console.log('following', profile);
            if (profile === null || token === null) return;
            let response: Profile[] = [];
            if (profile.follows.length > 0)
                response = await Promise.all(
                    profile.follows.map(async (user: User) => {
                        return (await doGraphQLFetch(apiUrl, getProfileByOwner, { owner: user.id }, token))
                            .profileByOwner[0];
                    }),
                );
            setProfilesDisplay(response);
        }
    };

    useEffect(() => {
        getData();
    }, [loading]);

    return (
        <div style={{ width: '60%', margin: '20px', padding: '20px', borderRadius: '20px', border: '5px solid white' }}>
            {profilesDisplay.length === 0 || profilesDisplay === null ? (
                following ? (
                    <h1>You don't follow anyone</h1>
                ) : (
                    <h1>You don't have any followers</h1>
                )
            ) : (
                <div>
                    {following ? <h1>List of followings</h1> : <h1>List of followers</h1>}
                    {profilesDisplay.map((profile: Profile) => {
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
                                    {profile && profile.avatar ? (
                                        <img
                                            src={`${uploadImage}/${profile.avatar}`}
                                            alt="avatar"
                                            style={{
                                                height: '100%',
                                                borderRadius: '50px',
                                                border: '2px solid black',
                                            }}></img>
                                    ) : (
                                        <img
                                            src={require('../images/avatar.png')}
                                            alt="avatar"
                                            style={{
                                                height: '100%',
                                                borderRadius: '50px',
                                                border: '2px solid black',
                                            }}></img>
                                    )}
                                    <h1 style={{ padding: '10px' }}>{profile?.owner.user_name}</h1>
                                </div>
                                {following ? (
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
                                            console.log('follow clicked');
                                            if (token === null) return;
                                            const newProfile = await doGraphQLFetch(
                                                apiUrl,
                                                removeFollow,
                                                { id: profile.owner.id },
                                                token,
                                            );
                                            setProfile(newProfile.removeFollow);
                                            setLoading(!loading);
                                        }}>
                                        UnFollow
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Follow;
