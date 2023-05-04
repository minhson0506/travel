import { useState } from 'react';
import About from '../components/About';
import Feed from '../components/Feed';
import { useMainContext } from '../contexts/MainContext';
import Follow from '../components/Follow';
import Photo from '../components/Photo';
import Edit from '../components/Edit';

interface Props {}

const Home: React.FC<Props> = () => {
    const uploadImage = process.env.REACT_APP_UPLOAD_IMAGE as string;

    const { token, profile } = useMainContext();

    const [state, setState] = useState(0);

    console.log('profile', profile);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                background: '#ebf5ff',
            }}>
            <div
                style={{
                    width: '75%',
                    height: '100%',
                    //border: '1px solid',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    margin: '10px',
                }}>
                {profile && profile.cover ? (
                    <img
                        src={`${uploadImage}/${profile.cover}`}
                        alt="cover"
                        style={{ height: '30vh', borderRadius: '20px', border: '5px solid white' }}></img>
                ) : (
                    <img
                        src={require('../images/landing.jpeg')}
                        alt="cover"
                        style={{
                            height: '30vh',
                            width: '100%',

                            borderRadius: '20px',
                            border: '5px solid white',
                        }}></img>
                )}

                <div
                    style={{
                        height: '100px',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <div style={{ height: '100px', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                        {' '}
                        {profile && profile.avatar ? (
                            <img
                                src={`${uploadImage}/${profile.avatar}`}
                                alt="avatar"
                                style={{ height: '100%', borderRadius: '50px', border: '2px solid black' }}></img>
                        ) : (
                            <img
                                src={require('../images/avatar.png')}
                                alt="avatar"
                                style={{ height: '100%', borderRadius: '50px', border: '2px solid black' }}></img>
                        )}
                        <h1>{profile?.owner.user_name}</h1>
                    </div>

                    <button
                        style={{ height: '50px', width: '100px' }}
                        onClick={() => {
                            setState(5);
                        }}>
                        Edit Profile
                    </button>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row' , justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <button
                        onClick={() => {
                            setState(0);
                        }}>
                        My Feed
                    </button>
                    <button
                        onClick={() => {
                            setState(1);
                        }}>
                        About me
                    </button>
                    <button
                        onClick={() => {
                            setState(2);
                        }}>
                        My Photos
                    </button>
                    <button
                        onClick={() => {
                            setState(3);
                        }}>
                        Followers
                    </button>
                    <button
                        onClick={() => {
                            setState(4);
                        }}>
                        Following
                    </button>
                </div>
                
                    {state === 0 ? (
                        <Feed></Feed>
                    ) : state === 1 ? (
                        <About></About>
                    ) : state === 2 ? (
                        <Photo></Photo>
                    ) : state === 3 ? (
                        <Follow></Follow>
                    ) : state === 3 ? (
                        <Follow></Follow>
                    ) : (
                        <Edit></Edit>
                    )}
              
            </div>

            <div
                style={{
                    width: '15%',
                    border: '5px solid white',
                    borderRadius: '20px',
                    margin: '10px',
                }}>
                <h3>You might be interested</h3>
                <img src={require('../images/london.jpeg')} alt="london" style={{ width: '100%' }}></img>
                <p>London</p>
                <img src={require('../images/greece.jpeg')} alt="greece" style={{ width: '100%' }}></img>
                <p>Greece</p>
                <img src={require('../images/norway.jpg')} alt="norway" style={{ width: '100%' }}></img>
                <p>Norway</p>
            </div>
        </div>
    );
};

export default Home;
