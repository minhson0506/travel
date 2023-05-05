import { ChangeEvent, useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import background from '../images/background.jpg';
import { doGraphQLFetch } from '../hooks/fetch';
import { login } from '../hooks/userQueries';
import { getProfileByOwner } from '../hooks/profileQueries';

interface Props {}

const Login: React.FC<Props> = () => {
    const { setPage, setToken, setProfile } = useMainContext();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL as string;

    // submit login credentials
    const onClick = async () => {
        const credentials = {
            username: user,
            password: password,
        };
        try {
            const userData = await doGraphQLFetch(apiUrl, login, { credentials });
            const profileData = await doGraphQLFetch(
                apiUrl,
                getProfileByOwner,
                { owner: userData.login.user.id },
                userData.login.token,
            );
            setToken(userData.login.token);
            setProfile(profileData.profileByOwner[0]);
        } catch (err) {
            alert("Couldn't log in. Please try again.");
        }
        
    };

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundSize: 'cover',
            }}>
            <div
                style={{
                    height: '20%',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    padding: '20px',
                }}>
                <button
                    onClick={() => {
                        setPage(2);
                    }}>
                    Sign in
                </button>
                <button
                    onClick={() => {
                        setPage(1);
                    }}>
                    Sign up
                </button>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    justifyItems: 'center',
                }}>
                <div style={{ padding: '20px' }}>
                    <h1>Unlock a new world</h1>
                    <h2>Join our travel community today and explore the world with fellow adventurers!</h2>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'white',
                        borderRadius: '20px',
                        width: '40%',
                        alignItems: 'center',
                        margin: '30px',
                    }}>
                    <h1>Welcome back</h1>
                    <h2>Email</h2>
                    <input type="text" onChange={(evt) => setUser(evt.target.value)}></input>
                    <h2>Password</h2>
                    <input type="password" onChange={(evt) => setPassword(evt.target.value)}></input>
                    <button
                        style={{ margin: '30px', fontSize: '20px', color: 'white', backgroundColor: 'blue' }}
                        onClick={onClick}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
