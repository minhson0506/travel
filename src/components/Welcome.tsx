import { useMainContext } from '../contexts/MainContext';

interface Props {}

const Welcome: React.FC<Props> = () => {
    const { setPage } = useMainContext();

    return (
        <div style={{ height: '100vh', width: '100%', background: 'white', display: 'flex', flexDirection: 'column' }}>
            <div
                style={{
                    height: '20%',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    padding: '20px',
                }}>
                <button
                    style={{ margin: '20px', fontSize: '20px', color: 'white', backgroundColor: 'green' }}
                    onClick={() => {
                        setPage(2);
                    }}>
                    Sign in
                </button>
                <button
                    style={{ margin: '20px', fontSize: '20px', color: 'white', backgroundColor: 'green' }}
                    onClick={() => {
                        setPage(1);
                    }}>
                    Sign up
                </button>
            </div>
            <div
                style={{
                    height: '75%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    padding: '20px',
                }}>
                <div style={{ width: '50%' }}>
                    <h1>Travel the world</h1>
                    <h1>Share your story</h1>
                    <h1>Inspire the next adventurer</h1>
                    <h2>
                        Welcome to our travel community! Discover hidden gems, insider tips, and inspiring stories from
                        fellow explorers.
                    </h2>
                </div>
                <div style={{ width: '50%' }}>
                    <img src={require('../images/landing.jpeg')} alt="landing" style={{ width: '100%' }}></img>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
