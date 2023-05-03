import {ChangeEvent, useState} from "react";
import {useMainContext} from "../contexts/MainContext";
import {doGraphQLFetch} from "../hooks/fetch";
import {postUser} from "../hooks/userQueries";
import {User} from "../interfaces/User";

interface Props {}

const Register: React.FC<Props> = () => {
    const { setPage } = useMainContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL as string;

    console.log('apiUrl', apiUrl);

    const loginButton = async () => {
        setPage(2);
    }
    
    const registerButton = async () => {
        setPage(1);
    }

    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);
        console.log("name input", val);
    }
    const updateUser = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmail(val);
        console.log("user input", val);
    }

    const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPassword(val);
        console.log("password input", val);
    }

    const onClick = async () => {
        console.log('clicked');
        // const user: User = {
        //     user_name: name,
        //     email: email,
        //     password: password,
        // };
        // const userData = await doGraphQLFetch(apiUrl, postUser, { user });
        // console.log('userData', userData);

        const user: User = {
            user_name: 'test',
            email: 'test2@metropolia.fi',
            password: 'test',
        };
        const userData = await doGraphQLFetch(apiUrl, postUser, { user });
        console.log('userData', userData);
    }

    // const login = async () => {
//     console.log('clicked');
        // const user: User = {
        //     user_name: 'test',
        //     email: 'test@metropolia.fi',
        //     password: 'test',
        // };
        // const userData = await doGraphQLFetch(apiUrl, postUser, { user });
        // console.log('userData', userData);
// };

    return (
        <div>
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
                    <h1>Sign up</h1>
                    <h2>Our community is a source of inspiration for all types of travelers</h2>
                    <h2>Full name</h2>
                    <input type="text" placeholder="Email" onChange={evt => updateName(evt)}></input>
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






export default Register;