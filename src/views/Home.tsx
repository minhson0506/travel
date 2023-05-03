import { useState } from 'react';
import About from '../components/About';
import Feed from '../components/Feed';
import { useMainContext } from '../contexts/MainContext';
import Follow from '../components/Follow';
import Photo from '../components/Photo';

interface Props {}

const Home: React.FC<Props> = () => {
    const { token, profile } = useMainContext();

    const [state, setState] = useState(0);

    const feedButton = async () => {
        setState(0);
    };

    const aboutButton = async () => {
        setState(1);
    };

    const photoButton = async () => {
        setState(2);
    };

    const followerButton = async () => {
        setState(3);
    };

    const followingButton = async () => {
        setState(4);
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <div style={{ width: '80%' }}>
                <div>
                    <img
                        src={require('../images/landing.jpeg')}
                        alt="avatar"
                        style={{ width: '100%', borderRadius: '20px' }}></img>
                    <img src={require('../images/avatar.png')} alt="avatar" style={{ width: '10%' }}></img>
                </div>
                <div>
                    <button onClick={feedButton}>My Feed</button>
                    <button onClick={aboutButton}>About me</button>
                    <button onClick={photoButton}>My Photos</button>
                    <button onClick={followerButton}>Followers</button>
                    <button onClick={followingButton}>Following</button>
                </div>
                <div>
                    {state === 0 ? (
                        <Feed></Feed>
                    ) : state === 1 ? (
                        <About></About>
                    ) : state === 2 ? (
                        <Photo></Photo>
                    ) : state === 3 ? (
                        <Follow></Follow>
                    ) : (
                        <Follow></Follow>
                    )}
                </div>
            </div>

            <div
                style={{
                    width: '20%',
                    border: '1px solid black',
                    borderRadius: '20px',
                    padding: '1px',
                }}>
                <h1>You might be interested</h1>
                <img src={require('../images/london.jpeg')} alt="london" style={{ width: '100%' }}></img>
                <img src={require('../images/greece.jpeg')} alt="greece" style={{ width: '100%' }}></img>
                <img src={require('../images/norway.jpg')} alt="norway" style={{ width: '100%' }}></img>
            </div>
        </div>
    );
};

export default Home;
