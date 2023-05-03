import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './views/Landing';
import { MainContext } from './contexts/MainContext';
import Home from './views/Home';
import {Profile} from './interfaces/Profile';

function App() {
    const [token, setToken] = React.useState<string | null>("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTIzMzY5ZWJhMTEwN2Q1YzRkM2M3NSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgzMTE1MzIzfQ.FXxt6EBCSGE9xiaShUPKjKKcrxUHvXIA4nZVUYDma9g");
    const [page, setPage] = React.useState<number>(0);
    const [profile, setProfile] = React.useState<Profile | null>(null);

    return (
        // <div>
        //     <Landing></Landing>
        //     <div className="App">
        //         <header className="App-header">
        //             <img src={logo} className="App-logo" alt="logo" />
        //             <p>
        //                 Edit <code>src/App.tsx</code> and save to reload.
        //             </p>
        //             <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        //                 Learn React
        //             </a>
        //         </header>
        //     </div>
        // </div>
        <MainContext.Provider value={{ token, setToken, page, setPage, profile, setProfile }}>
            {token == null ? <Landing></Landing> : <Home></Home>}
        </MainContext.Provider>
    );
}

export default App;
