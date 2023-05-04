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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTNmOTlhZjI5MDQ3NjFjZmQ0OWM0MCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgzMjI1ODkxfQ.icMbshxwvBm46vZz-5YexjODswrXfOS4vHCrwvu-juw"
    );
    const [page, setPage] = React.useState<number>(0);
    const [profile, setProfile] = React.useState<Profile | null>(
         
        {
            "owner" : {
                "email": "sond@metropolia.fi",
                "user_name": "Son Dang"},
            "interests" : [],
            "follows" : [],
            "about" : null,
            "location" : null,
            "avatar" : null,
            "cover" : null
        }
        
    );

    return (
        <MainContext.Provider value={{ token, setToken, page, setPage, profile, setProfile }}>
            {token == null ? <Landing></Landing> : <Home></Home>}
        </MainContext.Provider>
    );
}

export default App;
