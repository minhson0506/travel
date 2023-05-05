import { ChangeEvent, useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { doGraphQLFetch } from '../hooks/fetch';
import { login, postUser } from '../hooks/userQueries';
import { User } from '../interfaces/User';
import background from '../images/background.jpg';
import { postProfile } from '../hooks/profileQueries';

interface Props {}

const Register: React.FC<Props> = () => {
    const { setPage, setToken, setProfile } = useMainContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL as string;

    // submit register credentials
    const onClick = async () => {
        const user: User = {
            user_name: name,
            email: email,
            password: password,
        };
        try {
            const newUser = await doGraphQLFetch(apiUrl, postUser, { user });
            const credentials = {
                username: newUser.register.user.email,
                password: password,
            };
            const userData = await doGraphQLFetch(apiUrl, login, { credentials });
            const profileData = await doGraphQLFetch(apiUrl, postProfile, {}, userData.login.token);
            setToken(userData.login.token);
            setProfile(profileData.createProfile);
        } catch (error) {
            alert("Couldn't register. Please try again.");
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
                <div style={{ padding: '70px' }}>
                    <h1>Unlock a new world</h1>
                    <h2>Join our travel community today and explore the world with fellow adventurers!</h2>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'white',
                        borderRadius: '20px',
                        width: '60%',
                        alignItems: 'center',
                        margin: '30px',
                        padding: '10px',
                    }}>
                    <h1>Sign up</h1>
                    <h3>Our community is a source of inspiration for all types of travelers</h3>
                    <h2>Full name</h2>
                    <input type="text" placeholder="UserName" onChange={(evt) => setName(evt.target.value)}></input>
                    <h2>Email</h2>
                    <input type="text" placeholder="Email" onChange={(evt) => setEmail(evt.target.value)}></input>
                    <h2>Password</h2>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(evt) => setPassword(evt.target.value)}></input>
                    <button
                        style={{ margin: '30px', fontSize: '20px', color: 'white', backgroundColor: 'blue' }}
                        onClick={onClick}>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
