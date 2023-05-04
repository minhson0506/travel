import {ChangeEvent, useState} from 'react';
import { useMainContext } from '../contexts/MainContext';
import background from '../images/background.jpg';
import {doGraphQLFetch} from '../hooks/fetch';
import {login} from '../hooks/userQueries';
import {getProfileByOwner} from '../hooks/profileQueries';

interface Props {}

const Login: React.FC<Props> = () => {
    const { setPage, setToken, setProfile } = useMainContext();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL as string;

    const loginButton = () => {
        setPage(2);
    };

    const registerButton = () => {
        setPage(1);
    };

    const updateUser = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUser(val);
    }

    const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPassword(val);
    }

    const onClick = async () => {
        const credentials = {
            username: user,
            password: password,
        };
        const userData = await doGraphQLFetch(apiUrl, login, { credentials });
        const profileData = await doGraphQLFetch(apiUrl, getProfileByOwner, {owner: userData.login.user.id}, userData.login.token);
        setToken(userData.login.token);
        setProfile(profileData.profileByOwner[0]);
    }

    return (
        <div style={{ backgroundImage: `url(${background})` }}>
            <div>
                <button onClick={loginButton}>Sign in</button>
                <button onClick={registerButton}>Sign up</button>
            </div>
            <div>
                <div>
                    <h1>Unlock a new world</h1>
                    <h2>Join our travel community today and explore the world with fellow adventurers!</h2>
                </div>
                <div>
                    <h1>Welcome back</h1>
                    <h2>Email</h2>
                    <input type="text" placeholder="Email" onChange={evt => updateUser(evt)}></input>
                    <h2>Password</h2>
                    <input type="password" placeholder="Password" onChange={evt => updatePassword(evt)}></input>
                    <button onClick={onClick}>Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default Login;