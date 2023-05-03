import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import Welcome from '../components/Welcome';
import { useMainContext } from '../contexts/MainContext';

interface Props {}

const Landing: React.FC<Props> = () => {
    const { page } = useMainContext();

    return page === 0 ? <Welcome></Welcome> : page === 1 ? <Register></Register> : <Login></Login>;
};

export default Landing;
