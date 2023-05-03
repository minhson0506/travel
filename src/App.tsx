import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './views/Landing';
import { MainContext } from './contexts/MainContext';

function App() {
    const [token, setToken] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(0);
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
        <MainContext.Provider value={{ token, setToken, page, setPage }}>
            {token == null ? <Landing></Landing> : <div>Not logged in</div>}
        </MainContext.Provider>
    );
}

export default App;
