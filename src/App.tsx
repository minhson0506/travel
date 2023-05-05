import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './views/Landing';
import { MainContext } from './contexts/MainContext';
import Home from './views/Home';
import { Profile } from './interfaces/Profile';
import { User } from './interfaces/User';

function App() {
    const [token, setToken] = React.useState<string | null>(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTNmOTlhZjI5MDQ3NjFjZmQ0OWM0MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgzMjM5MTQwfQ.nRp4GqY9TZJtdRXgNNi6A1S3meFHc3CstPa_gu80N9o',
    );
    const [page, setPage] = React.useState<number>(0);
    const [state, setState] = React.useState<number>(0);
    const [profile, setProfile] = React.useState<Profile | null>({
        id: "6453f99b3b1c1326bfb3b872",
        owner: {
            id: '6453f99af2904761cfd49c40',
            email: 'sond@metropolia.fi',
            user_name: 'Son Dang',
        },
        interests: ["Music", "Sports"],
        follows: [],
        about: "A student at Metropolia UAS. I'm studying Information Technology.",
        location: "Kirkonummi, Finland",
        avatar: null,
        cover: null,
    });

    return (
        <MainContext.Provider value={{ token, setToken, page, setPage, profile, setProfile, state, setState }}>
            {token == null ? <Landing></Landing> : <Home></Home>}
        </MainContext.Provider>
    );
}

export default App;
