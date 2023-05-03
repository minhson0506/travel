import {useMainContext} from "../contexts/MainContext";

interface Props {}

const Welcome: React.FC<Props> = () => {
    const { setPage } = useMainContext();

    const loginButton = async () => {
        setPage(2);
    }
    
    const registerButton = async () => {
        setPage(1);
    }

    return (
        <div>
            <div>
                <button onClick={loginButton}>Sign in</button>
                <button onClick={registerButton}>Sign up</button>
            </div>
            <div>
                <div>
                    <h1>Travel the world</h1>
                    <h1>Share your story</h1>
                    <h1>Inspire the next adventurer</h1>
                    <h2>
                        Welcome to our travel community! Discover hidden gems, insider tips, and inspiring stories from
                        fellow explorers.
                    </h2>
                </div>
                <div>
                    <img src={require('../images/landing.jpeg')} alt="landing"></img>
                </div>
            </div>
        </div>
    );
};

export default Welcome;